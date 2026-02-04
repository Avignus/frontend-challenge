import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("should render loading spinner", () => {
    render(<LoadingSpinner />);

    const spinnerContainer = document.querySelector(".flex.justify-center.items-center.py-8");
    expect(spinnerContainer).toBeInTheDocument();
  });

  it("should have correct spinner structure", () => {
    render(<LoadingSpinner />);

    const spinner = document.querySelector(".relative");
    expect(spinner).toBeInTheDocument();

    const spinnerElements = spinner?.querySelectorAll("div");
    expect(spinnerElements).toHaveLength(2);
  });

  it("should have correct animation classes", () => {
    render(<LoadingSpinner />);

    const spinner = document.querySelector(".relative");
    const firstSpinner = spinner?.querySelector("div");
    const secondSpinner = spinner?.querySelectorAll("div")[1];

    expect(firstSpinner).toHaveClass(
      "w-12",
      "h-12",
      "border-4",
      "border-purple-500/20",
      "border-t-purple-500",
      "rounded-full",
      "animate-spin"
    );

    expect(secondSpinner).toHaveClass(
      "absolute",
      "inset-0",
      "w-12",
      "h-12",
      "border-4",
      "border-transparent",
      "border-b-purple-400",
      "rounded-full",
      "animate-spin"
    );
  });
});
