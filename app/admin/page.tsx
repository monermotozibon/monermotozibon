
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

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
  const [brand, setBrand] = useState("Z MELODY");
  const [videos, setVideos] = useState<Video[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkUser() {
      const { data } = await supabase.auth.getSession();

      if (!active) return;

      const sessionUser = data.session?.user ?? null;

      if (sessionUser?.email === ADMIN_EMAIL) {
        setUser(sessionUser);
      } else {
        setUser(null);
      }

      setChecking(false);
    }

    void checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user ?? null;

      if (sessionUser?.email === ADMIN_EMAIL) {
        setUser(sessionUser);
      } else {
        setUser(null);
        setVideos([]);
      }

      setChecking(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) {
      void loadVideos();
    }
  }, [user]);

  async function loadVideos() {
    setMessage("");

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

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setMessage("Sirf authorized admin email se login kar sakte hain.");
      setBusy(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setMessage("Login failed: " + error.message);
    } else if (data.user?.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      setMessage("Is account ko admin access nahi hai.");
    } else {
      setUser(data.user);
      setPassword("");
      setMessage("Login successful!");
    }

    setBusy(false);
  }

  function isAllowedVideoUrl(value: string) {
    try {
      const parsed = new URL(value);
      const host = parsed.hostname.toLowerCase();

      if (parsed.protocol !== "https:") return false;

      return (
        host === "youtube.com" ||
        host.endsWith(".youtube.com") ||
        host === "youtu.be" ||
        host === "facebook.com" ||
        host.endsWith(".facebook.com") ||
        host === "fb.watch" ||
        host.endsWith(".fb.watch")
      );
    } catch {
      return false;
    }
  }

  async function handleAddVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (user?.email !== ADMIN_EMAIL) {
      setMessage("Admin login required.");
      return;
    }

    if (!title.trim() || !url.trim()) {
      setMessage("Title aur video link dono bharo.");
      return;
    }

    if (!isAllowedVideoUrl(url.trim())) {
      setMessage("Valid HTTPS YouTube ya Facebook video link dalo.");
      return;
    }

    setBusy(true);

    const { error } = await supabase.from("videos").insert({
      title: title.trim(),
      url: url.trim(),
      brand,
    });

    if (error) {
      setMessage("Video save nahi hua: " + error.message);
    } else {
      setMessage("Video successfully save ho gaya!");
      setTitle("");
      setUrl("");
      await loadVideos();
    }

    setBusy(false);
  }

  async function handleDelete(id: number) {
    if (user?.email !== ADMIN_EMAIL) return;

    const confirmed = window.confirm(
      "Kya aap is video ko delete karna chahte hain?"
    );

    if (!confirmed) return;

    setBusy(true);
    setMessage("");

    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage("Delete nahi hua: " + error.message);
    } else {
      setMessage("Video delete ho gaya.");
      await loadVideos();
    }

    setBusy(false);
  }

  async function handleLogout() {
    setBusy(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage("Logout failed: " + error.message);
    } else {
      setUser(null);
      setVideos([]);
      setMessage("Logout successful.");
    }

    setBusy(false);
  }

  if (checking) {
    return (
      <main style={styles.page}>
        <p>Checking admin login...</p>
      </main>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <h1 style={styles.heading}>Admin Login</h1>
          <p style={styles.muted}>
            Moner Moto Zibon × Z MELODY
          </p>

          <form onSubmit={handleLogin} style={styles.form}>
            <label style={styles.label}>Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
              style={styles.input}
              placeholder="Admin email"
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              style={styles.input}
              placeholder="Your password"
            />

            <button disabled={busy} type="submit" style={styles.button}>
              {busy ? "Please wait..." : "Login"}
            </button>
          </form>

          {message && <p style={styles.message}>{message}</p>}

          <a href="/" style={styles.link}>← Back to website</a>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.heading}>Admin Dashboard</h1>
            <p style={styles.muted}>
              Moner Moto Zibon × Z MELODY
            </p>
            <p style={styles.muted}>{user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            disabled={busy}
            style={styles.logout}
          >
            Logout
          </button>
        </header>

        <section style={styles.card}>
          <h2 style={styles.subheading}>Add New Video</h2>
          <p style={styles.muted}>
            YouTube ya Facebook ka video link paste karo.
          </p>

          <form onSubmit={handleAddVideo} style={styles.form}>
            <label style={styles.label}>Video Title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              style={styles.input}
              placeholder="Song ya video ka naam"
            />

            <label style={styles.label}>Brand / Channel</label>
            <select
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              style={styles.input}
            >
              <option value="Z MELODY">Z MELODY</option>
              <option value="Moner Moto Zibon">Moner Moto Zibon</option>
            </select>

            <label style={styles.label}>YouTube / Facebook URL</label>
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
              style={styles.input}
              placeholder="https://..."
            />

            <button disabled={busy} type="submit" style={styles.button}>
              {busy ? "Saving..." : "Save Video"}
            </button>
          </form>

          {message && <p style={styles.message}>{message}</p>}
        </section>

        <section style={styles.card}>
          <div style={styles.videoHeader}>
            <h2 style={styles.subheading}>Saved Videos</h2>
            <button
              onClick={() => void loadVideos()}
              disabled={busy}
              style={styles.refresh}
            >
              Refresh
            </button>
          </div>

          {videos.length === 0 ? (
            <p style={styles.muted}>Abhi koi video save nahi hai.</p>
          ) : (
            <div style={styles.videoList}>
              {videos.map((video) => (
                <article key={video.id} style={styles.videoItem}>
                  <div style={{ minWidth: 0 }}>
                    <strong>{video.title}</strong>
                    <p style={styles.muted}>{video.brand}</p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.link}
                    >
                      Open video
                    </a>
                  </div>

                  <button
                    onClick={() => void handleDelete(video.id)}
                    disabled={busy}
                    style={styles.delete}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <a href="/" style={styles.link}>← View website</a>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "32px 16px",
    background: "#0b1020",
    color: "#f8fafc",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "850px",
    margin: "0 auto",
  },
  card: {
    background: "#151d32",
    border: "1px solid #293650",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "22px",
  },
  heading: {
    fontSize: "28px",
    margin: "0 0 8px",
  },
  subheading: {
    fontSize: "21px",
    margin: "0 0 12px",
  },
  muted: {
    color: "#aab7cc",
    overflowWrap: "anywhere",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "18px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 700,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    borderRadius: "8px",
    border: "1px solid #43516d",
    background: "#0b1020",
    color: "#ffffff",
    fontSize: "16px",
  },
  button: {
    padding: "13px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#7c3aed",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  },
  logout: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #53627e",
    background: "#202b42",
    color: "#ffffff",
    cursor: "pointer",
  },
  refresh: {
    padding: "9px 13px",
    borderRadius: "8px",
    border: "1px solid #53627e",
    background: "#202b42",
    color: "#ffffff",
    cursor: "pointer",
  },
  message: {
    marginTop: "16px",
    overflowWrap: "anywhere",
    color: "#c4b5fd",
  },
  link: {
    color: "#a5b4fc",
    display: "inline-block",
    marginTop: "12px",
    overflowWrap: "anywhere",
  },
  videoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  videoList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  videoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    borderTop: "1px solid #293650",
    paddingTop: "16px",
  },
  delete: {
    padding: "9px 13px",
    borderRadius: "8px",
    border: "none",
    background: "#b91c1c",
    color: "#ffffff",
    cursor: "pointer",
  },
};
