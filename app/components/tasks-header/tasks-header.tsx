"use client";

import { useDialog, useFilter } from "../../hooks/";
import { AddTaskDialog } from "../add-task-dialog";
import { FilterIcon } from "lucide-react";
import { FilterDialogContent } from "../filter-dialog/filter-dialog";

export const TasksHeader: React.FC = () => {
  const { openDialog, closeDialog, isDialogOpen } = useDialog();
  const {
    openDialog: openFiltersDialog,
    closeDialog: closeFiltersDialog,
    isDialogOpen: isFiltersDialogOpen,
  } = useDialog();

  const { filters, applyFilters, clearFilters } = useFilter();

  const handleFilterTasks = (
    selectedPriorities: string[],
    hideCompleted: boolean
  ) => {
    applyFilters({
      priorities: selectedPriorities,
      hideCompleted,
    });
    closeFiltersDialog();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-secondary text-2xl font-bold">Tasks</p>
        <div className="flex flex-row items-center gap-4">
          {(filters.hideCompleted || filters.priorities.length > 0) && (
            <p
              onClick={clearFilters}
              className="hover:underline hover:cursor-pointer text-secondary hover:text-secondary-dark dark:hover:text-secondary-light dark:text-secondary-dark"
            >
              Clear Filters
            </p>
          )}
          <FilterIcon
            className="dark:hover:text-secondary-dark hover:text-secondary-light hover:cursor-pointer"
            onClick={openFiltersDialog}
          />
          <button
            onClick={openDialog}
            className="py-2 px-4 bg-secondary text-white rounded hover:bg-secondary-light dark:hover:text-secondary-dark"
          >
            Add
          </button>
        </div>
      </div>
      <AddTaskDialog closeDialog={closeDialog} isDialogOpen={isDialogOpen} />
      <FilterDialogContent
        onApply={handleFilterTasks}
        closeFiltersDialog={closeFiltersDialog}
        isFiltersDialogOpen={isFiltersDialogOpen}
      />
    </>
  );
};
