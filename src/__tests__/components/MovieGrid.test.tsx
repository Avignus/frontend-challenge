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

    // Loading state shows skeleton elements but not the title
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

    // Error state doesn't show the title, only the error message
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
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

    // Empty state doesn't show the title, only the empty message
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

    const movieLinks = screen.getAllByRole("link");
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

    const movieLinks = screen.queryAllByRole("link");
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

    const movieLinks = screen.queryAllByRole("link");
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

    const movieLinks = screen.getAllByRole("link");
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
      "sm:grid-cols-3",
      "md:grid-cols-4",
      "lg:grid-cols-5",
      "gap-4",
      "md:gap-6"
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

    // The component renders a div, not a section
    expect(container.firstChild).toHaveClass("w-full");
  });

  it("should render title with correct styling", () => {
    const { container } = render(
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
      "md:text-2xl",
      "font-bold",
      "text-white"
    );
  });
});
