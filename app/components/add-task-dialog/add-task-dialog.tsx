import { Dialog } from "../dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTask } from "../../actions";
import { createTaskSchema, CreateTaskSchema } from "../../dto";

export const AddTaskDialog: React.FC<{
  isDialogOpen: boolean;
  closeDialog: () => void;
}> = ({ isDialogOpen, closeDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateTaskSchema) => {
    try {
      await createTask(data);
      closeDialog();
      reset();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };
  return (
    <Dialog isOpen={isDialogOpen} onClose={closeDialog} title="Add a Task">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <input
            {...register("title")}
            placeholder="Enter task title"
            className="p-2 border rounded w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 dark:text-red-400">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register("description")}
            placeholder="Enter task description"
            className="p-2 border rounded w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[80px] max-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 dark:text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-2 px-4 bg-primary text-white rounded hover:bg-primary-light disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700`}
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>
      </form>
    </Dialog>
  );
};
