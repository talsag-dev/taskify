import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddTaskDialog } from ".";
import { createTask } from "../../actions";
import "@testing-library/jest-dom";

// Mock `createTask` function
jest.mock("../../actions", () => ({
  createTask: jest.fn(),
}));

describe("AddTaskDialog", () => {
  const mockCloseDialog = jest.fn();

  it("renders the dialog when open", () => {
    render(<AddTaskDialog isDialogOpen={true} closeDialog={mockCloseDialog} />);

    expect(screen.getByText("Add a Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter task title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter task description")
    ).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <AddTaskDialog isDialogOpen={false} closeDialog={mockCloseDialog} />
    );

    expect(screen.queryByText("Add a Task")).not.toBeInTheDocument();
  });

  it("displays validation errors when submitting empty form", async () => {
    render(<AddTaskDialog isDialogOpen={true} closeDialog={mockCloseDialog} />);

    fireEvent.submit(screen.getByRole("button", { name: /add task/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });

  it("submits the form with valid data and calls createTask", async () => {
    (createTask as jest.Mock).mockResolvedValueOnce(undefined);

    render(<AddTaskDialog isDialogOpen={true} closeDialog={mockCloseDialog} />);

    fireEvent.change(screen.getByPlaceholderText("Enter task title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter task description"), {
      target: { value: "This is a test task description." },
    });

    fireEvent.submit(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith({
        title: "Test Task",
        description: "This is a test task description.",
      });
    });

    expect(mockCloseDialog).toHaveBeenCalled();
  });

  it("handles API errors gracefully", async () => {
    (createTask as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to create task")
    );

    render(<AddTaskDialog isDialogOpen={true} closeDialog={mockCloseDialog} />);

    fireEvent.change(screen.getByPlaceholderText("Enter task title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter task description"), {
      target: { value: "This is a test task description." },
    });

    fireEvent.submit(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(createTask).toHaveBeenCalled();
    });

    // Ensure the dialog doesn't close if task creation fails
    expect(mockCloseDialog).not.toHaveBeenCalled();
  });
});
