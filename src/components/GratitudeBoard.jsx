import GratitudeCard from './GratitudeCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';

const SKELETON_COUNT = 4;

const SortAscIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9M3 12h5m10 0l-4-4m4 4l-4 4" />
  </svg>
);
const SortDescIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9M3 12h5m10 4l-4-4m4 4l-4 4" />
  </svg>
);

/**
 * @param {{
 *   messages: Array<{ id: string|number, to: string, message: string, from: string, date: string }>,
 *   loading: boolean,
 *   sortOrder: 'newest' | 'oldest',
 *   onSortToggle: () => void,
 * }} props
 */
export default function GratitudeBoard({ messages, loading, sortOrder, onSortToggle }) {
  const count = messages.length;

  return (
    <section>
      <div className="board-header">
        <h2 className="serif board-title">The Gratitude Board</h2>

        <div className="board-header__controls">
          <button
            className="sort-btn"
            onClick={onSortToggle}
            title={sortOrder === 'newest' ? 'Showing newest first' : 'Showing oldest first'}
          >
            {sortOrder === 'newest' ? <SortDescIcon /> : <SortAscIcon />}
            {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
          </button>

          <span className="board-counter">
            {count} {count === 1 ? 'Message' : 'Messages'}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="cards-grid">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : count === 0 ? (
        <EmptyState />
      ) : (
        <div className="cards-grid">
          {messages.map((msg, index) => (
            <GratitudeCard key={msg.id ?? index} message={msg} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
