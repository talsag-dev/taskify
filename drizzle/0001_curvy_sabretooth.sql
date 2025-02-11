CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"date_created" date DEFAULT now(),
	"completed" boolean DEFAULT false,
	"priority" "priority" DEFAULT 'normal',
	"user_id" uuid NOT NULL,
	CONSTRAINT "tasks_date_created_unique" UNIQUE("date_created")
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;