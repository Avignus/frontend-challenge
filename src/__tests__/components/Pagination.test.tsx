import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "@/components/ui/Pagination";

describe("Pagination", () => {
  it("should render pagination with current page and total pages", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("should disable Previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("should disable Next button on last page", () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("should enable both buttons on middle pages", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );

    const previousButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");
    
    expect(previousButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("should call onPageChange when Previous is clicked", () => {
    const mockOnPageChange = vi.fn();

    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
  });

  it("should call onPageChange when Next is clicked", () => {
    const mockOnPageChange = vi.fn();

    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
  });

  it("should disable buttons when loading", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={vi.fn()}
        isLoading={true}
      />
    );

    const previousButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");
    
    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it("should have correct styling classes", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );

    const container = screen.getByRole("navigation").parentElement;
    expect(container).toHaveClass(
      "flex",
      "justify-center",
      "items-center",
      "gap-4",
      "mt-12",
      "mb-8"
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach(button => {
      expect(button).toHaveClass(
        "px-6",
        "py-3",
        "rounded-xl",
        "bg-white/5",
        "border",
        "border-white/10",
        "text-white",
        "hover:bg-white/10",
        "hover:border-purple-500/50",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "transition-all",
        "flex",
        "items-center",
        "gap-2"
      );
    });
  });

  it("should render page indicator with correct styling", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );

    const pageIndicator = screen.getByText("3").parentElement;
    expect(pageIndicator).toHaveClass(
      "flex",
      "items-center",
      "gap-2",
      "px-4",
      "py-2",
      "bg-black/30",
      "rounded-lg",
      "border",
      "border-white/5"
    );
  });

  it("should highlight current page number", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );

    const currentPageElement = screen.getByText("5");
    expect(currentPageElement).toHaveClass("text-purple-400", "font-semibold");
  });

  it("should show total pages in gray", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );

    const totalPagesElement = screen.getByText("10");
    expect(totalPagesElement).toHaveClass("text-gray-400");
  });

  it("should show separator between pages", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );

    expect(screen.getByText("/")).toBeInTheDocument();
    expect(screen.getByText("/")).toHaveClass("text-gray-500");
  });

  it("should not call onPageChange when disabled button is clicked", () => {
    const mockOnPageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
