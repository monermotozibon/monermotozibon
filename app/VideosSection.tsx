
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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadVideos() {
      try {
        const { data, error } = await supabase
          .from("videos")
          .select("id, title, url, brand")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Could not load videos:", error.message);
          setErrorMessage("Videos load nahi ho paaye. Please baad mein try karein.");
        } else {
          setVideos((data ?? []) as Video[]);
        }
      } catch (error) {
        console.error("Video loading error:", error);
        setErrorMessage("Connection error. Please refresh karein.");
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  function getEmbedUrl(url: string): string | null {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, "");

      if (host === "youtu.be") {
        const id = parsed.pathname.split("/").filter(Boolean)[0];
        return id
          ? `https://www.youtube.com/embed/${id}`
          : null;
      }

      if (
        host === "youtube.com" ||
        host === "m.youtube.com" ||
        host === "music.youtube.com"
      ) {
        if (parsed.pathname === "/watch") {
          const id = parsed.searchParams.get("v");
          return id
            ? `https://www.youtube.com/embed/${id}`
            : null;
        }

        const match = parsed.pathname.match(/^\/(shorts|embed)\/([^/]+)/);
        if (match) {
          return `https://www.youtube.com/embed/${match[2]}`;
        }
      }
    } catch {
      return null;
    }

    return null;
  }

  return (
    <section
      id="latest-videos"
      className="content-section"
      style={{
        display: "block",
        visibility: "visible",
        opacity: 1,
        position: "relative",
        width: "100%",
        minHeight: "180px",
        padding: "48px 20px",
        background: "#fff7fb",
        color: "#222222",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <span
          className="section-kicker"
          style={{
            display: "block",
            color: "#d63384",
            marginBottom: "10px",
          }}
        >
          LATEST VIDEOS
        </span>

        <h2
          style={{
            display: "block",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800,
            margin: "0 0 24px",
            color: "#222222",
          }}
        >
          Our Videos &{" "}
          <span style={{ color: "#d63384" }}>Reels.</span>
        </h2>

        {loading && (
          <p style={{ color: "#555555" }}>Loading videos...</p>
        )}

        {!loading && errorMessage && (
          <p style={{ color: "#b42318" }}>{errorMessage}</p>
        )}

        {!loading && !errorMessage && videos.length === 0 && (
          <p style={{ color: "#555555" }}>
            No videos available yet. Please add a video from the Admin page.
          </p>
        )}

        <div
          className="video-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "24px",
            width: "100%",
          }}
        >
          {videos.map((video) => {
            const embedUrl = getEmbedUrl(video.url);

            return (
              <article
                className="video-card"
                key={video.id}
                style={{
                  display: "block",
                  minWidth: 0,
                  padding: "16px",
                  background: "#ffffff",
                  color: "#222222",
                  borderRadius: "16px",
                  border: "1px solid #f0d7e5",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
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
                      display: "block",
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
                    style={{
                      display: "inline-block",
                      padding: "12px 18px",
                      margin: "8px 0",
                      background: "#d63384",
                      color: "#ffffff",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    Watch {video.brand === "Z MELODY" ? "Song" : "Facebook Reel"} ↗
                  </a>
                )}

                <h3
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.5,
                    margin: "16px 0 8px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {video.title}
                </h3>

                <p
                  style={{
                    color: "#d63384",
                    fontWeight: 700,
                    margin: "0 0 12px",
                  }}
                >
                  {video.brand}
                </p>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#a61e63",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Open original video ↗
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
