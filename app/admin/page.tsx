```tsx
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

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;

      const currentUser = data.session?.user ?? null;

      if (currentUser?.email === ADMIN_EMAIL) {
        setUser(currentUser);
        loadVideos();
      } else {
        if (currentUser) {
          void supabase.auth.signOut();
        }
        setUser(null);
      }

      setChecking(false);
    });

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
        }
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setMessage("Login nahi hua. Email/password check karein.");
    } else if (data.user?.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      setMessage("Is account ko admin access nahi hai.");
    } else {
      setPassword("");
      setMessage("Login successful!");
    }

    setBusy(false);
  }

  async function addVideo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      setMessage("Video ka title aur link dono bharein.");
      return;
    }

    try {
      const parsed = new URL(url.trim());

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
      ].includes(parsed.hostname.toLowerCase());

      if (parsed.protocol !== "https:" || !validHost) {
        setMessage("Sahi HTTPS YouTube ya Facebook link daalein.");
        return;
      }
    } catch {
      setMessage("Video link sahi nahi hai.");
      return;
    }

    setBusy(true);
    setMessage("");

    const { error } = await supabase.from("videos").insert({
      title: title.trim(),
      url: url.trim(),
      brand,
    });

    if (error) {
      setMessage("Save nahi hua: " + error.message);
    } else {
      setTitle("");
      setUrl("");
      setMessage("Video database mein save ho gaya!");
      await loadVideos();
    }

    setBusy(false);
  }

  async function deleteVideo(id: number) {
    if (!window.confirm("Kya aap is video ko delete karna chahte hain?")) {
      return;
    }

    setBusy(true);

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

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setVideos([]);
    setMessage("");
  }

  const fieldStyle = {
    display: "block",
    width: "100%",
    boxSizing: "border-box" as const,
    padding: 13,
    marginTop: 8,
    marginBottom: 18,
    borderRadius: 8,
    border: "1px solid #57466f",
    background: "#130e22",
    color: "white",
  };

  const buttonStyle = {
    padding: "12px 18px",
    border: 0,
    borderRadius: 8,
    background: "#9b5de5",
    color: "white",
    fontWeight: "bold" as const,
    cursor: "pointer",
    marginTop: 12,
  };

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
        <p style={{ color: "#c4a7ff" }}>
          MONER MOTO ZIBON × Z MELODY
        </p>

        <h1 style={{ fontSize: 32 }}>Admin Panel</h1>

        {checking ? (
          <p>Checking login...</p>
        ) : !user ? (
          <form
            onSubmit={login}
            style={{
              background: "#201735",
              padding: 22,
              borderRadius: 16,
              marginTop: 25,
            }}
          >
            <h2>Admin Login</h2>
            <p>Sirf authorized admin login kar sakta hai.</p>

            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={fieldStyle}
            />

            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={fieldStyle}
            />

            <button
              type="submit"
              disabled={busy}
              style={buttonStyle}
            >
              {busy ? "Please wait..." : "Login"}
            </button>

            {message && <p>{message}</p>}
          </form>
        ) : (
          <>
            <p>Logged in: {user.email}</p>

            <button onClick={logout} style={buttonStyle}>
              Logout
            </button>

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

              <label>Brand select karein</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={fieldStyle}
              >
                <option>Moner Moto Zibon</option>
                <option>Z MELODY</option>
              </select>

              <label>Video title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Video ka naam"
                style={fieldStyle}
              />

              <label>YouTube ya Facebook link</label>
              <input
                required
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                style={fieldStyle}
              />

              <button
                type="submit"
                disabled={busy}
                style={buttonStyle}
              >
                {busy ? "Please wait..." : "+ Add Video"}
              </button>
            </form>

            <section style={{ marginTop: 30 }}>
              <h2>Saved Videos ({videos.length})</h2>

              {videos.length === 0 && (
                <p>Abhi koi video save nahi hai.</p>
              )}

              {videos.map((video) => (
                <div
                  key={video.id}
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

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#c4a7ff" }}
                  >
                    Video kholo
                  </a>

                  <br />

                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => deleteVideo(video.id)}
                    style={{
                      ...buttonStyle,
                      background: "#a83252",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </section>
          </>
        )}

        {message && <p role="status">{message}</p>}
      </div>
    </main>
  );
}
```
