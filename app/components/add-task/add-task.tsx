"use client";

import { useDialog } from "@/app/hooks";
import { AddTaskDialog } from "../add-task-dialog";

export const AddTask: React.FC = () => {
  const { openDialog, closeDialog, isDialogOpen } = useDialog();

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-secondary text-2xl font-bold">Tasks</p>
        <button
          onClick={openDialog}
          className="py-2 px-4 bg-secondary text-white rounded hover:bg-secondary-light"
        >
          Add
        </button>
      </div>
      <AddTaskDialog closeDialog={closeDialog} isDialogOpen={isDialogOpen} />
    </>
  );
};
