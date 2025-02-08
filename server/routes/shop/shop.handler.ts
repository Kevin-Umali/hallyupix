import { eq } from "drizzle-orm";
import { db } from "../../db";
import { shopProfiles, insertShopProfileSchema, selectShopProfileSchema, updateShopProfileImageSchema } from "../../db/schema/shop-profiles.model";
import type { HonoRouteHandler } from "../../lib/types";
import type {
  GetShopPayment,
  GetShopProfile,
  GetShopShipping,
  SaveShopPaymentDeadlineSettings,
  SaveShopPaymentInstructions,
  SaveShopPaymentMethods,
  SaveShopPaymentPolicies,
  SaveShopProfile,
  SaveShopShippingCustomPolicies,
  SaveShopShippingMethod,
  SaveShopShippingPolicies,
  SaveShopShippingProcessingTimes,
  UpdateShopProfileImage,
} from "./shop.routes";
import { CustomHTTPException } from "../../lib/custom-error";
import {
  insertDeadlineSettingsSchema,
  insertPaymentPoliciesSchema,
  insertShopPaymentInstructionsSchema,
  insertPaymentMethodsSchema,
  selectShopPaymentSchema,
  shopPayment,
} from "../../db/schema/shop-payment.model";
import {
  insertShopShippingProcessingTimesSchema,
  insertShopShippingMethodSchema,
  selectShopShippingSchema,
  shopShipping,
  insertShopShippingPoliciesSchema,
  insertShopShippingCustomPoliciesSchema,
} from "../../db/schema/shop-shipping.model";

export const saveShopProfile: HonoRouteHandler<SaveShopProfile> = async (c) => {
  const { shopName, description, socialLinks } = c.req.valid("json");
  const userId = c.get("user")?.id;

  const { success, data: parsedData } = await insertShopProfileSchema.safeParseAsync({
    userId,
    shopName,
    description,
    socialLinks,
  });

  if (!success) {
    throw new CustomHTTPException(400, { code: "BAD_REQUEST", message: "Invalid data, please check the data" });
  }

  await db
    .insert(shopProfiles)
    .values(parsedData)
    .onConflictDoUpdate({
      target: shopProfiles.userId,
      set: {
        shopName: parsedData.shopName,
        description: parsedData.description,
        socialLinks: parsedData.socialLinks,
      },
    });

  return c.json(
    {
      data: {
        status: true,
      },
    },
    200
  );
};

export const getShopProfile: HonoRouteHandler<GetShopProfile> = async (c) => {
  const userId = c.get("user")?.id ?? "";

  const [shopProfile] = await db.select().from(shopProfiles).where(eq(shopProfiles.userId, userId));

  if (!shopProfile) {
    throw new CustomHTTPException(404, { code: "SHOP_PROFILE_NOT_FOUND", message: "Shop profile not found" });
  }

  const result = selectShopProfileSchema.parse(shopProfile);
  const { id: _, userId: __, ...dataWithoutIds } = result;

  return c.json(
    {
      data: {
        ...dataWithoutIds,
        isVerified: result.isVerified ?? false,
      },
    },
    200
  );
};

export const updateShopProfileImage: HonoRouteHandler<UpdateShopProfileImage> = async (c) => {
  const { url, isBanner = false } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await updateShopProfileImageSchema.safeParseAsync({
    bannerImage: isBanner ? url : undefined,
    profileImage: isBanner ? undefined : url,
  });

  if (!success) {
    throw new CustomHTTPException(400, {
      code: "BAD_REQUEST",
      message: "Invalid data, please check the input.",
    });
  }

  // Check if the profile exists
  const [existingProfile] = await db.select().from(shopProfiles).where(eq(shopProfiles.userId, userId));

  if (!existingProfile?.userId) {
    throw new CustomHTTPException(404, {
      code: "SHOP_PROFILE_NOT_FOUND",
      message: "Shop profile not found.",
    });
  }

  // Update the profile
  await db
    .update(shopProfiles)
    .set({
      bannerImage: isBanner ? parsedData.bannerImage : existingProfile.bannerImage,
      profileImage: isBanner ? existingProfile.profileImage : parsedData.profileImage,
    })
    .where(eq(shopProfiles.userId, userId));

  return c.json(
    {
      data: {
        status: true,
      },
    },
    200
  );
};

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

export const getShopShipping: HonoRouteHandler<GetShopShipping> = async (c) => {
  const userId = c.get("user")?.id ?? "";

  const [shopShippingData] = await db.select().from(shopShipping).where(eq(shopShipping.userId, userId));

  if (!shopShippingData) {
    throw new CustomHTTPException(404, {
      code: "SHOP_SHIPPING_NOT_FOUND",
      message: "Shop shipping not found",
    });
  }

  console.log(shopShippingData);

  const result = selectShopShippingSchema.parse(shopShippingData);

  console.log(result);

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
