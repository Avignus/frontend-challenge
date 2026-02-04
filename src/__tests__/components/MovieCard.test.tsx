import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MovieCard } from "@/components/search/MovieCard";
import type { MovieSearchResult } from "@/types/movie";

const mockMovie: MovieSearchResult = {
  id: "tt1234567",
  primaryTitle: "Test Movie",
  originalTitle: "Test Movie",
  type: "MOVIE",
  startYear: 2023,
  primaryImage: {
    url: "https://example.com/poster.jpg",
    width: 300,
    height: 450,
  },
  rating: { aggregateRating: 8.5 },
};

describe("MovieCard", () => {
  it("should render movie information correctly", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("should render with correct link", () => {
    render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole("article");
    expect(link).toHaveAttribute("href", "/movie/tt1234567");
  });

  it("should display poster image", () => {
    render(<MovieCard movie={mockMovie} />);

    const image = screen.getByAltText("Test Movie movie poster");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/poster.jpg");
  });

  it("should use fallback poster when no image is provided", () => {
    const movieWithoutImage = {
      ...mockMovie,
      primaryImage: undefined,
    };

    render(<MovieCard movie={movieWithoutImage} />);

    const image = screen.getByAltText("Test Movie movie poster");
    expect(image).toHaveAttribute("src", "/placeholder-movie.svg");
  });

  it("should handle image error by using fallback", () => {
    render(<MovieCard movie={mockMovie} />);

    const image = screen.getByAltText("Test Movie movie poster");
    
    // Simulate image error
    const errorEvent = new Event("error");
    Object.defineProperty(errorEvent, "target", {
      value: image,
      writable: false,
    });

    image.dispatchEvent(errorEvent);

    expect(image).toHaveAttribute("src", "/placeholder-movie.svg");
  });

  it("should use original title when primary title is missing", () => {
    const movieWithoutPrimaryTitle = {
      ...mockMovie,
      primaryTitle: "",
      originalTitle: "Original Title",
    };

    render(<MovieCard movie={movieWithoutPrimaryTitle} />);

    expect(screen.getByText("Original Title")).toBeInTheDocument();
  });

  it("should use Untitled when both titles are missing", () => {
    const movieWithoutTitles = {
      ...mockMovie,
      primaryTitle: "",
      originalTitle: undefined,
    };

    render(<MovieCard movie={movieWithoutTitles} />);

    expect(screen.getByText("Untitled")).toBeInTheDocument();
  });

  it("should not display year when startYear is missing", () => {
    const movieWithoutYear = {
      ...mockMovie,
      startYear: undefined,
    };

    render(<MovieCard movie={movieWithoutYear} />);

    expect(screen.queryByText(/\d{4}/)).not.toBeInTheDocument();
  });

  it("should have correct accessibility attributes", () => {
    render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole("article");
    expect(link).toHaveAttribute(
      "aria-label",
      "View details for Test Movie (2023)"
    );
  });

  it("should have hover and focus styles", () => {
    render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole("article");
    expect(link).toHaveClass(
      "group",
      "block",
      "bg-white",
      "rounded-xl",
      "shadow-md",
      "overflow-hidden",
      "hover:shadow-xl",
      "transition-all",
      "duration-300",
      "transform",
      "hover:scale-105",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-blue-500",
      "focus:ring-offset-2"
    );
  });

  it("should have correct image aspect ratio", () => {
    render(<MovieCard movie={mockMovie} />);

    const imageContainer = screen.getByAltText("Test Movie movie poster").parentElement;
    expect(imageContainer).toHaveClass("aspect-[2/3]");
  });
});
