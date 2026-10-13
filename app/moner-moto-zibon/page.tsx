
export default function MonerMotoZibonPage() {
  return (
    <main>
      <header className="site-header">
        <a href="/" className="logo">
          <span className="logo-icon">♡</span>
          <span>
            <strong>MONER MOTO ZIBON</strong>
            <small>EMOTIONS & STORIES</small>
          </span>
        </a>
        <a className="header-button" href="/">← Home</a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="section-kicker">WORDS FROM THE HEART</span>
          <h1>Moner Moto <span className="gradient-text">Zibon.</span></h1>
          <p className="hero-description">
            Emotional Bengali quotes, motivational thoughts,
            comedy lines and Facebook Reels — feelings expressed
            from the heart.
          </p>
          <a className="button-pink"
            href="https://www.facebook.com/"
            target="_blank" rel="noopener noreferrer">
            Visit Facebook Page ↗
          </a>
        </div>

        <div className="hero-art">
          <div className="art-card">
            <div className="art-symbol">♡</div>
            <div className="art-title">Moner Kotha</div>
            <p>Some feelings are best expressed from the heart.</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <span className="section-kicker">YOUR DAILY DOSE OF FEELINGS</span>
        <h2>Quotes, Reels & <span className="gradient-text">Stories.</span></h2>
        <p className="hero-description">
          Discover emotional videos, Bengali quotes,
          motivational content and comedy Reels.
        </p>
        <a className="button-pink"
          href="https://www.facebook.com/"
          target="_blank" rel="noopener noreferrer">
          Watch Facebook Reels ↗
        </a>
      </section>

      <footer className="site-footer">
        <a href="/">← Back to Main Website</a>
        <p>Moner Moto Zibon — Feelings from the heart.</p>
      </footer>
    </main>
  );
}

