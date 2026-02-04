import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MovieGrid } from "@/components/movies/MovieGrid";
import type { Movie } from "@/components/movies/MovieCard";

const mockMovies: Movie[] = [
  {
    id: "tt1234567",
    title: "Test Movie 1",
    year: 2023,
    poster: "https://example.com/poster1.jpg",
    rating: 8.5,
    type: "MOVIE",
  },
  {
    id: "tt7654321",
    title: "Test Movie 2",
    year: 2022,
    poster: "https://example.com/poster2.jpg",
    rating: 7.5,
    type: "MOVIE",
  },
];

describe("MovieGrid", () => {
  it("should render movie grid with title", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        title="Test Movies"
        isLoading={false}
        error={null}
      />
    );

    expect(screen.getByText("Test Movies")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  it("should render loading state", () => {
    render(
      <MovieGrid
        movies={[]}
        title="Loading Movies"
        isLoading={true}
        error={null}
      />
    );

    expect(screen.getByText("Loading Movies")).toBeInTheDocument();
    // Check for skeleton loading elements
    const skeletonElements = document.querySelectorAll(".animate-pulse");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("should render error state", () => {
    render(
      <MovieGrid
        movies={[]}
        title="Error Movies"
        isLoading={false}
        error="Failed to load movies"
      />
    );

    expect(screen.getByText("Error Movies")).toBeInTheDocument();
    expect(screen.getByText("Failed to load movies")).toBeInTheDocument();
  });

  it("should render empty state", () => {
    render(
      <MovieGrid
        movies={[]}
        title="Empty Movies"
        isLoading={false}
        error={null}
        emptyMessage="No movies found"
      />
    );

    expect(screen.getByText("Empty Movies")).toBeInTheDocument();
    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });

  it("should render default empty message", () => {
    render(
      <MovieGrid
        movies={[]}
        title="Empty Movies"
        isLoading={false}
        error={null}
      />
    );

    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });

  it("should render correct number of movie cards", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        title="Test Movies"
        isLoading={false}
        error={null}
      />
    );

    const movieLinks = screen.getAllByRole("article");
    expect(movieLinks).toHaveLength(2);
  });

  it("should not render movies when loading", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        title="Loading Movies"
        isLoading={true}
        error={null}
      />
    );

    const movieLinks = screen.queryAllByRole("article");
    expect(movieLinks).toHaveLength(0);
  });

  it("should not render movies when there's an error", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        title="Error Movies"
        isLoading={false}
        error="Network error"
      />
    );

    const movieLinks = screen.queryAllByRole("article");
    expect(movieLinks).toHaveLength(0);
  });

  it("should render movie cards with correct links", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        title="Test Movies"
        isLoading={false}
        error={null}
      />
    );

    const movieLinks = screen.getAllByRole("article");
    expect(movieLinks[0]).toHaveAttribute("href", "/movie/tt1234567");
    expect(movieLinks[1]).toHaveAttribute("href", "/movie/tt7654321");
  });

  it("should render movie cards with correct titles and years", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        title="Test Movies"
        isLoading={false}
        error={null}
      />
    );

    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
  });

  it("should have correct grid layout classes", () => {
    const { container } = render(
      <MovieGrid
        movies={mockMovies}
        title="Test Movies"
        isLoading={false}
        error={null}
      />
    );

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass(
      "grid",
      "grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-4",
      "xl:grid-cols-5",
      "gap-4"
    );
  });

  it("should render section with correct structure", () => {
    const { container } = render(
      <MovieGrid
        movies={mockMovies}
        title="Test Movies"
        isLoading={false}
        error={null}
      />
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass(
      "w-full",
      "bg-white",
      "rounded-xl",
      "shadow-md",
      "p-6",
      "md:p-8"
    );
  });

  it("should render title with correct styling", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        title="Styled Title"
        isLoading={false}
        error={null}
      />
    );

    const title = screen.getByText("Styled Title");
    expect(title).toHaveClass(
      "text-xl",
      "font-bold",
      "text-gray-800",
      "mb-6"
    );
  });
});
