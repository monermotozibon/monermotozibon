
const songs = [
  {
    title: "Tomay Bujhte Parini",
    category: "Emotional Bengali Song",
    brand: "Z MELODY",
    url: "https://www.youtube.com/",
    color: "from-violet-200 to-pink-100",
    symbol: "♫"
  },
  {
    title: "Bengali Love Songs",
    category: "Love & Lo-fi Music",
    brand: "Z MELODY",
    url: "https://www.youtube.com/",
    color: "from-blue-100 to-violet-200",
    symbol: "♪"
  },
  {
    title: "Moner Kotha",
    category: "Emotional Reels",
    brand: "MONER MOTO ZIBON",
    url: "https://www.facebook.com/",
    color: "from-pink-100 to-orange-100",
    symbol: "♡"
  },
  {
    title: "Motivational Moments",
    category: "Quotes & Inspiration",
    brand: "MONER MOTO ZIBON",
    url: "https://www.facebook.com/",
    color: "from-amber-100 to-rose-100",
    symbol: "✦"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-10 border-b border-violet-100 bg-white/95">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="text-lg font-black tracking-tight">
            MMZ <span className="text-violet-600">×</span> Z MELODY
          </a>
          <div className="hidden gap-6 text-sm font-medium sm:flex">
            <a href="#home">Home</a>
            <a href="#music">Z MELODY</a>
            <a href="#moner">Moner Moto Zibon</a>
          </div>
          <a href="#latest" className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white">
            Explore
          </a>
        </nav>
      </header>

      <section id="home" className="bg-gradient-to-br from-violet-50 via-white to-pink-50">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 font-bold uppercase tracking-[0.2em] text-violet-600">
              Music · Emotions · Creativity
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Feel Every Emotion.
              <span className="mt-2 block text-violet-600">
                Express Every Feeling.
              </span>
            </h1>
            <p className="mt-5 max-w-lg leading-7 text-slate-600">
              Dil se nikle Bengali gaane, emotional quotes aur aapke pasandida videos — sab ek hi jagah.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#music" className="rounded-full bg-violet-600 px-6 py-3 font-bold text-white">
                Explore Music →
              </a>
              <a href="#moner" className="rounded-full border border-violet-200 bg-white px-6 py-3 font-bold text-violet-700">
                Discover Reels
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] bg-gradient-to-br from-violet-200 via-pink-100 to-orange-100 p-8 text-center shadow-xl shadow-violet-100">
            <div className="text-8xl text-violet-700">♫ ♪ ♡</div>
            <p className="mt-5 text-2xl font-black">Two Brands. One World.</p>
            <p className="mt-2 text-slate-600">Your music, your emotions, your story.</p>
          </div>
        </div>
      </section>

      <section id="latest" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8">
          <p className="font-bold text-violet-600">FRESH CONTENT</p>
          <h2 className="mt-2 text-3xl font-black">Latest Videos</h2>
          <p className="mt-2 text-slate-600">
            Thumbnail par click karke video platform kholen.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {songs.map((song) => (
            <a
              key={song.title}
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${song.color}`}>
                <span className="text-7xl text-violet-700 transition group-hover:scale-110">
                  {song.symbol}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs font-bold tracking-wider text-violet-600">
                  {song.brand}
                </p>
                <h3 className="mt-2 font-bold">{song.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{song.category}</p>
                <p className="mt-4 text-sm font-bold text-violet-700">
                  Watch Video ↗
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="music" className="bg-violet-50 px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold text-violet-600">MUSIC THAT TOUCHES THE HEART</p>
          <h2 className="mt-2 text-3xl font-black">Z MELODY 🎵</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Bengali love songs, emotional sad songs aur relaxing lo-fi music.
            Apne latest songs yahan feature karein.
          </p>
          <a href="#latest" className="mt-6 inline-block rounded-full bg-violet-600 px-6 py-3 font-bold text-white">
            Explore Songs →
          </a>
        </div>
      </section>

      <section id="moner" className="mx-auto max-w-6xl px-5 py-14">
        <p className="font-bold text-pink-600">WORDS FROM THE HEART</p>
        <h2 className="mt-2 text-3xl font-black">Moner Moto Zibon ❤️</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Emotional Bengali quotes, motivational thoughts, comedy lines aur Facebook Reels.
          Apni pasand ke moments yahan dekhein.
        </p>
        <a href="#latest" className="mt-6 inline-block rounded-full border border-pink-200 px-6 py-3 font-bold text-pink-700">
          Explore Reels →
        </a>
      </section>

      <footer className="bg-slate-950 px-5 py-10 text-center text-white">
        <p className="text-xl font-black">Moner Moto Zibon × Z MELODY</p>
        <p className="mt-3 text-sm text-slate-400">
          Made with ❤️ for music and emotions.
        </p>
        <p className="mt-5 text-xs text-slate-500">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </main>
  );
}

