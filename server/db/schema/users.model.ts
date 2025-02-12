// users.model.ts
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { roleEnum } from "./enums";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: roleEnum("role").notNull().default("Seller"),
  bio: text("bio"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);
export const updateUserSchema = createUpdateSchema(users);
