import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { insertShopProfileSchema, shopProfiles, selectShopProfileSchema, updateShopProfileImageSchema } from "../../../db/schema/shop-profiles.model";
import { CustomHTTPException } from "../../../lib/custom-error";
import type { HonoRouteHandler } from "../../../lib/types";
import type { GetShopProfile, SaveShopProfile, UpdateShopProfileImage } from "./profile.routes";

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
