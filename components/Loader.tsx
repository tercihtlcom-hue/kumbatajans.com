"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 650;

    const animate = (now: number) => {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setHidden(true), 120);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        opacity: hidden ? 0 : 1,
        visibility: hidden ? "hidden" : "visible",
        transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), visibility 0.55s",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <div
        className="display"
        style={{ fontSize: "1.6rem", letterSpacing: "0.05em" }}
      >
        KUMBAT<span style={{ color: "var(--accent)" }}>®</span>
      </div>
      <div
        style={{
          width: 180,
          height: 1,
          background: "var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${progress}%`,
            background: "var(--accent)",
          }}
        />
      </div>
      <div
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          color: "var(--text-muted)",
        }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
}
