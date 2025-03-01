import { eq } from "drizzle-orm";
import { db } from "../../../db";
import {
  shopShipping,
  selectShopShippingSchema,
  insertShopShippingMethodSchema,
  insertShopShippingProcessingTimesSchema,
  insertShopShippingPoliciesSchema,
  insertShopShippingCustomPoliciesSchema,
} from "../../../db/schema/shop-shipping.model";
import { CustomHTTPException } from "../../../lib/custom-error";
import type { HonoRouteHandler } from "../../../lib/types";
import type {
  GetShopShipping,
  SaveShopShippingMethod,
  SaveShopShippingProcessingTimes,
  SaveShopShippingPolicies,
  SaveShopShippingCustomPolicies,
} from "./shipping.routes";

export const getShopShipping: HonoRouteHandler<GetShopShipping> = async (c) => {
  const userId = c.get("user")?.id ?? "";

  const [shopShippingData] = await db.select().from(shopShipping).where(eq(shopShipping.userId, userId));

  if (!shopShippingData) {
    throw new CustomHTTPException(404, {
      code: "SHOP_SHIPPING_NOT_FOUND",
      message: "Shop shipping not found",
    });
  }

  const result = selectShopShippingSchema.parse(shopShippingData);

  const { userId: _, id: __, ...dataWithoutIds } = result;

  return c.json(
    {
      data: dataWithoutIds,
    },
    200
  );
};

export const saveShopShippingMethod: HonoRouteHandler<SaveShopShippingMethod> = async (c) => {
  const { domestic, international } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await insertShopShippingMethodSchema.safeParseAsync({
    shippingMethods: {
      domestic: domestic,
      international: international,
    },
    userId,
  });

  if (!success) {
    throw new CustomHTTPException(400, {
      code: "BAD_REQUEST",
      message: "Invalid data, please check the data",
    });
  }

  const [existingShipping] = await db.select().from(shopShipping).where(eq(shopShipping.userId, userId));

  if (!existingShipping?.userId) {
    await db.insert(shopShipping).values({
      userId,
      shippingMethods: parsedData.shippingMethods,
    });
  } else {
    await db
      .update(shopShipping)
      .set({
        shippingMethods: parsedData.shippingMethods,
      })
      .where(eq(shopShipping.userId, userId));
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

export const saveShopShippingProcessingTimes: HonoRouteHandler<SaveShopShippingProcessingTimes> = async (c) => {
  const processingTimes = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await insertShopShippingProcessingTimesSchema.safeParseAsync({ processingTimes, userId });

  if (!success) {
    throw new CustomHTTPException(400, {
      code: "BAD_REQUEST",
      message: "Invalid data, please check the data",
    });
  }

  const [existingProcessingTimes] = await db.select().from(shopShipping).where(eq(shopShipping.userId, userId));

  if (!existingProcessingTimes?.userId) {
    await db.insert(shopShipping).values({
      userId,
      processingTimes: parsedData.processingTimes,
    });
  } else {
    await db
      .update(shopShipping)
      .set({
        processingTimes: parsedData.processingTimes,
      })
      .where(eq(shopShipping.userId, userId));
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

export const saveShopShippingPolicies: HonoRouteHandler<SaveShopShippingPolicies> = async (c) => {
  const { general, domestic, international } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await insertShopShippingPoliciesSchema.safeParseAsync({
    shippingPolicies: {
      general,
      domestic,
      international,
    },
    userId,
  });

  if (!success) {
    throw new CustomHTTPException(400, {
      code: "BAD_REQUEST",
      message: "Invalid data, please check the data",
    });
  } else {
    await db
      .update(shopShipping)
      .set({
        shippingPolicies: parsedData.shippingPolicies,
      })
      .where(eq(shopShipping.userId, userId));
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

export const saveShopShippingCustomPolicies: HonoRouteHandler<SaveShopShippingCustomPolicies> = async (c) => {
  const { customPolicies } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await insertShopShippingCustomPoliciesSchema.safeParseAsync({
    customPolicies,
    userId,
  });

  if (!success) {
    throw new CustomHTTPException(400, {
      code: "BAD_REQUEST",
      message: "Invalid data, please check the data",
    });
  } else {
    await db
      .update(shopShipping)
      .set({
        customPolicies: parsedData.customPolicies,
      })
      .where(eq(shopShipping.userId, userId));
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
