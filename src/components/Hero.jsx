export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__logo-wrapper">
        <img
          src="/images/si-logo.svg"
          alt="SI Logo"
          className="hero__logo"
        />
      </div>

      <h1 className="serif hero__title">Happy International Women's Day</h1>

      <p className="hero__dedication">Because you make SI better...</p>

      <blockquote className="hero__quote">
        "Your brilliance fuels our progress, your resilience shapes our character,
        and your unique perspective enriches us all. Thank you for being the
        foundation and the future of our success."
      </blockquote>

      <p className="hero__subtitle">
        Happy International Women's Day 2026. Share a message of gratitude and
        celebrate the incredible women who make our organization thrive.
      </p>

      <div className="hero__cricket-wrapper">
        <div className="hero__cricket-img-container">
          <img
            src="/images/cricket-team.png"
            alt="Indian Women's Cricket Team – World Cup Champions"
            className="hero__cricket-img"
          />
        </div>
        <p className="hero__cricket-caption">
          Indian Women's Cricket Team — World Cup Champions
        </p>
      </div>
    </header>
  );
}
