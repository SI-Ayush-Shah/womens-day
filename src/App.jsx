import { useState, useCallback } from 'react';
import './index.css';

import DecorativeBackground from './components/DecorativeBackground';
import Hero from './components/Hero';
import GratitudeForm from './components/GratitudeForm';
import GratitudeBoard from './components/GratitudeBoard';
import Toast from './components/Toast';

// ---------------------------------------------------------------------------
// Seed data — will be replaced by Supabase fetch
// ---------------------------------------------------------------------------
const INITIAL_MESSAGES = [
  {
    id: 1,
    to: 'Sarah Johnson',
    message:
      'Thank you for being such an inspiring lead. Your mentorship has changed the way I approach challenges every day!',
    from: 'Alex P.',
    date: 'March 8, 2024',
  },
  {
    id: 2,
    to: 'The Operations Team',
    message:
      'To all the women in ops: your efficiency and dedication behind the scenes are what keep this company running. You are powerhouses!',
    from: 'David Miller',
    date: 'March 8, 2024',
  },
];

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
export default function App() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [loading, setLoading] = useState(false); // flip to true when fetching from Supabase
  const [toast, setToast] = useState(false);

  // ── Show toast for 3 s ──────────────────────────────────────────────────
  const showToast = useCallback(() => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }, []);

  // ── Handle new message submission ───────────────────────────────────────
  // Replace this body with your Supabase insert call later.
  const handleSubmit = useCallback(async ({ to, message, from }) => {
    const newMessage = {
      id: Date.now(),
      to,
      message,
      from: from || 'Anonymous',
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    // TODO: await supabase.from('messages').insert([newMessage]);
    setMessages((prev) => [...prev, newMessage]);
    showToast();
  }, [showToast]);

  return (
    <>
      <DecorativeBackground />

      <main className="app-wrapper">
        <Hero />

        <div className="content-grid">
          {/* ── Left: Form ── */}
          <GratitudeForm onSubmit={handleSubmit} />

          {/* ── Right: Board ── */}
          <GratitudeBoard messages={messages} loading={loading} />
        </div>
      </main>

      <Toast visible={toast} />
    </>
  );
}
