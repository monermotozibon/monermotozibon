const videos = [
  {
    title: "Tomay Bujhte Parini",
    category: "Emotional Bengali Song",
    brand: "Z MELODY",
    symbol: "♫",
    style: "video-purple",
    url: "https://www.youtube.com/",
  },
  {
    title: "Bengali Love Songs",
    category: "Love & Lo-fi Music",
    brand: "Z MELODY",
    symbol: "♪",
    style: "video-pink",
    url: "https://www.youtube.com/",
  },
  {
    title: "Moner Kotha",
    category: "Emotional Reels",
    brand: "MONER MOTO ZIBON",
    symbol: "♡",
    style: "video-rose",
    url: "https://www.facebook.com/",
  },
  {
    title: "Motivational Moments",
    category: "Quotes & Inspiration",
    brand: "MONER MOTO ZIBON",
    symbol: "✦",
    style: "video-blue",
    url: "https://www.facebook.com/",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="logo" href="#home">
          <span className="logo-icon">MZ</span>
          <span>
            <strong>MONER MOTO ZIBON</strong>
            <small>× Z MELODY</small>
          </span>
        </a>

        <nav className="navigation">
          <a href="#home">Home</a>
          <a href="#music">Z MELODY</a>
          <a href="#moner">Moner Moto Zibon</a>
          <a href="#videos">Videos</a>
        </nav>

        <a className="header-button" href="#videos">
          Explore Now <span>↗</span>
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            MUSIC · EMOTIONS · CREATIVITY
          </div>

          <h1>
            Feel Every
            <br />
            Emotion<span className="purple-text">.</span>
            <br />
            <span className="gradient-text">Express Every Feeling.</span>
          </h1>

          <p className="hero-description">
            Dil se nikle Bengali gaane, emotional quotes aur aapke favourite
            videos — sab ek hi jagah. Welcome to our creative world!
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#music">
              ♫ Explore Music
            </a>
            <a className="button-secondary" href="#moner">
              Discover Reels <span>→</span>
            </a>
          </div>

          <div className="hero-note">
            <span className="note-heart">♥</span>
            Made with love, for every emotion.
          </div>
        </div>

        <div className="hero-art">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-card">
            <div className="art-top">
              <span className="art-label">OUR CREATIVE WORLD</span>
              <span className="art-star">✦</span>
            </div>
            <div className="art-symbol">♫</div>
            <div className="art-title">Two Brands.</div>
            <div className="art-title art-title-gradient">One Heart.</div>
            <p>Music that touches the soul.</p>
            <div className="art-tags">
              <span>♪ Bengali Music</span>
              <span>♡ Emotions</span>
            </div>
          </div>
          <div className="floating-bubble bubble-heart">♡</div>
          <div className="floating-bubble bubble-music">♫</div>
          <div className="floating-bubble bubble-star">✦</div>
        </div>
      </section>

      <section className="brand-strip">
        <div>
          <span className="strip-icon strip-purple">♫</span>
          <span>
            <strong>Z MELODY</strong>
            <small>Bengali Music & Lo-fi</small>
          </span>
        </div>
        <div>
          <span className="strip-icon strip-pink">♡</span>
          <span>
            <strong>MONER MOTO ZIBON</strong>
            <small>Quotes, Reels & Feelings</small>
          </span>
        </div>
        <div>
          <span className="strip-icon strip-peach">✦</span>
          <span>
            <strong>ONE PLATFORM</strong>
            <small>Two creative identities</small>
          </span>
        </div>
      </section>

      <section className="content-section" id="videos">
        <div className="section-heading">
          <div>
            <span className="section-kicker">HANDPICKED FOR YOU</span>
            <h2>Latest <span className="gradient-text">Videos.</span></h2>
            <p>Listen, watch and feel every moment.</p>
          </div>
          <a className="text-link" href="#music">
            Explore all content <span>↗</span>
          </a>
        </div>

        <div className="video-grid">
          {videos.map((video) => (
            <a
              className="video-card"
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              key={video.title}
            >
              <div className={`video-art ${video.style}`}>
                <span className="video-brand">{video.brand}</span>
                <span className="video-symbol">{video.symbol}</span>
                <span className="play-button">▶</span>
                <span className="video-art-caption">{video.title}</span>
              </div>
              <div className="video-info">
                <span className="video-category">{video.category}</span>
                <h3>{video.title}</h3>
                <span className="watch-link">Watch Video <span>↗</span></span>
              </div>
            </a>
          ))}
        </div>
        <p className="demo-note">
          Note: Abhi cards sample links use karte hain. Baad mein inmein aapke
          actual YouTube aur Facebook video links add karenge.
        </p>
      </section>

      <section className="feature-section" id="music">
        <div className="feature-art music-feature-art">
          <span className="feature-big-symbol">♫</span>
          <span className="feature-small-label">FEEL THE MUSIC</span>
          <span className="feature-deco deco-one">♪</span>
          <span className="feature-deco deco-two">✦</span>
        </div>
        <div className="feature-copy">
          <span className="section-kicker">MUSIC THAT TOUCHES THE HEART</span>
          <h2>Z MELODY <span>🎵</span></h2>
          <p>
            Bengali love songs, emotional sad songs aur relaxing lo-fi music.
            Har dhun mein ek kahani, har gaane mein ek ehsaas.
          </p>
          <a
            className="button-primary"
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit YouTube Channel ↗
          </a>
        </div>
      </section>

      <section className="feature-section feature-reverse" id="moner">
        <div className="feature-art heart-feature-art">
          <span className="feature-big-symbol">♡</span>
          <span className="feature-small-label">WORDS FROM THE HEART</span>
          <span className="feature-deco deco-one">✦</span>
          <span className="feature-deco deco-two">♥</span>
        </div>
        <div className="feature-copy">
          <span className="section-kicker pink-kicker">FEELINGS · THOUGHTS · STORIES</span>
          <h2>Moner Moto <span className="pink-text">Zibon.</span></h2>
          <p>
            Emotional Bengali quotes, motivational thoughts, comedy lines aur
            Facebook Reels — dil ki baatein, apne andaaz mein.
          </p>
          <a
            className="button-pink"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Facebook Page ↗
          </a>
        </div>
      </section>

      <section className="closing-banner">
        <div className="closing-heart">♡</div>
        <h2>Every song has a story.</h2>
        <p>Every feeling deserves to be heard.</p>
        <a className="button-white" href="#videos">Explore Our World ↗</a>
      </section>

      <footer className="site-footer">
        <a className="footer-logo" href="#home">MONER MOTO ZIBON <span>×</span> Z MELODY</a>
        <p>Made with <span className="footer-heart">♥</span> for music and emotions.</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#music">Music</a>
          <a href="#moner">Reels</a>
        </div>
        <small>© {new Date().getFullYear()} Moner Moto Zibon × Z MELODY. All rights reserved.</small>
      </footer>
    </main>
  );
}
