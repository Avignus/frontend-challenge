interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-12 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isLoading}
        className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <div className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-lg border border-white/5">
        <span className="text-purple-400 font-semibold">{currentPage}</span>
        <span className="text-gray-500">/</span>
        <span className="text-gray-400">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isLoading}
        className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
      >
        Next
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
