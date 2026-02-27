import { useState } from 'react';

const SendIcon = () => (
  <svg className="form-panel__icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

/**
 * @param {{ onSubmit: (data: { to: string, message: string, from: string }) => Promise<void> }} props
 */
export default function GratitudeForm({ onSubmit }) {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [from, setFrom] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ to, message, from });
      setTo('');
      setMessage('');
      setFrom('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-panel">
      <h2 className="serif form-panel__title">
        <SendIcon />
        Send Gratitude
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="toName">Recipient Name</label>
          <input
            id="toName"
            type="text"
            className="form-input"
            placeholder="Who are you appreciating?"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="message">Your Message</label>
          <textarea
            id="message"
            className="form-textarea"
            placeholder="Write something meaningful..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="fromName">From (Optional)</label>
          <input
            id="fromName"
            type="text"
            className="form-input"
            placeholder="Anonymous"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Posting…' : 'Post to Board'}
        </button>
      </form>

      {success && (
        <div className="status-banner" role="status">
          Message shared successfully! 🎉
        </div>
      )}
    </div>
  );
}
