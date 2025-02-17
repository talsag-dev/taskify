export interface FilterDialogContentProps {
  onApply: (selectedPriorities: string[], hideCompleted: boolean) => void;
  isFiltersDialogOpen: boolean;
  closeFiltersDialog: () => void;
}
