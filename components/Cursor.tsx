"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const dot = dotRef.current;
    if (!dot) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor]")) {
        dot.classList.add("is-hover");
      } else {
        dot.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed; top: 0; left: 0; width: 12px; height: 12px;
          margin: -6px 0 0 -6px; background: var(--accent); border-radius: 50%;
          pointer-events: none; z-index: 9500; mix-blend-mode: normal;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s;
        }
        .cursor-dot.is-hover { transform: scale(3.2); opacity: 0.85; }
        @media (max-width: 768px) { .cursor-dot { display: none; } }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
