import { useState, useCallback, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import './index.css';

import { supabase } from './supabaseClient';
import DecorativeBackground from './components/DecorativeBackground';
import Hero from './components/Hero';
import GratitudeForm from './components/GratitudeForm';
import GratitudeBoard from './components/GratitudeBoard';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#7c3aed', '#a78bfa', '#c4b5fd', '#f9a8d4', '#ffffff'],
  });
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // ── Show toast ─────────────────────────────────────────────────────────
  const showToast = useCallback(() => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }, []);

  // ── Fetch (reusable) ────────────────────────────────────────────────────
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('appriciation')
      .select('uuid, "Recipient Name", "Your Message", "From", created_at')
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      setError(fetchError.message);
    } else {
      setMessages(data ?? []);
    }
    setLoading(false);
  }, []);

  // ── Fetch on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    (async () => { await fetchMessages(); })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Insert ──────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async ({ to, message, from }) => {
    const { error: insertError } = await supabase.from('appriciation').insert([
      {
        'Recipient Name': to,
        'Your Message': message,
        'From': from,
      },
    ]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw insertError;
    }

    // Re-fetch the full list so the board is always in sync with the DB
    await fetchMessages();
    fireConfetti();
    showToast();
  }, [fetchMessages, showToast]);

  // ── Derived: filter + sort ───────────────────────────────────────────────
  const displayedMessages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    let filtered = messages.map((m) => ({
      id: m.uuid,
      to: m['Recipient Name'],
      message: m['Your Message'],
      from: m['From'],
      date: formatDate(m.created_at),
    }));

    if (q) {
      filtered = filtered.filter(
        (m) =>
          m.to?.toLowerCase().includes(q) ||
          m.from?.toLowerCase().includes(q) ||
          m.message?.toLowerCase().includes(q)
      );
    }

    if (sortOrder === 'newest') {
      filtered = [...filtered].reverse();
    }

    return filtered;
  }, [messages, searchQuery, sortOrder]);

  const handleSortToggle = useCallback(() => {
    setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'));
  }, []);

  return (
    <>
      <DecorativeBackground />

      <main className="app-wrapper">
        <Hero />

        {error && (
          <div className="error-banner">
            ⚠️ Could not load messages: {error}
          </div>
        )}

        <div className="content-grid">
          {/* ── Left: Form ── */}
          <GratitudeForm onSubmit={handleSubmit} />

          {/* ── Right: Board ── */}
          <div>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              count={displayedMessages.length}
              total={messages.length}
            />
            <GratitudeBoard
              messages={displayedMessages}
              loading={loading}
              sortOrder={sortOrder}
              onSortToggle={handleSortToggle}
            />
          </div>
        </div>
      </main>

      <Toast visible={toast} />
    </>
  );
}
