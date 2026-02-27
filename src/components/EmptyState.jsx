export default function EmptyState() {
  return (
    <div className="empty-state">
      <svg
        className="empty-state__icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
      <p className="empty-state__text">
        No messages yet. Be the first to share your gratitude!
      </p>
    </div>
  );
}
