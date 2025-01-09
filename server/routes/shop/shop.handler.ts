import { eq } from "drizzle-orm";
import { db } from "../../db";
import { shopProfiles, insertShopProfileSchema, selectShopProfileSchema } from "../../db/schema/shop-profiles.model";
import type { HonoRouteHandler } from "../../lib/types";
import type { GetShopProfile, SaveShopProfile } from "./shop.routes";
import { CustomHTTPException } from "../../lib/custom-error";

export const saveShopProfile: HonoRouteHandler<SaveShopProfile> = async (c) => {
  const { shopName, description, bannerImage, profileImage, socialLinks } = c.req.valid("json");
  const userId = c.get("user")?.id;

  const { success, data: parsedData } = await insertShopProfileSchema.safeParseAsync({
    userId,
    shopName,
    description,
    bannerImage,
    profileImage,
    socialLinks,
  });

  if (!success) {
    throw new CustomHTTPException(400, { code: "BAD_REQUEST", message: "Invalid date, please check the data" });
  }

  await db
    .insert(shopProfiles)
    .values(parsedData)
    .onConflictDoUpdate({
      target: shopProfiles.userId,
      set: {
        shopName: parsedData.shopName,
        description: parsedData.description,
        bannerImage: parsedData.bannerImage,
        profileImage: parsedData.profileImage,
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

  return c.json(
    {
      data: {
        shopName: result.shopName,
        description: result.description,
        bannerImage: result.bannerImage,
        profileImage: result.profileImage,
        socialLinks: result.socialLinks,
        isVerified: result.isVerified ?? false,
        createdAt: result.createdAt.toDateString(),
        updatedAt: result.updatedAt.toDateString(),
      },
    },
    200
  );
};
