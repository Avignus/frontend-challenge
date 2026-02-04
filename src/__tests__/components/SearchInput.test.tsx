import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "@/components/search/SearchInput";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("SearchInput", () => {
  const mockOnSearch = vi.fn();
  const mockOnClear = vi.fn();

  it("renders with initial value", () => {
    render(<SearchInput initialValue="batman" onSearch={mockOnSearch} onClear={mockOnClear} />);
    expect(screen.getByDisplayValue("batman")).toBeInTheDocument();
  });

  it("disables submit button when query is too short", () => {
    render(<SearchInput initialValue="a" onSearch={mockOnSearch} onClear={mockOnClear} />);
    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toBeDisabled();
  });

  it("shows clear button when input has value", () => {
    render(<SearchInput initialValue="batman" onSearch={mockOnSearch} onClear={mockOnClear} />);
    expect(screen.getByLabelText(/clear/i)).toBeInTheDocument();
  });

  it("enables submit button when query is valid", () => {
    render(<SearchInput initialValue="batman" onSearch={mockOnSearch} onClear={mockOnClear} />);
    const button = screen.getByRole("button", { name: "Search" });
    expect(button).not.toBeDisabled();
  });

  it("updates input value when typing", () => {
    render(<SearchInput onSearch={mockOnSearch} onClear={mockOnClear} />);
    const input = screen.getByLabelText(/search movies/i);
    fireEvent.change(input, { target: { value: "superman" } });
    expect(input).toHaveValue("superman");
  });
});
