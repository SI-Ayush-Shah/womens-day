export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-line" style={{ width: '40%' }} />
      <div className="skeleton-line" style={{ width: '60%', marginTop: '0.75rem', height: '1.1rem' }} />
      <div className="skeleton-line" style={{ width: '100%', marginTop: '0.75rem' }} />
      <div className="skeleton-line" style={{ width: '85%' }} />
      <div className="skeleton-line" style={{ width: '90%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <div className="skeleton-line" style={{ width: '30%', margin: 0 }} />
        <div className="skeleton-line" style={{ width: '20%', margin: 0 }} />
      </div>
    </div>
  );
}
