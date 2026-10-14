
"use client";

import { useEffect, useState } from "react";
import type { FormEvent, CSSProperties } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

const ADMIN_EMAIL = "zmelody1435@gmail.com";

type Video = {
  id: number;
  title: string;
  url: string;
  brand: string;
};

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "30px 16px",
    background: "#0b1020",
    color: "#f8fafc",
    fontFamily: "Arial, sans-serif",
  },
  container: { maxWidth: "850px", margin: "0 auto" },
  card: {
    background: "#151d32",
    border: "1px solid #293650",
    borderRadius: "14px",
    padding: "22px",
    marginBottom: "20px",
  },
  heading: { fontSize: "28px", margin: "0 0 8px" },
  subheading: { fontSize: "21px", margin: "0 0 12px" },
  muted: { color: "#aab7cc", overflowWrap: "anywhere" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  label: { fontSize: "14px", fontWeight: 700 },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #43516d",
    background: "#0b1020",
    color: "#ffffff",
    fontSize: "16px",
  },
  button: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#7c3aed",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondary: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #53627e",
    background: "#202b42",
    color: "#ffffff",
    cursor: "pointer",
  },
  link: { color: "#a5b4fc", overflowWrap: "anywhere" },
  message: { color: "#c4b5fd", overflowWrap: "anywhere" },
  video: {
    borderTop: "1px solid #293650",
    padding: "14px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
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

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      if (error) {
        setMessage(error.message);
      }

      const currentUser = data.session?.user ?? null;
      setUser(currentUser?.email === ADMIN_EMAIL ? currentUser : null);
      setChecking(false);
    }

    void checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser?.email === ADMIN_EMAIL ? currentUser : null);
        setChecking(false);
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) {
      void loadVideos();
    }
  }, [user]);

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

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setMessage("Authorized admin email use karo.");
      setBusy(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setMessage("Login error: " + error.message);
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

  function validVideoUrl(value: string) {
    try {
      const parsed = new URL(value);
      const host = parsed.hostname.toLowerCase();

      return (
        parsed.protocol === "https:" &&
        (
          host === "youtube.com" ||
          host.endsWith(".youtube.com") ||
          host === "youtu.be" ||
          host === "facebook.com" ||
          host.endsWith(".facebook.com") ||
          host === "fb.watch"
        )
      );
    } catch {
      return false;
    }
  }

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (user?.email !== ADMIN_EMAIL) {
      setMessage("Pehle admin login karo.");
      return;
    }

    if (!title.trim() || !url.trim()) {
      setMessage("Title aur video link dono bharo.");
      return;
    }

    if (!validVideoUrl(url.trim())) {
      setMessage("Valid HTTPS YouTube ya Facebook link dalo.");
      return;
    }

    setBusy(true);

    const { error } = await supabase.from("videos").insert({
      title: title.trim(),
      url: url.trim(),
      brand,
    });

    if (error) {
      setMessage("Save error: " + error.message);
    } else {
      setMessage("Video save ho gaya!");
      setTitle("");
      setUrl("");
      await loadVideos();
    }

    setBusy(false);
  }

  async function handleDelete(id: number) {
    if (user?.email !== ADMIN_EMAIL) return;
    if (!window.confirm("Kya aap is video ko delete karna chahte hain?")) {
      return;
    }

    setBusy(true);

    const { error } = await supabase.from("videos").delete().eq("id", id);

    if (error) {
      setMessage("Delete error: " + error.message);
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
      setMessage("Logout error: " + error.message);
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
        <p>Admin login check ho raha hai...</p>
      </main>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <main style={styles.page}>
        <section style={{ ...styles.card, maxWidth: "420px", margin: "40px auto" }}>
          <h1 style={styles.heading}>Admin Login</h1>
          <p style={styles.muted}>Moner Moto Zibon × Z MELODY</p>

          <form onSubmit={handleLogin} style={styles.form}>
            <label style={styles.label}>Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              style={styles.input}
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={styles.input}
            />

            <button type="submit" disabled={busy} style={styles.button}>
              {busy ? "Please wait..." : "Login"}
            </button>
          </form>

          {message && <p style={styles.message}>{message}</p>}
          <p><a href="/" style={styles.link}>Back to website</a></p>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1 style={styles.heading}>Admin Dashboard</h1>
            <p style={styles.muted}>Moner Moto Zibon × Z MELODY</p>
            <p style={styles.muted}>{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={busy}
            style={styles.secondary}
          >
            Logout
          </button>
        </header>

        <section style={styles.card}>
          <h2 style={styles.subheading}>Add New Video</h2>
          <form onSubmit={handleAdd} style={styles.form}>
            <label style={styles.label}>Video Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
              placeholder="Song ya video ka naam"
            />

            <label style={styles.label}>Brand / Channel</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              style={styles.input}
            >
              <option value="Z MELODY">Z MELODY</option>
              <option value="Moner Moto Zibon">Moner Moto Zibon</option>
            </select>

            <label style={styles.label}>YouTube / Facebook Link</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              style={styles.input}
              placeholder="https://..."
            />

            <button type="submit" disabled={busy} style={styles.button}>
              {busy ? "Saving..." : "Save Video"}
            </button>
          </form>

          {message && <p style={styles.message}>{message}</p>}
        </section>

        <section style={styles.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <h2 style={styles.subheading}>Saved Videos</h2>
            <button
              onClick={() => void loadVideos()}
              disabled={busy}
              style={styles.secondary}
            >
              Refresh
            </button>
          </div>

          {videos.length === 0 ? (
            <p style={styles.muted}>Abhi koi video save nahi hai.</p>
          ) : (
            videos.map((video) => (
              <article key={video.id} style={styles.video}>
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
                  style={{
                    ...styles.secondary,
                    background: "#991b1b",
                  }}
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </section>

        <a href="/" style={styles.link}>View website</a>
      </div>
    </main>
  );
}
