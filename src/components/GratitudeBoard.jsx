import GratitudeCard from './GratitudeCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';

const SKELETON_COUNT = 4;

/**
 * @param {{ messages: Array<{ id: string|number, to: string, message: string, from: string, date: string }>, loading: boolean }} props
 */
export default function GratitudeBoard({ messages, loading }) {
  const count = messages.length;

  return (
    <section>
      <div className="board-header">
        <h2 className="serif board-title">The Gratitude Board</h2>
        <span className="board-counter">
          {count} {count === 1 ? 'Message' : 'Messages'}
        </span>
      </div>

      {loading ? (
        // Skeleton loading loop
        <div className="cards-grid">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : count === 0 ? (
        <EmptyState />
      ) : (
        // Messages loop (newest first)
        <div className="cards-grid">
          {[...messages].reverse().map((msg, index) => (
            <GratitudeCard key={msg.id ?? index} message={msg} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
