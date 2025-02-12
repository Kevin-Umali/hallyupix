import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { insertSellerStatusFlowSchema, selectSellerStatusFlowSchema, sellerStatusFlows, updateSellerStatusFlowSchema } from "../../db/schema/status-flow.model";
import type { HonoRouteHandler } from "../../lib/types";
import type { GetStatusFlows, SaveStatusFlows } from "./status-flow.routes";
import { CustomHTTPException } from "../../lib/custom-error";

export const getStatusFlows: HonoRouteHandler<GetStatusFlows> = async (c) => {
  const userId = c.get("user")?.id ?? "";

  const [statusFlow] = await db
    .select()
    .from(sellerStatusFlows)
    .where(and(eq(sellerStatusFlows.sellerId, userId), eq(sellerStatusFlows.isActive, true)));

  if (!statusFlow) {
    throw new CustomHTTPException(404, { code: "STATUS_FLOW_NOT_FOUND", message: "Status flow not found" });
  }

  const result = selectSellerStatusFlowSchema.parse(statusFlow);
  const { sellerId: _, ...dataWithoutIds } = result;

  return c.json(
    {
      data: dataWithoutIds,
    },
    200
  );
};

export const saveStatusFlows: HonoRouteHandler<SaveStatusFlows> = async (c) => {
  const { id, ...rest } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  let statusFlow;

  if (id) {
    const { success, data: parsedData } = await updateSellerStatusFlowSchema.safeParseAsync({
      ...rest,
      sellerId: userId,
    });

    if (!success) {
      throw new CustomHTTPException(400, { code: "BAD_REQUEST", message: "Invalid data, please check the data" });
    }

    await db
      .update(sellerStatusFlows)
      .set(parsedData)
      .where(and(eq(sellerStatusFlows.sellerId, userId), eq(sellerStatusFlows.id, id)));

    [statusFlow] = await db
      .select()
      .from(sellerStatusFlows)
      .where(and(eq(sellerStatusFlows.sellerId, userId), eq(sellerStatusFlows.id, id)));
  } else {
    const { success, data: parsedData } = await insertSellerStatusFlowSchema.safeParseAsync({
      ...rest,
      sellerId: userId,
    });

    if (!success) {
      throw new CustomHTTPException(400, { code: "BAD_REQUEST", message: "Invalid data, please check the data" });
    }

    const [insertedFlow] = await db.insert(sellerStatusFlows).values(parsedData).returning();

    if (!insertedFlow) {
      throw new CustomHTTPException(500, { code: "INSERT_FAILED", message: "Failed to insert new status flow" });
    }

    [statusFlow] = await db.select().from(sellerStatusFlows).where(eq(sellerStatusFlows.id, insertedFlow.id));
  }

  if (!statusFlow) {
    throw new CustomHTTPException(404, { code: "STATUS_FLOW_NOT_FOUND", message: "Status flow not found" });
  }

  const result = selectSellerStatusFlowSchema.parse(statusFlow);
  const { sellerId: _, ...dataWithoutIds } = result;

  return c.json(
    {
      data: {
        status: true,
        flow: dataWithoutIds,
      },
    },
    200
  );
};
