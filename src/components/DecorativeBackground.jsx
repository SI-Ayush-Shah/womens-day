const FlowerSvg = () => (
  <svg width="200" height="200" viewBox="0 0 100 100" fill="#6d28d9">
    <path d="M50 50 Q70 10 90 50 T50 90 T10 50 T50 10" />
  </svg>
);

export default function DecorativeBackground() {
  return (
    <>
      <div className="flower-bg flower-bg--top">
        <FlowerSvg />
      </div>
      <div className="flower-bg flower-bg--bottom">
        <FlowerSvg />
      </div>
    </>
  );
}
