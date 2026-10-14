
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "zmelody1435@gmail.com";

type Video = {
  id: number;
  title: string;
  url: string;
  brand: string;
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [brand, setBrand] = useState("Moner Moto Zibon");
  const [videos, setVideos] = useState<Video[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadVideos() {
    const { data, error } = await supabase
      .from("videos")
      .select("id, title, url, brand")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("Videos load nahi hue: " + error.message);
      return;
    }

    setVideos((data ?? []) as Video[]);
  }

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      if (error) {
        setMessage("Login check nahi ho saka.");
        setChecking(false);
        return;
      }

      const currentUser = data.session?.user ?? null;

      if (currentUser?.email === ADMIN_EMAIL) {
        setUser(currentUser);
        await loadVideos();
      } else {
        if (currentUser) {
          await supabase.auth.signOut();
        }
        setUser(null);
      }

      if (active) setChecking(false);
    }

    void checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) return;

        const currentUser = session?.user ?? null;

        if (currentUser?.email === ADMIN_EMAIL) {
          setUser(currentUser);
          setTimeout(() => {
            if (active) void loadVideos();
          }, 0);
        } else {
          setUser(null);
          setVideos([]);
        }
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage("Login fail hua. Email aur password check karein.");
      } else if (data.user?.email !== ADMIN_EMAIL) {
        await supabase.auth.signOut();
        setMessage("Is account ko admin access nahi hai.");
      } else {
        setPassword("");
        setUser(data.user);
        setMessage("Login successful!");
        await loadVideos();
      }
    } catch {
      setMessage("Connection error. Supabase settings check karein.");
    } finally {
      setBusy(false);
    }
  }

  async function addVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!user || user.email !== ADMIN_EMAIL) {
      setMessage("Pehle admin login karein.");
      return;
    }

    const cleanTitle = title.trim();
    const cleanUrl = url.trim();

    if (!cleanTitle || !cleanUrl) {
      setMessage("Video title aur link dono zaroori hain.");
      return;
    }

    try {
      const parsed = new URL(cleanUrl);
      const host = parsed.hostname.toLowerCase();

      const validHost = [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "youtu.be",
        "www.youtu.be",
        "facebook.com",
        "www.facebook.com",
        "m.facebook.com",
        "fb.watch",
        "www.fb.watch",
      ].includes(host);

      if (parsed.protocol !== "https:" || !validHost) {
        setMessage("Valid HTTPS YouTube ya Facebook link daalein.");
        return;
      }
    } catch {
      setMessage("Video link sahi nahi hai.");
      return;
    }

    setBusy(true);

    try {
      const { error } = await supabase.from("videos").insert({
        title: cleanTitle,
        url: cleanUrl,
        brand,
      });

      if (error) {
        setMessage("Save error: " + error.message);
      } else {
        setTitle("");
        setUrl("");
        setMessage("Video database mein save ho gaya!");
        await loadVideos();
      }
    } catch {
      setMessage("Video save nahi hua. Dobara koshish karein.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteVideo(id: number) {
    if (!user || user.email !== ADMIN_EMAIL) return;

    const confirmed = window.confirm(
      "Kya aap is video ko delete karna chahte hain?"
    );

    if (!confirmed) return;

    setBusy(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("videos")
        .delete()
        .eq("id", id);

      if (error) {
        setMessage("Delete error: " + error.message);
      } else {
        setMessage("Video delete ho gaya.");
        await loadVideos();
      }
    } catch {
      setMessage("Video delete nahi hua.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setVideos([]);
    setPassword("");
    setMessage("Logout ho gaya.");
  }

  const fieldStyle = {
    display: "block",
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "12px",
    marginTop: "8px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #57466f",
    background: "#130e22",
    color: "#ffffff",
  };

  const buttonStyle = {
    padding: "12px 18px",
    border: 0,
    borderRadius: "8px",
    background: "#9b5de5",
    color: "#ffffff",
    fontWeight: "bold" as const,
    cursor: "pointer",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#100b20",
        color: "#ffffff",
        padding: "30px 16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        <p style={{ color: "#c4a7ff" }}>
          MONER MOTO ZIBON × Z MELODY
        </p>

        <h1 style={{ fontSize: "32px" }}>Admin Panel</h1>

        {checking ? (
          <p>Login check ho raha hai...</p>
        ) : !user ? (
          <form
            onSubmit={login}
            style={{
              background: "#201735",
              padding: "22px",
              borderRadius: "16px",
              marginTop: "25px",
            }}
          >
            <h2>Admin Login</h2>
            <p>Authorized admin hi login kar sakta hai.</p>

            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={fieldStyle}
            />

            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={fieldStyle}
            />

            <button type="submit" disabled={busy} style={buttonStyle}>
              {busy ? "Please wait..." : "Login"}
            </button>
          </form>
        ) : (
          <>
            <p>Logged in: {user.email}</p>

            <button
              type="button"
              onClick={logout}
              disabled={busy}
              style={buttonStyle}
            >
              Logout
            </button>

            <form
              onSubmit={addVideo}
              style={{
                background: "#201735",
                padding: "22px",
                borderRadius: "16px",
                marginTop: "25px",
              }}
            >
              <h2>Add New Video</h2>

              <label htmlFor="video-brand">Brand</label>
              <select
                id="video-brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                style={fieldStyle}
              >
                <option value="Moner Moto Zibon">Moner Moto Zibon</option>
                <option value="Z MELODY">Z MELODY</option>
              </select>

              <label htmlFor="video-title">Video title</label>
              <input
                id="video-title"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Video ka naam"
                style={fieldStyle}
              />

              <label htmlFor="video-url">YouTube ya Facebook link</label>
              <input
                id="video-url"
                type="url"
                required
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://..."
                style={fieldStyle}
              />

              <button type="submit" disabled={busy} style={buttonStyle}>
                {busy ? "Please wait..." : "+ Add Video"}
              </button>
            </form>

            <section style={{ marginTop: "30px" }}>
              <h2>Saved Videos ({videos.length})</h2>

              {videos.length === 0 && (
                <p>Abhi koi video save nahi hai.</p>
              )}

              {videos.map((video) => (
                <article
                  key={video.id}
                  style={{
                    background: "#201735",
                    padding: "16px",
                    borderRadius: "12px",
                    marginTop: "12px",
                    overflowWrap: "anywhere",
                  }}
                >
                  <strong>{video.title}</strong>
                  <p style={{ color: "#c4a7ff" }}>{video.brand}</p>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#c4a7ff" }}
                  >
                    Video kholo
                  </a>

                  <div style={{ marginTop: "14px" }}>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void deleteVideo(video.id)}
                      style={{ ...buttonStyle, background: "#a83252" }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}

        {message && (
          <p role="status" style={{ marginTop: "20px" }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
