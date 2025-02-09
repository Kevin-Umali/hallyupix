import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { insertSellerStatusFlowSchema, selectSellerStatusFlowSchema, sellerStatusFlows, updateSellerStatusFlowSchema } from "../../db/schema/status-flow.model";
import type { HonoRouteHandler } from "../../lib/types";
import type { DeleteStatusFlow, GetStatusFlows, SaveStatusFlows } from "./status-flow.routes";
import { CustomHTTPException } from "../../lib/custom-error";

export const getStatusFlows: HonoRouteHandler<GetStatusFlows> = async (c) => {
  const userId = c.get("user")?.id ?? "";

  const statusFlows = await db.select().from(sellerStatusFlows).where(eq(sellerStatusFlows.sellerId, userId));

  if (statusFlows.length === 0) {
    throw new CustomHTTPException(404, { code: "STATUS_FLOW_NOT_FOUND", message: "Status flow not found" });
  }

  const result = selectSellerStatusFlowSchema.array().parse(statusFlows);
  const dataWithoutIds = result.map(({ sellerId: _, ...rest }) => rest);

  return c.json(
    {
      data: {
        flows: dataWithoutIds,
      },
    },
    200
  );
};

export const deleteStatusFlow: HonoRouteHandler<DeleteStatusFlow> = async (c) => {
  const { id } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  await db.delete(sellerStatusFlows).where(and(eq(sellerStatusFlows.sellerId, userId), eq(sellerStatusFlows.id, id)));

  return c.json(
    {
      data: {
        status: true,
      },
    },
    200
  );
};

export const saveStatusFlows: HonoRouteHandler<SaveStatusFlows> = async (c) => {
  const { flows } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const statusFlows = await db.transaction(async (trx) => {
    const updatedOrInsertedRecords = [];

    for (const flow of flows) {
      if (flow.id) {
        // Validate data before updating
        const { success, data: parsedData } = await updateSellerStatusFlowSchema.safeParseAsync({
          ...flow,
          sellerId: userId,
        });

        if (!success) {
          throw new CustomHTTPException(400, { code: "BAD_REQUEST", message: "Invalid data, please check the data" });
        }

        const { sellerId: _, ...rest } = parsedData;

        // Perform update and store updated record
        await trx
          .update(sellerStatusFlows)
          .set(rest)
          .where(and(eq(sellerStatusFlows.sellerId, userId), eq(sellerStatusFlows.id, flow.id)));

        // Fetch updated record
        const updatedFlow = await trx
          .select()
          .from(sellerStatusFlows)
          .where(and(eq(sellerStatusFlows.sellerId, userId), eq(sellerStatusFlows.id, flow.id)))
          .limit(1);

        if (updatedFlow.length) {
          updatedOrInsertedRecords.push(updatedFlow[0]);
        }
      } else {
        console.log("insert");

        // Validate data before inserting
        const { success, data: parsedData } = await insertSellerStatusFlowSchema.safeParseAsync({
          ...flow,
          sellerId: userId,
        });

        if (!success) {
          throw new CustomHTTPException(400, { code: "BAD_REQUEST", message: "Invalid data, please check the data" });
        }

        // Perform insert and store inserted record
        const insertedFlow = await trx.insert(sellerStatusFlows).values(parsedData).returning();

        if (insertedFlow.length) {
          updatedOrInsertedRecords.push(insertedFlow[0]);
        }
      }
    }

    return updatedOrInsertedRecords.length > 0
      ? updatedOrInsertedRecords
      : await trx.select().from(sellerStatusFlows).where(eq(sellerStatusFlows.sellerId, userId));
  });

  const result = selectSellerStatusFlowSchema.array().parse(statusFlows);
  const dataWithoutIds = result.map(({ sellerId: _, ...rest }) => rest);

  return c.json(
    {
      data: {
        status: true,
        flows: dataWithoutIds,
      },
    },
    200
  );
};
