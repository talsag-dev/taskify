"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db/";
import { Priority, tasksTable } from "./db/schemas/";
import { and, eq, inArray, not } from "drizzle-orm";
import { CreateTaskSchema, EditTaskSchema } from "./dto";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/auth";
import { TaskFilters } from "./hooks/useFilters";

export async function getTasks(filters: TaskFilters = {}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    console.warn("No session found or user is not authenticated.");
    return [];
  }
  try {
    const validPriorities = filters.priorities
      ?.map((p) => Priority[p.toUpperCase() as keyof typeof Priority])
      .filter((p): p is Priority => p !== undefined);

    const conditions = [
      eq(tasksTable.userId, session.user.id),
      validPriorities?.length
        ? inArray(tasksTable.priority, validPriorities)
        : undefined,
      filters.hideCompleted ? not(eq(tasksTable.completed, true)) : undefined,
    ].filter(Boolean);

    const tasks = await db
      .select()
      .from(tasksTable)
      .where(and(...conditions))
      .orderBy(tasksTable.dateCreated);

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

export const createTask = async (task: CreateTaskSchema) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    console.warn("No session found or user is not authenticated.");
    return [];
  }
  try {
    const createdTasks = await db
      .insert(tasksTable)
      .values({
        ...task,
        userId: session.user.id,
      })
      .returning();

    if (createdTasks.length === 0) {
      throw new Error(`could not create task ${task}`);
    }
    revalidatePath("/");
    return createdTasks[0];
  } catch (e) {
    throw new Error(`could not create task ${task} , ${JSON.stringify(e)}`);
  }
};

export const removeTasks = async (id: string) => {
  try {
    await db.delete(tasksTable).where(eq(tasksTable.id, id));
    revalidatePath("/");
  } catch (e) {
    throw new Error(`Could not delete task ${id} , ${JSON.stringify(e)}`);
  }
};

export const editTask = async (taskEdit: EditTaskSchema) => {
  try {
    const editedTask = await db
      .update(tasksTable)
      .set({ ...taskEdit })
      .where(eq(tasksTable.id, taskEdit.id))
      .returning();

    if (editedTask.length === 0) {
      throw new Error(`could not edit task ${taskEdit.id}`);
    }
    revalidatePath("/");
    return editedTask[0];
  } catch (e) {
    throw new Error(
      `Could not edit task ${taskEdit.id} , ${JSON.stringify(e)}`
    );
  }
};
