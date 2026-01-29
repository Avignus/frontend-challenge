import { describe, it, expect } from "vitest";

// Example utility function
function formatRuntime(runtime: string): string {
  if (runtime === "N/A") return "Unknown";
  const match = runtime.match(/(\d+)/);
  if (!match) return runtime;
  const minutes = parseInt(match[1], 10);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

describe("formatRuntime", () => {
  it("handles N/A value", () => {
    expect(formatRuntime("N/A")).toBe("Unknown");
  });

  it("formats minutes correctly", () => {
    expect(formatRuntime("45 min")).toBe("45m");
  });

  it("formats hours and minutes", () => {
    expect(formatRuntime("142 min")).toBe("2h 22m");
  });

  it("returns original value if no numbers found", () => {
    expect(formatRuntime("Unknown")).toBe("Unknown");
  });
});
