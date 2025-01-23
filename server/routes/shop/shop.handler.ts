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
import { selectShopShippingSchema, shopShipping } from "../../db/schema/shop-shipping.model";

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
    userId,
    refundPolicy,
    cancellationPolicy,
    partialPaymentAllowed,
    minimumPartialPayment,
    customPolicies,
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

  const result = selectShopShippingSchema.parse(shopShippingData);

  const { userId: _, id: __, ...dataWithoutIds } = result;

  return c.json(
    {
      data: dataWithoutIds,
    },
    200
  );
};
