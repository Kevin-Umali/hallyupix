CREATE TYPE "public"."isf_payment_status" AS ENUM('Paid', 'Free', 'Pending', 'For Review');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('Paid', 'Partial', 'Pending', 'For Review');--> statement-breakpoint
CREATE TYPE "public"."platform" AS ENUM('Facebook', 'Xianyu', 'Discord', 'Website');--> statement-breakpoint
CREATE TYPE "public"."product_status" AS ENUM('Pre-order', 'On-hand', 'Reserved', 'Sold Out');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('Buyer', 'Seller');--> statement-breakpoint
CREATE TYPE "public"."sf_payment_status" AS ENUM('Paid', 'Free', 'Pending', 'For Review');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" serial NOT NULL,
	"variant_id" serial NOT NULL,
	"quantity" text NOT NULL,
	"price" text NOT NULL,
	"created_date" timestamp,
	"updated_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"buyer_id" text,
	"status_flow_id" serial NOT NULL,
	"platform" "platform" NOT NULL,
	"buyer_name" text NOT NULL,
	"status" text NOT NULL,
	"payment_status" "payment_status" NOT NULL,
	"fees" text,
	"fees_payment_status" "sf_payment_status",
	"isf" text,
	"isf_payment_status" "isf_payment_status",
	"order_date" text NOT NULL,
	"created_date" timestamp,
	"updated_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "product_variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" serial NOT NULL,
	"variant_name" varchar(255) NOT NULL,
	"price" text NOT NULL,
	"quantity_available" text NOT NULL,
	"image" text,
	"created_date" timestamp,
	"updated_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"seller_id" text NOT NULL,
	"tags" jsonb,
	"platforms" jsonb,
	"origin_category" text,
	"product_status" "product_status" DEFAULT 'Pre-order',
	"tax" text,
	"deadline_of_down_payment" text,
	"estimated_time_of_arrival" text,
	"created_date" timestamp,
	"updated_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "seller_status_flows" (
	"id" serial PRIMARY KEY NOT NULL,
	"seller_id" text NOT NULL,
	"statuses" jsonb DEFAULT '["Pending","For Review","Completed"]',
	"created_date" timestamp,
	"updated_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"role" "role" NOT NULL,
	"bio" text,
	"terms_and_conditions" text,
	"custom_details" jsonb,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variant_id_product_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_status_flow_id_seller_status_flows_id_fk" FOREIGN KEY ("status_flow_id") REFERENCES "public"."seller_status_flows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seller_status_flows" ADD CONSTRAINT "seller_status_flows_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;