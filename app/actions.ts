"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db/";
import { tasksTable } from "./db/schemas/";
import { eq } from "drizzle-orm";
import { CreateTaskSchema, EditTaskSchema } from "./dto";

export async function getTasks() {
  try {
    const tasks = await db
      .select()
      .from(tasksTable)
      .orderBy(tasksTable.dateCreated);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

export const createTask = async (task: CreateTaskSchema) => {
  try {
    const createdTasks = await db
      .insert(tasksTable)
      .values({
        ...task,
        userId: "15a216ed-d557-4b55-8905-e83225f770f0",
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
