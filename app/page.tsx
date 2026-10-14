
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Video = {
  id: number;
  title: string;
  url: string;
  brand: string;
  created_at: string;
};

function getEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host.endsWith(".youtube.com")) {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id
          ? `https://www.youtube-nocookie.com/embed/${id}`
          : null;
      }

      const match = parsed.pathname.match(
        /^\/(embed|shorts)\/([A-Za-z0-9_-]+)/
      );

      return match
        ? `https://www.youtube-nocookie.com/embed/${match[2]}`
        : null;
    }
  } catch {
    return null;
  }

  return null;
}

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      const { data, error } = await supabase
        .from("videos")
        .select("id, title, url, brand, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Videos load nahi hue. Kripya baad mein try karein.");
      } else {
        setVideos((data ?? []) as Video[]);
      }

      setLoading(false);
    }

    void fetchVideos();
  }, []);

  const zMelodyVideos = videos.filter(
    (video) => video.brand === "Z MELODY"
  );

  const monerVideos = videos.filter(
    (video) => video.brand === "Moner Moto Zibon"
  );

  function VideoCard({ video }: { video: Video }) {
    const embedUrl = getEmbedUrl(video.url);

    return (
      <article
        style={{
          background: "#17172b",
          border: "1px solid #30304b",
          borderRadius: "14px",
          padding: "14px",
          overflow: "hidden",
        }}
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              border: 0,
              borderRadius: "10px",
            }}
          />
        ) : (
          <div
            style={{
              padding: "25px 10px",
              background: "#252541",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <p>Facebook Video</p>
            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#c4b5fd" }}
            >
              Facebook par video dekhein ↗
            </a>
          </div>
        )}

        <h3 style={{ color: "#ffffff", marginBottom: "8px" }}>
          {video.title}
        </h3>

        <p style={{ color: "#b7b7d0", fontSize: "13px" }}>
          {video.brand}
        </p>

        <a
          href={video.url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            color: "#c4b5fd",
            marginTop: "4px",
          }}
        >
          Open original video ↗
        </a>
      </article>
    );
  }

  function VideoSection({
    title,
    items,
  }: {
    title: string;
    items: Video[];
  }) {
    return (
      <section style={{ marginTop: "42px" }}>
        <h2
          style={{
            fontSize: "26px",
            color: "#ffffff",
            borderBottom: "2px solid #8b5cf6",
            paddingBottom: "12px",
          }}
        >
          {title}
        </h2>

        {items.length === 0 ? (
          <p style={{ color: "#b7b7d0" }}>
            Abhi is section mein koi video nahi hai.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "18px",
              marginTop: "20px",
            }}
          >
            {items.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b18",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          padding: "24px 16px",
          textAlign: "center",
          background: "linear-gradient(135deg, #241044, #111827)",
          borderBottom: "1px solid #30304b",
        }}
      >
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", margin: "8px 0" }}>
          Moner Moto Zibon × Z MELODY
        </h1>

        <p style={{ color: "#d4c8f7", fontSize: "16px" }}>
          Bengali Songs • Emotional Stories • Facebook Reels
        </p>

        <a
          href="/admin"
          style={{
            display: "inline-block",
            marginTop: "12px",
            padding: "10px 18px",
            borderRadius: "8px",
            background: "#7c3aed",
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          Admin Login
        </a>
      </header>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "24px 16px 50px",
        }}
      >
        <section style={{ textAlign: "center", padding: "18px 0" }}>
          <h2 style={{ fontSize: "30px" }}>Welcome to Our Official Website</h2>
          <p style={{ color: "#b7b7d0", lineHeight: 1.8 }}>
            Watch our latest Bengali songs, emotional videos and reels.
            New links added by the admin will appear here.
          </p>
        </section>

        {loading ? (
          <p style={{ textAlign: "center", color: "#c4b5fd" }}>
            Videos load ho rahe hain...
          </p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "#fca5a5" }}>{error}</p>
        ) : videos.length === 0 ? (
          <p style={{ textAlign: "center", color: "#b7b7d0" }}>
            Abhi koi video add nahi hua hai.
          </p>
        ) : (
          <>
            <VideoSection title="🎵 Z MELODY" items={zMelodyVideos} />
            <VideoSection
              title="❤️ Moner Moto Zibon"
              items={monerVideos}
            />
          </>
        )}
      </div>

      <footer
        style={{
          textAlign: "center",
          padding: "24px 16px",
          background: "#111122",
          color: "#b7b7d0",
        }}
      >
        <p>© {new Date().getFullYear()} Moner Moto Zibon × Z MELODY</p>
        <p>Made with ❤️ for our viewers</p>
      </footer>
    </main>
  );
}
