import { z } from "zod";
import { Priority } from "../db/schemas";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const editTaskSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority).optional(),
  completed: z.boolean().optional(),
});

export type EditTaskSchema = z.infer<typeof editTaskSchema>;

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM).nullable(),
  completed: z.boolean().default(false).nullable(),
  dateCreated: z.date().nullable(),
  userId: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;
