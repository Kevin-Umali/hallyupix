// models/shop-profiles.model.ts
import { pgTable, text, timestamp, jsonb, boolean, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { SocialLinksSchema, DEFAULT_SOCIAL_LINKS, type SocialLinks } from "../../../shared/types/shop.types";

// Table definition
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
  socialLinks: jsonb("social_links").$type<SocialLinks>().default(DEFAULT_SOCIAL_LINKS),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Base schemas
const baseSchema = {
  socialLinks: SocialLinksSchema,
};

export const selectShopProfileSchema = createSelectSchema(shopProfiles, baseSchema);
export const insertShopProfileSchema = createInsertSchema(shopProfiles, baseSchema).omit({ bannerImage: true, profileImage: true });

export const updateShopProfileSchema = createUpdateSchema(shopProfiles);
export const updateShopProfileImageSchema = updateShopProfileSchema.pick({
  userId: true,
  bannerImage: true,
  profileImage: true,
});
