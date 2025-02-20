import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterDialogContent } from "./filter-dialog";
import { Priority } from "../../db/schemas";

jest.mock("../../hooks", () => ({
  useFilter: () => ({
    filters: {
      priorities: [Priority.HIGH],
      hideCompleted: false,
    },
  }),
}));

describe("FilterDialogContent", () => {
  it("renders when isFiltersDialogOpen is true", () => {
    const handleCloseDialog = jest.fn();
    const handleApply = jest.fn();

    render(
      <FilterDialogContent
        closeFiltersDialog={handleCloseDialog}
        isFiltersDialogOpen={true}
        onApply={handleApply}
      />
    );

    expect(screen.getByText("Filter Tasks")).toBeInTheDocument();

    expect(screen.getByText("Priorities:")).toBeInTheDocument();
    expect(screen.getByText("Hide Completed:")).toBeInTheDocument();

    expect(screen.getByText("Apply Filters")).toBeInTheDocument();
  });

  it("displays initial filter values correctly", () => {
    render(
      <FilterDialogContent
        closeFiltersDialog={() => {}}
        isFiltersDialogOpen={true}
        onApply={() => {}}
      />
    );

    expect(
      screen
        .getAllByText(Priority.HIGH)
        .filter((ele) => ele.tagName.toLowerCase() === "div")[0]
    ).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("allows user to change priority selection", () => {
    render(
      <FilterDialogContent
        closeFiltersDialog={() => {}}
        isFiltersDialogOpen={true}
        onApply={() => {}}
      />
    );

    const dropdown = screen.getByTestId("select-priority-tasks");
    fireEvent.click(dropdown);

    const highPriorityOption = within(dropdown).getByText(Priority.HIGH);
    fireEvent.click(highPriorityOption);

    const lowPriorityOption = within(dropdown).getByText(Priority.LOW);
    fireEvent.click(lowPriorityOption);

    expect(screen.getByText(Priority.LOW)).toBeInTheDocument();
  });

  it("allows toggling hideCompleted checkbox", () => {
    render(
      <FilterDialogContent
        closeFiltersDialog={() => {}}
        isFiltersDialogOpen={true}
        onApply={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("calls onApply with selected filters when clicking Apply Filters", () => {
    const handleApply = jest.fn();

    render(
      <FilterDialogContent
        closeFiltersDialog={() => {}}
        isFiltersDialogOpen={true}
        onApply={handleApply}
      />
    );

    // Simulate clicking Apply Filters
    const applyButton = screen.getByText("Apply Filters");
    fireEvent.click(applyButton);

    // Expect the onApply function to be called with updated values
    expect(handleApply).toHaveBeenCalledWith([Priority.HIGH], false);
  });
});
