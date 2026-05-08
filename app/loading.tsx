export default function Loading() {
  return (
    <div
      className="min-h-[40vh] max-w-content mx-auto px-4 md:px-8 py-16 space-y-6"
      aria-busy="true"
      aria-label="Loading page content"
    >
      <div className="h-10 w-2/3 max-w-md rounded-md bg-surface-container animate-pulse" />
      <div className="h-4 w-full max-w-xl rounded-md bg-surface-container-low animate-pulse" />
      <div className="h-4 w-5/6 max-w-lg rounded-md bg-surface-container-low animate-pulse" />
      <div className="grid gap-4 md:grid-cols-3 pt-8">
        <div className="h-40 rounded-lg border border-outline/10 bg-surface-container-low/80 animate-pulse" />
        <div className="h-40 rounded-lg border border-outline/10 bg-surface-container-low/80 animate-pulse" />
        <div className="h-40 rounded-lg border border-outline/10 bg-surface-container-low/80 animate-pulse" />
      </div>
    </div>
  );
}
