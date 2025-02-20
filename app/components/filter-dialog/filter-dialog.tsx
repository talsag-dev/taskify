import { useState, useEffect } from "react";
import { Priority } from "../../db/schemas";
import { MultiSelectWithTags } from "../multi-select";
import { FilterDialogContentProps } from "./types";
import { Dialog } from "../dialog";
import { useFilter } from "../../hooks/";

export const FilterDialogContent: React.FC<FilterDialogContentProps> = ({
  onApply,
  closeFiltersDialog,
  isFiltersDialogOpen,
}) => {
  const { filters } = useFilter();

  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(
    filters.priorities
  );
  const [hideCompleted, setHideCompleted] = useState(filters.hideCompleted);

  useEffect(() => {
    if (isFiltersDialogOpen) {
      setSelectedPriorities(filters.priorities);
      setHideCompleted(filters.hideCompleted);
    }
  }, [isFiltersDialogOpen]);

  const handleApplyFilters = () => {
    onApply(selectedPriorities, hideCompleted);
  };

  return (
    <Dialog
      isOpen={isFiltersDialogOpen}
      onClose={closeFiltersDialog}
      title="Filter Tasks"
    >
      <div className="p-4 flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-center">
          <span className="font-medium">Priorities:</span>
          <MultiSelectWithTags
            options={Object.values(Priority)}
            selectedOptions={selectedPriorities}
            onSelectionChange={setSelectedPriorities}
          />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <span className="font-medium">Hide Completed:</span>
          <input
            data-testid="hide-completed-checkbox"
            type="checkbox"
            className="w-5 h-5"
            checked={hideCompleted}
            onChange={(e) => setHideCompleted(e.target.checked)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleApplyFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Dialog>
  );
};
