"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Video = {
  id: number;
  title: string;
  url: string;
  brand: string;
};

export default function VideosSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      const { data, error } = await supabase
        .from("videos")
        .select("id, title, url, brand")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Could not load videos:", error.message);
      } else {
        setVideos((data ?? []) as Video[]);
      }

      setLoading(false);
    }

    loadVideos();
  }, []);

  function getEmbedUrl(url: string) {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, "");

      if (host === "youtu.be") {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
      }

      if (
        host === "youtube.com" ||
        host === "m.youtube.com" ||
        host === "music.youtube.com"
      ) {
        if (parsed.pathname === "/watch") {
          const id = parsed.searchParams.get("v");
          return id ? `https://www.youtube.com/embed/${id}` : null;
        }

        const match = parsed.pathname.match(/^\/(shorts|embed)\/([^/]+)/);
        if (match) return `https://www.youtube.com/embed/${match[2]}`;
      }
    } catch {
      return null;
    }

    return null;
  }

  return (
    <section className="content-section">
      <span className="section-kicker">LATEST VIDEOS</span>
      <h2>Our Videos & <span className="gradient-text">Reels.</span></h2>

      {loading && <p>Loading videos...</p>}

      {!loading && videos.length === 0 && (
        <p>No videos available yet. Please check again later.</p>
      )}

      <div className="video-grid">
        {videos.map((video) => {
          const embedUrl = getEmbedUrl(video.url);

          return (
            <article className="video-card" key={video.id}>
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
                    borderRadius: "12px",
                  }}
                />
              ) : (
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-pink"
                >
                  Watch {video.brand === "Z MELODY" ? "Song" : "Facebook Reel"} ↗
                </a>
              )}

              <h3>{video.title}</h3>
              <p>{video.brand}</p>

              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open original video ↗
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

