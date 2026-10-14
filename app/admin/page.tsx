
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [brand, setBrand] = useState("Moner Moto Zibon");
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState<
    { title: string; url: string; brand: string }[]
  >([]);

  function addVideo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      setMessage("Title aur video link dono bharo.");
      return;
    }

    if (
      !url.includes("youtube.com") &&
      !url.includes("youtu.be") &&
      !url.includes("facebook.com")
    ) {
      setMessage("YouTube ya Facebook ka sahi link dalo.");
      return;
    }

    setVideos((previous) => [
      ...previous,
      { title: title.trim(), url: url.trim(), brand },
    ]);

    setTitle("");
    setUrl("");
    setMessage("Video list mein add ho gaya!");
  }

  function deleteVideo(index: number) {
    setVideos((previous) => previous.filter((_, i) => i !== index));
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#100b20",
        color: "white",
        padding: "30px 16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 850, margin: "0 auto" }}>
        <p style={{ color: "#c4a7ff" }}>MONER MOTO ZIBON × Z MELODY</p>
        <h1 style={{ fontSize: 32 }}>Admin Panel</h1>
        <p style={{ color: "#c9c3d8" }}>
          Apne YouTube aur Facebook video links manage karein.
        </p>

        <form
          onSubmit={addVideo}
          style={{
            background: "#201735",
            padding: 22,
            borderRadius: 16,
            marginTop: 25,
          }}
        >
          <h2>Add New Video</h2>

          <label>Brand select karo</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={fieldStyle}
          >
            <option>Moner Moto Zibon</option>
            <option>Z MELODY</option>
          </select>

          <label>Video ka title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Video ka naam likho"
            style={fieldStyle}
          />

          <label>YouTube ya Facebook video link</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            style={fieldStyle}
          />

          <button type="submit" style={buttonStyle}>
            + Add Video
          </button>

          {message && <p>{message}</p>}
        </form>

        <section style={{ marginTop: 30 }}>
          <h2>Video List ({videos.length})</h2>

          {videos.length === 0 && (
            <p style={{ color: "#c9c3d8" }}>
              Abhi koi video add nahi hua hai.
            </p>
          )}

          {videos.map((video, index) => (
            <div
              key={`${video.url}-${index}`}
              style={{
                background: "#201735",
                padding: 16,
                borderRadius: 12,
                marginTop: 12,
                overflowWrap: "anywhere",
              }}
            >
              <strong>{video.title}</strong>
              <p style={{ color: "#c4a7ff" }}>{video.brand}</p>
              <a href={video.url} target="_blank" rel="noreferrer">
                Video kholo
              </a>
              <br />
              <button
                type="button"
                onClick={() => deleteVideo(index)}
                style={{ ...buttonStyle, background: "#a83252" }}
              >
                Delete
              </button>
            </div>
          ))}
        </section>

        <p style={{ color: "#aaa0bd", marginTop: 35, fontSize: 13 }}>
          Note: Ye abhi demo panel hai. Refresh karne par videos mit jayenge.
          Permanent saving aur secure admin login agle setup mein jodna hoga.
        </p>
      </div>
    </main>
  );
}

const fieldStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: 13,
  marginTop: 8,
  marginBottom: 18,
  borderRadius: 8,
  border: "1px solid #57466f",
  background: "#130e22",
  color: "white",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 18px",
  border: 0,
  borderRadius: 8,
  background: "#9b5de5",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: 12,
};

