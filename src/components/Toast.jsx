/**
 * @param {{ visible: boolean, text?: string }} props
 */
export default function Toast({ visible, text = 'Gratitude shared on the wall! ✨' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast${visible ? ' toast--visible' : ''}`}
    >
      {text}
    </div>
  );
}
