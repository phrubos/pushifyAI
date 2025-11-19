CREATE TYPE "public"."admin_role" AS ENUM('admin', 'super_admin');--> statement-breakpoint
CREATE TYPE "public"."generation_size" AS ENUM('small', 'medium', 'large');--> statement-breakpoint
CREATE TYPE "public"."generation_status" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."generation_style" AS ENUM('cute', 'realistic', 'cartoon');--> statement-breakpoint
CREATE TYPE "public"."transaction_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('purchase', 'bonus', 'admin', 'deduction', 'refund');--> statement-breakpoint
CREATE TABLE "admin_users" (
	"user_id" text PRIMARY KEY NOT NULL,
	"role" "admin_role" DEFAULT 'admin' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generations" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"original_image_url" text NOT NULL,
	"generated_image_url" text,
	"status" "generation_status" DEFAULT 'pending' NOT NULL,
	"style" "generation_style" NOT NULL,
	"size" "generation_size" NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"prompt" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"credits" integer NOT NULL,
	"type" "transaction_type" NOT NULL,
	"status" "transaction_status" DEFAULT 'completed' NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "credits" integer DEFAULT 10 NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ADD CONSTRAINT "admin_users_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generations" ADD CONSTRAINT "generations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "generations_user_id_idx" ON "generations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "generations_status_idx" ON "generations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "generations_created_at_idx" ON "generations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "transactions_user_id_idx" ON "transactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "transactions_created_at_idx" ON "transactions" USING btree ("created_at");