
export default function ZMelodyPage() {
  return (
    <main>
      <header className="site-header">
        <a href="/" className="logo">
          <span className="logo-icon">♫</span>
          <span>
            <strong>Z MELODY</strong>
            <small>BENGALI MUSIC</small>
          </span>
        </a>
        <a className="header-button" href="/">← Home</a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="section-kicker">
            MUSIC THAT TOUCHES THE HEART
          </span>
          <h1>Z MELODY <span className="gradient-text">♫</span></h1>
          <p className="hero-description">
            Bengali love songs, emotional sad songs, romantic
            melodies and relaxing lo-fi music — every melody
            tells a story.
          </p>
          <a className="button-primary"
            href="https://www.youtube.com/"
            target="_blank" rel="noopener noreferrer">
            Listen on YouTube ↗
          </a>
        </div>

        <div className="hero-art">
          <div className="art-card">
            <div className="art-symbol">♫ ♪</div>
            <div className="art-title">Feel the Music.</div>
            <p>Love, memories and melodies by Z MELODY.</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <span className="section-kicker">SONGS FOR EVERY MOOD</span>
        <h2>Love, Sad & <span className="gradient-text">Lo-fi Music.</span></h2>
        <p className="hero-description">
          Discover Bengali songs from Z MELODY. Add your
          YouTube song links so visitors can open and listen
          to your music.
        </p>
        <a className="button-primary"
          href="https://www.youtube.com/"
          target="_blank" rel="noopener noreferrer">
          Explore Songs ↗
        </a>
      </section>

      <footer className="site-footer">
        <a href="/">← Back to Main Website</a>
        <p>Z MELODY — Music for every emotion.</p>
      </footer>
    </main>
  );
}
