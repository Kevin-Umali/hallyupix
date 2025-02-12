import { eq } from "drizzle-orm";
import { db } from "../../../db";
import {
  shopPayment,
  selectShopPaymentSchema,
  insertShopPaymentInstructionsSchema,
  insertDeadlineSettingsSchema,
  insertPaymentPoliciesSchema,
  insertPaymentMethodsSchema,
} from "../../../db/schema";
import { CustomHTTPException } from "../../../lib/custom-error";
import type { HonoRouteHandler } from "../../../lib/types";
import type {
  GetShopPayment,
  SaveShopPaymentInstructions,
  SaveShopPaymentDeadlineSettings,
  SaveShopPaymentPolicies,
  SaveShopPaymentMethods,
} from "./payment.routes";

export const getShopPayment: HonoRouteHandler<GetShopPayment> = async (c) => {
  const userId = c.get("user")?.id ?? "";

  const [shopPaymentData] = await db.select().from(shopPayment).where(eq(shopPayment.userId, userId));

  if (!shopPaymentData) {
    throw new CustomHTTPException(404, {
      code: "SHOP_PAYMENT_NOT_FOUND",
      message: "Shop payment not found",
    });
  }

  const result = selectShopPaymentSchema.parse(shopPaymentData);
  const { userId: _, id: __, ...dataWithoutIds } = result;

  return c.json(
    {
      data: dataWithoutIds,
    },
    200
  );
};

export const saveShopPaymentInstructions: HonoRouteHandler<SaveShopPaymentInstructions> = async (c) => {
  const { paymentInstructions } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await insertShopPaymentInstructionsSchema.safeParseAsync({
    userId,
    paymentInstructions,
  });

  if (!success) {
    throw new CustomHTTPException(400, {
      code: "BAD_REQUEST",
      message: "Invalid data, please check the data",
    });
  }

  const [existingPaymentInstructions] = await db.select().from(shopPayment).where(eq(shopPayment.userId, userId));

  if (!existingPaymentInstructions?.userId) {
    await db.insert(shopPayment).values({
      userId,
      paymentInstructions: parsedData.paymentInstructions,
    });
  } else {
    await db.update(shopPayment).set({ paymentInstructions: parsedData.paymentInstructions }).where(eq(shopPayment.userId, userId));
  }

  return c.json(
    {
      data: {
        status: true,
      },
    },
    200
  );
};

export const saveShopPaymentDeadlineSettings: HonoRouteHandler<SaveShopPaymentDeadlineSettings> = async (c) => {
  const { preOrderPayment, regularOrderPayment, paymentReminderInterval } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await insertDeadlineSettingsSchema.safeParseAsync({
    userId,
    preOrderPayment,
    regularOrderPayment,
    paymentReminderInterval,
  });

  if (!success) {
    throw new CustomHTTPException(400, {
      code: "BAD_REQUEST",
      message: "Invalid data, please check the data",
    });
  }

  const [existingDeadlineSettings] = await db.select().from(shopPayment).where(eq(shopPayment.userId, userId));

  if (!existingDeadlineSettings?.userId) {
    await db.insert(shopPayment).values({
      userId,
      deadlineSettings: parsedData.deadlineSettings,
    });
  } else {
    await db
      .update(shopPayment)
      .set({
        deadlineSettings: parsedData.deadlineSettings,
      })
      .where(eq(shopPayment.userId, userId));
  }

  return c.json(
    {
      data: {
        status: true,
      },
    },
    200
  );
};

export const saveShopPaymentPolicies: HonoRouteHandler<SaveShopPaymentPolicies> = async (c) => {
  const { refundPolicy, cancellationPolicy, partialPaymentAllowed, minimumPartialPayment, customPolicies } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await insertPaymentPoliciesSchema.safeParseAsync({
    paymentPolicies: {
      refundPolicy,
      cancellationPolicy,
      partialPaymentAllowed,
      minimumPartialPayment,
    },
    customPolicies,
    userId,
  });

  if (!success) {
    throw new CustomHTTPException(400, {
      code: "BAD_REQUEST",
      message: "Invalid data, please check the data",
    });
  }

  const [existingPaymentPolicies] = await db.select().from(shopPayment).where(eq(shopPayment.userId, userId));

  if (!existingPaymentPolicies?.userId) {
    await db.insert(shopPayment).values({
      userId,
      paymentPolicies: parsedData.paymentPolicies,
      customPolicies: parsedData.customPolicies,
    });
  } else {
    await db
      .update(shopPayment)
      .set({
        paymentPolicies: parsedData.paymentPolicies,
        customPolicies: parsedData.customPolicies,
      })
      .where(eq(shopPayment.userId, userId));
  }

  return c.json(
    {
      data: {
        status: true,
      },
    },
    200
  );
};

export const saveShopPaymentMethods: HonoRouteHandler<SaveShopPaymentMethods> = async (c) => {
  const { paymentMethods } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await insertPaymentMethodsSchema.safeParseAsync({
    userId,
    paymentMethods,
  });

  if (!success) {
    throw new CustomHTTPException(400, {
      code: "BAD_REQUEST",
      message: "Invalid data, please check the data",
    });
  }

  const [existingPaymentMethods] = await db.select().from(shopPayment).where(eq(shopPayment.userId, userId));

  if (!existingPaymentMethods?.userId) {
    await db.insert(shopPayment).values({
      userId,
      paymentMethods: parsedData.paymentMethods,
    });
  } else {
    await db
      .update(shopPayment)
      .set({
        paymentMethods: parsedData.paymentMethods,
      })
      .where(eq(shopPayment.userId, userId));
  }

  return c.json(
    {
      data: {
        status: true,
      },
    },
    200
  );
};
