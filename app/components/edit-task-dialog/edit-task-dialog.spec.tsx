import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditDialog } from "./edit-task-dialog";
import { editTask } from "../../actions";
import { useForm } from "react-hook-form";
import { EditTaskSchema } from "../../dto";
import { Priority } from "../../db/schemas";

// Mock `editTask` function
jest.mock("../../actions", () => ({
  editTask: jest.fn(),
}));

// ✅ Wrapper component to provide `useForm()` instance
const EditDialogTestWrapper = ({
  isDialogOpen,
  closeDialog,
  defaultValues,
}: {
  isDialogOpen: boolean;
  closeDialog: () => void;
  defaultValues: EditTaskSchema;
}) => {
  const form = useForm<EditTaskSchema>({
    defaultValues,
  });

  return (
    <EditDialog
      isDialogOpen={isDialogOpen}
      closeDialog={closeDialog}
      form={form}
    />
  );
};

describe("EditDialog Component", () => {
  const mockCloseDialog = jest.fn();

  it("renders the dialog when open", () => {
    render(
      <EditDialogTestWrapper
        isDialogOpen={true}
        closeDialog={mockCloseDialog}
        defaultValues={{
          id: "1",
          title: "Test Task",
          description: "Test description",
          priority: Priority.MEDIUM,
          completed: false,
        }}
      />
    );

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter task title")).toHaveValue(
      "Test Task"
    );
    expect(screen.getByPlaceholderText("Enter task description")).toHaveValue(
      "Test description"
    );
  });

  it("does not render when isDialogOpen is false", () => {
    render(
      <EditDialogTestWrapper
        isDialogOpen={false}
        closeDialog={mockCloseDialog}
        defaultValues={{
          id: "1",
          title: "Test Task",
          description: "Test description",
          priority: Priority.MEDIUM,
          completed: false,
        }}
      />
    );

    expect(screen.queryByText("Edit Task")).not.toBeInTheDocument();
  });

  it("validates required fields when submitting an empty form", async () => {
    render(
      <EditDialogTestWrapper
        isDialogOpen={true}
        closeDialog={mockCloseDialog}
        defaultValues={{
          id: "",
          title: "",
          description: "",
          priority: Priority.HIGH,
          completed: false,
        }}
      />
    );

    fireEvent.submit(screen.getByRole("button", { name: /Update Task/i }));

    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
  });

  it("submits the form with valid data and calls editTask", async () => {
    (editTask as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <EditDialogTestWrapper
        isDialogOpen={true}
        closeDialog={mockCloseDialog}
        defaultValues={{
          id: "1",
          title: "Test Task",
          description: "Test description",
          priority: Priority.MEDIUM,
          completed: false,
        }}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter task title"), {
      target: { value: "Updated Task" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter task description"), {
      target: { value: "Updated description" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /update task/i }));

    await waitFor(() => {
      expect(editTask).toHaveBeenCalledWith({
        id: "1",
        title: "Updated Task",
        description: "Updated description",
        priority: Priority.MEDIUM,
        completed: false,
      });
    });

    expect(mockCloseDialog).toHaveBeenCalled();
  });

  it("does not close the dialog if task update fails", async () => {
    (editTask as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to update task")
    );

    render(
      <EditDialogTestWrapper
        isDialogOpen={true}
        closeDialog={mockCloseDialog}
        defaultValues={{
          id: "1",
          title: "Test Task",
          description: "Test description",
          priority: Priority.MEDIUM,
          completed: false,
        }}
      />
    );

    fireEvent.submit(screen.getByRole("button", { name: /update task/i }));

    await waitFor(() => {
      expect(editTask).toHaveBeenCalled();
    });

    expect(mockCloseDialog).not.toHaveBeenCalled();
  });
});
