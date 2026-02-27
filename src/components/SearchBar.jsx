const SearchIcon = () => (
  <svg className="search-bar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
);

/**
 * @param {{ value: string, onChange: (v: string) => void, count: number, total: number }} props
 */
export default function SearchBar({ value, onChange, count, total }) {
  return (
    <div className="search-bar">
      <div className="search-bar__input-wrap">
        <SearchIcon />
        <input
          type="search"
          className="search-bar__input"
          placeholder="Search by name or recipient…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search messages"
        />
        {value && (
          <button
            className="search-bar__clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {value && (
        <p className="search-bar__hint">
          {count === 0
            ? 'No messages match your search'
            : `Showing ${count} of ${total}`}
        </p>
      )}
    </div>
  );
}
