export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-purple-400 rounded-full animate-spin animation-delay-150" />
      </div>
    </div>
  );
}
