"use client";
import { editTaskSchema, EditTaskSchema, Task } from "../../dto";
import { removeTasks } from "../../actions";
import { PencilIcon } from "lucide-react";
import { useDialog } from "../../hooks";
import { EditDialog } from "../edit-task-dialog";
import { useForm } from "react-hook-form";
import { TasksViewerProps } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { editTask } from "../../actions";
import { Priority } from "@/app/db/schemas";

export const TasksViewer: React.FC<TasksViewerProps> = ({ tasks }) => {
  const { openDialog, closeDialog, isDialogOpen } = useDialog();
  const form = useForm<EditTaskSchema>({
    resolver: zodResolver(editTaskSchema),
  });

  const handleDeleteTask = (id: string) => {
    removeTasks(id);
  };

  const handleEditTask = (task: Task) => {
    form.reset({
      id: task.id,
      title: task.title,
      description: task.description || "",
      priority: task.priority || undefined,
      completed: task.completed || undefined,
    });
    openDialog();
  };

  const handleChangeCompleted = async (
    e: ChangeEvent<HTMLInputElement>,
    task: Task
  ) => {
    e.preventDefault();
    await editTask({
      ...task,
      description: task.description ?? undefined,
      priority: task.priority ?? undefined,
      completed: e.target.checked,
    });
  };

  const getPriorityColor = (priority: Priority | null) => {
    switch (priority) {
      case Priority.HIGH:
        return "bg-red-500 text-white";
      case Priority.MEDIUM:
        return "bg-yellow-500 text-black";
      case Priority.LOW:
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="mt-8">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className="p-6 border border-secondary rounded-lg shadow-lg dark:shadow-gray-700 w-full min-h-[200px] flex flex-col bg-white dark:bg-gray-900 h-full"
            >
              {/* Title */}
              <div className="flex flex-row justify-between items-center">
                <p className="font-bold text-lg capitalize">{task.title}</p>

                <div className="flex flex-row items-center">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
              {/* Description */}
              <div className="flex-1 flex items-start">
                <p className="mt-4 text-gray-700 dark:text-gray-300 overflow-hidden text-ellipsis line-clamp-4 break-words capitalize">
                  {task.description}
                </p>
              </div>

              <footer className="flex flex-row justify-between items-center mt-4">
                <div className="flex-1">
                  <span
                    className={`px-2 py-1 text-xs font-semibold capitalize rounded-full ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 ml-auto"
                  onChange={(e) => handleChangeCompleted(e, task)}
                  checked={task.completed || false}
                  id={`completed-indicator-${task.id}`}
                />
              </footer>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No tasks available.</li>
        )}
      </ul>

      <EditDialog
        closeDialog={closeDialog}
        isDialogOpen={isDialogOpen}
        form={form}
      />
    </div>
  );
};
