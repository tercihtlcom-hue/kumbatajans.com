"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import { useI18n } from "@/lib/i18n";
import { HERO_VIDEO_FALLBACKS } from "@/lib/hero-videos";

gsap.registerPlugin(ScrollTrigger);

const ROTATE_MS = 2000;

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) =>
        ch === "®" ? (
          <span className="ch accent" key={i}>
            ®
          </span>
        ) : (
          <span className="ch" key={i}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        )
      )}
    </>
  );
}

export default function Hero({ videos }: { videos: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const vidRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // Mobilde videolar CSS ile zaten gizli; hiç render etmeyerek indirilmelerini de engelle
  const [showVideos, setShowVideos] = useState(false);
  const sources =
    videos.length >= 4 ? videos.slice(0, 4) : [...HERO_VIDEO_FALLBACKS];
  const { d, lang } = useI18n();

  useEffect(() => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      setShowVideos(true);
    }
  }, []);

  useEffect(() => {
    if (!showVideos) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % sources.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [showVideos, sources.length]);

  useEffect(() => {
    const v = vidRefs.current[active];
    v?.play().catch(() => {});
  }, [active]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({ delay: 0.85 });
        tl.from(".hero-title .ch", {
          y: "115%",
          rotateX: -70,
          opacity: 0,
          duration: 1.1,
          stagger: 0.028,
          ease: "power4.out",
        })
          .from(".hero-meta", { opacity: 0, y: 24, duration: 1 }, "-=0.8")
          .from(".hero-cta-wrap", { opacity: 0, y: 24, duration: 0.9 }, "-=0.7")
          .from(".hero-scroll-hint", { opacity: 0, duration: 0.8 }, "-=0.5");

        gsap.to(".hero-inner", {
          yPercent: -18,
          scale: 0.94,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-video-stack", {
          scale: 1.12,
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const firstLang = useRef(true);
  useEffect(() => {
    if (firstLang.current) {
      firstLang.current = false;
      return;
    }
    gsap.set(".hero-title .ch", { y: 0, rotateX: 0, opacity: 1 });
  }, [lang]);

  return (
    <>
      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .hero-video-stack {
          position: absolute;
          inset: 0;
          z-index: 0;
          will-change: transform;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(120% 90% at 15% 10%, rgba(141, 255, 198, 0.65), transparent 55%),
            radial-gradient(110% 80% at 85% 25%, rgba(255, 77, 0, 0.35), transparent 55%),
            radial-gradient(130% 100% at 50% 100%, rgba(139, 92, 246, 0.3), transparent 60%),
            radial-gradient(90% 70% at 70% 40%, rgba(6, 214, 160, 0.38), transparent 50%),
            linear-gradient(148deg, #c5f5ea 0%, #ffd4b8 34%, #dcc8ff 68%, #a8ebe0 100%);
          background-size: 160% 160%;
          animation: heroBgShift 12s ease-in-out infinite alternate;
        }
        @keyframes heroBgShift {
          from { background-position: 0% 0%; }
          to { background-position: 100% 100%; }
        }
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.8s ease, transform 2.4s ease-out;
          transform: scale(1.02);
          filter: brightness(1.08) saturate(1.12);
        }
        .hero-video.active {
          opacity: 0.52;
          transform: scale(1.1);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              to right,
              rgba(247, 244, 239, 0.88) 0%,
              rgba(247, 244, 239, 0.62) 32%,
              rgba(247, 244, 239, 0.28) 52%,
              transparent 68%
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.12) 0%,
              transparent 45%,
              rgba(14, 13, 18, 0.08) 100%
            );
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          padding-top: 8vh;
          will-change: transform, opacity;
          isolation: isolate;
        }
        .hero-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(3.2rem, 12.5vw, 13rem);
          line-height: 0.94;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          perspective: 800px;
        }
        .hero-title .hero-line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.06em;
          white-space: nowrap;
        }
        .hero-title .hero-line.gradient { letter-spacing: -0.01em; }
        .hero-title .hero-line--mid { font-size: 0.68em; }
        .hero-title .ch {
          display: inline-block;
          transform-origin: center bottom;
          will-change: transform, opacity;
        }
        .hero-title .gradient .ch,
        .hero-grad-text {
          background: var(--grad-vivid);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.55));
        }
        .hero-title .hero-line--greenblue .ch {
          background: linear-gradient(100deg, #06d6a0 0%, #0e9b90 42%, #2d9cdb 78%, #4fc9ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 10px rgba(79, 201, 255, 0.35));
        }
        .hero-title .accent {
          background: linear-gradient(100deg, #06d6a0, #4fc9ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .hero-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 2rem;
          margin-top: 4rem;
        }
        .hero-meta p {
          max-width: 680px;
          opacity: 1;
          line-height: 1.7;
          font-weight: 700;
          font-size: clamp(1.3rem, 1.8vw, 1.75rem);
        }
        .hero-meta .copyright {
          font-size: 1.05rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.9;
        }
        .hero-cta-wrap { margin-top: 2.6rem; }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1.6rem 3.8rem;
          border-radius: 100px;
          background: var(--grad-vivid);
          color: #fff;
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.35rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          box-shadow: 0 14px 44px rgba(255, 0, 128, 0.35);
          transition: box-shadow 0.4s;
        }
        .hero-cta:hover { box-shadow: 0 20px 60px rgba(255, 0, 128, 0.55); }
        .hero-scroll-hint {
          position: absolute;
          bottom: 2.6rem;
          left: 4vw;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }
        .hero-scroll-hint .line {
          width: 44px;
          height: 1px;
          background: rgba(255, 77, 0, 0.35);
          opacity: 0.55;
          position: relative;
          overflow: hidden;
        }
        .hero-scroll-hint .line::after {
          content: "";
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 100%;
          background: var(--grad-vivid);
          animation: heroSweep 2s infinite;
        }
        @keyframes heroSweep { to { left: 100%; } }
        .hero-dots {
          position: absolute;
          bottom: 2.6rem;
          right: 6.5rem;
          z-index: 3;
          display: flex;
          gap: 0.6rem;
        }
        .hero-dots button {
          width: 28px;
          height: 3px;
          border: none;
          cursor: pointer;
          background: rgba(14, 155, 144, 0.25);
          transition: background 0.4s;
          padding: 0;
          border-radius: 2px;
        }
        .hero-dots button.on { background: var(--accent); }
        @media (max-width: 768px) {
          .hero-video-stack,
          .hero-dots {
            display: none;
          }
          .hero-title { perspective: none; }
          .hero-title .ch { will-change: auto; }
          .hero-inner { will-change: auto; }
        }
        @media (max-width: 640px) {
          .hero-inner { padding-top: 13vh; }
          .hero-scroll-hint { display: none; }
          .hero-dots { right: 1.5rem; bottom: 1.6rem; }
          .hero-meta { margin-top: 2.6rem; }
          .hero-cta { padding: 1.3rem 2.6rem; font-size: 1.1rem; }
        }
      `}</style>
      <section className="hero" ref={sectionRef} id="top">
        <div className="hero-bg" />
        {showVideos && (
        <div className="hero-video-stack">
          {sources.map((src, i) => (
            <video
              key={i}
              ref={(el) => {
                vidRefs.current[i] = el;
              }}
              className={`hero-video ${i === active ? "active" : ""}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              src={src}
              onError={(e) => {
                const el = e.currentTarget;
                const fb = HERO_VIDEO_FALLBACKS[i];
                if (fb && el.src !== fb) el.src = fb;
              }}
            >
              <track kind="captions" src="data:text/vtt,WEBVTT" label="none" />
            </video>
          ))}
        </div>
        )}
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="container">
            <h1 className="hero-title">
              <span className="hero-line hero-line--greenblue">
                <Chars text="Kumbat®" />
              </span>
              <span className="hero-line gradient hero-line--mid">
                <Chars text="Digital-first" />
              </span>
              <span className="hero-line hero-line--greenblue">
                <Chars text={d.hero.line3} />
              </span>
            </h1>
            <div className="hero-meta">
              <p className="hero-grad-text">{d.hero.desc}</p>
              <span className="copyright hero-grad-text">{d.hero.copyright}</span>
            </div>
            <div className="hero-cta-wrap">
              <Magnetic strength={0.3}>
                <a href="#contact" className="hero-cta" data-cursor>
                  {d.hero.cta} <span aria-hidden>→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span className="hero-grad-text">{d.hero.explore}</span>
          <div className="line" />
        </div>
        {showVideos && (
        <div className="hero-dots">
          {sources.map((_, i) => (
            <button
              key={i}
              className={i === active ? "on" : ""}
              onClick={() => setActive(i)}
              aria-label={`Video ${i + 1}`}
            />
          ))}
        </div>
        )}
      </section>
    </>
  );
}
