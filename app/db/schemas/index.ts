/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export const priorityEnum = pgEnum("role", enumToPgEnum(Priority));

/**
 * known issue for drizzle orm https://github.com/drizzle-team/drizzle-orm/discussions/1914
 * */
export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any;
}

export const tasksTable = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  dateCreated: timestamp("date_created", { withTimezone: true }).defaultNow(),
  completed: boolean("completed").default(false),
  priority: priorityEnum("priority").default(Priority.MEDIUM),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
});
