// enums.ts
import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["Seller"]);
export const platformEnum = pgEnum("platform", ["Facebook", "Twitter", "Discord", "Website", "Others"]);
export const productStatusEnum = pgEnum("product_status", ["Pre-order", "On-hand", "Reserved", "Sold Out"]);
export const paymentStatusEnum = pgEnum("payment_status", ["Paid", "Partial", "Pending", "For Review"]);
export const isfPaymentEnum = pgEnum("isf_payment_status", ["Paid", "Free", "Pending", "For Review"]);
export const sfPaymentEnum = pgEnum("sf_payment_status", ["Paid", "Free", "Pending", "For Review"]);
export const pfPaymentEnum = pgEnum("pf_payment_status", ["Paid", "Free", "Pending", "For Review"]);
export const productVisibilityEnum = pgEnum("product_visibility", ["Public", "Private", "Hidden"]);
export const discountTypeEnum = pgEnum("discount_type", ["Percentage", "Flat"]);
