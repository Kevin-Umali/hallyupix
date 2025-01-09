// shop-profiles.model.ts
import { pgTable, text, timestamp, jsonb, boolean, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { z } from "zod";

export const shopProfiles = pgTable("shop_profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  shopName: text("shop_name").notNull(),
  description: text("description"),
  bannerImage: text("banner_image"),
  profileImage: text("profile_image"),
  socialLinks: jsonb("social_links")
    .$type<{
      facebook?: string;
      instagram?: string;
      twitter?: string;
      discord?: string;
      website?: string;
    }>()
    .default({}),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectShopProfileSchema = createSelectSchema(shopProfiles, {
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    discord: z.string().optional(),
    website: z.string().optional(),
  }),
});
export const insertShopProfileSchema = createInsertSchema(shopProfiles, {
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    discord: z.string().optional(),
    website: z.string().optional(),
  }),
}).omit({ bannerImage: true, profileImage: true });
export const updateShopProfileSchema = createUpdateSchema(shopProfiles);
export const updateShopProfileImageSchema = updateShopProfileSchema.pick({
  userId: true,
  bannerImage: true,
  profileImage: true,
});

export type ShopProfile = z.infer<typeof selectShopProfileSchema>;
export type InsertShopProfile = z.infer<typeof insertShopProfileSchema>;
export type UpdateShopProfile = z.infer<typeof updateShopProfileSchema>;
