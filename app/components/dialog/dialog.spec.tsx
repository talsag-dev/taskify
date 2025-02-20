import { render, screen, fireEvent } from "@testing-library/react";
import { Dialog } from "../dialog";
import "@testing-library/jest-dom";

describe("Dialog Component", () => {
  it("renders when isOpen is true", () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test Dialog">
        <p>Dialog Content</p>
      </Dialog>
    );

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Dialog isOpen={false} onClose={() => {}} title="Test Dialog">
        <p>Dialog Content</p>
      </Dialog>
    );

    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Dialog Content")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = jest.fn();

    render(
      <Dialog isOpen={true} onClose={mockOnClose} title="Test Dialog">
        <p>Dialog Content</p>
      </Dialog>
    );

    const closeButton = screen.getByRole("button", { name: "✕" });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
