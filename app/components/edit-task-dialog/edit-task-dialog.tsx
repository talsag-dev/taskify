import { editTask } from "../../actions";
import { Dialog } from "../dialog";
import { Priority } from "../../db/schemas";
import { UseFormReturn } from "react-hook-form";
import { EditTaskSchema } from "../../dto";

export const EditDialog: React.FC<{
  isDialogOpen: boolean;
  closeDialog: () => void;
  form: UseFormReturn<EditTaskSchema>;
}> = ({ isDialogOpen, closeDialog, form }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: EditTaskSchema) => {
    try {
      await editTask(data);
      closeDialog();
      reset();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <Dialog title="Edit Task" isOpen={isDialogOpen} onClose={closeDialog}>
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

        <div className="relative">
          <select
            {...register("priority")}
            className="p-3 pr-10 border rounded w-full h-12 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white capitalize appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Select Priority</option>
            {Object.values(Priority).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-300">
            <a />
          </span>
        </div>

        <label className="inline-flex items-center gap-2 cursor-pointer w-fit">
          <input
            type="checkbox"
            {...register("completed")}
            className="h-5 w-5 text-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
          />
          <span className="text-gray-800 dark:text-gray-300">Completed</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-2 px-4 bg-primary text-white rounded hover:bg-primary-light disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700`}
        >
          {isSubmitting ? "Updating..." : "Update Task"}
        </button>
      </form>
    </Dialog>
  );
};
