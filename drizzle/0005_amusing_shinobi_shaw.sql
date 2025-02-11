CREATE TYPE "public"."role" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" "role" DEFAULT 'medium';