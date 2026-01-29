"use client";

import { useState } from "react";

type PaginationMode = "traditional" | "infinite";

interface PaginationToggleProps {
  mode: PaginationMode;
  onModeChange: (mode: PaginationMode) => void;
}

export function PaginationToggle({ mode, onModeChange }: PaginationToggleProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
        <button
          onClick={() => onModeChange("traditional")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            mode === "traditional"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          Traditional Pagination
        </button>
        <button
          onClick={() => onModeChange("infinite")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            mode === "infinite"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          Infinite Scroll
        </button>
      </div>
    </div>
  );
}
