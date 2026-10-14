```tsx
import VideosSection from "./VideosSection";

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/" },
  { name: "Instagram", url: "https://www.instagram.com/" },
  { name: "YouTube", url: "https://www.youtube.com/" },
];

export default function Home() {
  return (
    <main>
      <div className="top-social-bar">
        <a href="/" className="top-website-link">
          🌐 Official Website
        </a>

        <div className="social-links">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name} ↗
            </a>
          ))}
        </div>
      </div>

      <header className="site-header">
        <a href="/" className="logo">
          <span className="logo-icon">MZ</span>
          <span>
            <strong>MONER MOTO ZIBON</strong>
            <small>× Z MELODY</small>
          </span>
        </a>

        <nav className="navigation">
          <a href="/">Home</a>
          <a href="/moner-moto-zibon">Moner Moto Zibon</a>
          <a href="/z-melody">Z MELODY</a>
        </nav>
      </header>

      <section className="hero home-hero">
        <div className="hero-content">
          <span className="section-kicker">
            WELCOME TO OUR CREATIVE WORLD
          </span>

          <h1>
            Two Brands.
            <br />
            <span className="gradient-text">One Heart.</span>
          </h1>

          <p className="hero-description">
            Bengali music, emotional quotes, beautiful stories
            and creative videos — explore both worlds in one place.
          </p>

          <a className="button-primary" href="#our-brands">
            Explore Our Brands ↓
          </a>
        </div>

        <div className="hero-art">
          <div className="art-card">
            <div className="art-symbol">♫ ♡</div>
            <div className="art-title">Music &amp; Emotions</div>
            <p>Every song has a story. Every feeling matters.</p>
          </div>
        </div>
      </section>

      <section className="brand-choice-section" id="our-brands">
        <div className="brand-choice-heading">
          <span className="section-kicker">CHOOSE YOUR WORLD</span>

          <h2>
            Explore Our <span className="gradient-text">Brands.</span>
          </h2>

          <p>Choose a brand to explore its dedicated page.</p>
        </div>

        <div className="brand-choice-grid">
          <a
            className="brand-choice-card moner-brand"
            href="/moner-moto-zibon"
          >
            <div className="brand-logo moner-logo">
              <img
                src="/Moner%20Moto%20Zibon%20%20logo.jpeg"
                alt="Moner Moto Zibon Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "12px",
                }}
              />
            </div>

            <span className="brand-label">
              QUOTES · REELS · FEELINGS
            </span>

            <h3>Moner Moto Zibon</h3>

            <p>
              Emotional Bengali quotes, motivational thoughts,
              comedy lines and Facebook Reels.
            </p>

            <span className="brand-open">
              Explore Moner Moto Zibon →
            </span>
          </a>

          <a
            className="brand-choice-card melody-brand"
            href="/z-melody"
          >
            <div className="brand-logo melody-logo">
              <img
                src="/Z%20MELODY%20%20logo.jpeg"
                alt="Z MELODY Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "12px",
                }}
              />
            </div>

            <span className="brand-label">
              SONGS · MUSIC · LO-FI
            </span>

            <h3>Z MELODY</h3>

            <p>
              Bengali love songs, emotional sad songs,
              romantic melodies and relaxing lo-fi music.
            </p>

            <span className="brand-open">
              Explore Z MELODY →
            </span>
          </a>
        </div>
      </section>

      <VideosSection />

      <section className="closing-banner">
        <div className="closing-heart">♡</div>

        <h2>Every song has a story.</h2>

        <p>Every feeling deserves to be heard.</p>

        <a className="button-white" href="#our-brands">
          Explore Both Brands ↗
        </a>
      </section>

      <footer className="site-footer">
        <p className="footer-logo">
          MONER MOTO ZIBON <span>×</span> Z MELODY
        </p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/moner-moto-zibon">Moner Moto Zibon</a>
          <a href="/z-melody">Z MELODY</a>
        </div>

        <p>Made with ♥ for music and emotions.</p>

        <small>
          © {new Date().getFullYear()} All rights reserved.
        </small>
      </footer>
    </main>
  );
}
```
