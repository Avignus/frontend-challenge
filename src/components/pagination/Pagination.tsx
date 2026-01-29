"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  query: string;
  resultsPerPage?: number;
}

export function Pagination({
  currentPage,
  totalResults,
  query,
  resultsPerPage = 10,
}: PaginationProps) {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const createPageUrl = (page: number) =>
    `/?q=${encodeURIComponent(query)}&page=${page}`;

  return (
    <nav className="flex items-center justify-center gap-4 mt-8" aria-label="Pagination">
      <Link
        href={hasPrevious ? createPageUrl(currentPage - 1) : "#"}
        className={`px-4 py-2 rounded-lg ${
          hasPrevious
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
        }`}
        aria-disabled={!hasPrevious}
      >
        ← Previous
      </Link>
      
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      
      <Link
        href={hasNext ? createPageUrl(currentPage + 1) : "#"}
        className={`px-4 py-2 rounded-lg ${
          hasNext
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
        }`}
        aria-disabled={!hasNext}
      >
        Next →
      </Link>
    </nav>
  );
}
