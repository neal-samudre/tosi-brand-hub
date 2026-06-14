const FILTER_OPTIONS = ['All', 'Approved', 'Pending', 'Archived'] as const;

export function AssetFilters() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FILTER_OPTIONS.map((filter) => (
        <button
          key={filter}
          className="px-3 py-1.5 rounded-full text-sm font-body border border-navy/20 text-navy hover:border-terracotta hover:text-terracotta transition-colors"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
