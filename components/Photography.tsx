"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const catImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=80",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=90",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1000&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
  "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=1000&q=80",
];

export default function Photography() {
  const ref = useRef<HTMLElement>(null);
  const { d, lang } = useI18n();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mm: gsap.MatchMedia | undefined;

    // TBT: animasyon kurulumu sayfa açılışında değil, bölüm yaklaşınca yapılır.
    // İçerik her zaman DOM'da; sadece GSAP kurulumu ertelenir.
    const setup = () => {
      mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
      const track = el.querySelector<HTMLElement>(".ph-track");
      if (!track) return;

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: el.querySelector(".ph-viewport"),
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".ph-card img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".ph-card"),
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

        gsap.to(".ph-bigtext", {
          x: () => -getDistance() * 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: el.querySelector(".ph-viewport"),
            start: "top top",
            end: () => "+=" + getDistance(),
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Geç kurulan pin, alttaki bölümlerin tetik konumlarını kaydırır — yeniden hesapla
      ScrollTrigger.refresh();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setup();
        }
      },
      { rootMargin: "1200px 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      mm?.revert();
    };
  }, [lang]);

  return (
    <>
      <style>{`
        .photography { position: relative; overflow: hidden; }
        .ph-viewport {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
        }
        .ph-bigtext {
          position: absolute; top: 6vh; left: 4vw; z-index: 0;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(6rem, 22vw, 22rem); text-transform: uppercase;
          white-space: nowrap; line-height: 1; letter-spacing: -0.02em;
          background: linear-gradient(
            100deg,
            rgba(6, 214, 160, 0.38) 0%,
            rgba(14, 155, 144, 0.32) 28%,
            rgba(255, 77, 0, 0.28) 52%,
            rgba(255, 0, 128, 0.26) 72%,
            rgba(139, 92, 246, 0.34) 100%
          );
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(14, 155, 144, 0.35);
          paint-order: stroke fill;
          user-select: none; pointer-events: none;
        }
        .ph-track {
          display: flex; align-items: center; gap: 4vw;
          padding: 0 6vw; position: relative; z-index: 1;
          will-change: transform; width: max-content;
        }
        .ph-intro {
          width: 34vw; min-width: 420px; flex-shrink: 0;
        }
        .ph-intro h2 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.6rem, 4.8vw, 5rem); text-transform: uppercase;
          line-height: 1.02;
        }
        .ph-intro p {
          margin-top: 2rem; opacity: 0.85; max-width: 440px;
          line-height: 1.75; font-weight: 400; font-size: 1.3rem;
        }
        .ph-intro .hint {
          margin-top: 2.6rem; display: inline-flex; align-items: center; gap: 0.8rem;
          font-size: 0.95rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ph-card {
          position: relative; flex-shrink: 0;
          width: clamp(340px, 34vw, 560px); aspect-ratio: 4/5;
          border-radius: 10px; overflow: hidden;
          box-shadow: 0 30px 70px rgba(14, 155, 144, 0.22);
          background: var(--cream-alt);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease;
        }
        .ph-card::after {
          content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 48%, transparent 75%);
          opacity: 0; transition: opacity 0.35s ease;
        }
        .ph-card:hover::after { opacity: 1; }
        .ph-card:nth-child(odd) { transform: translateY(4vh) rotate(1.2deg); }
        .ph-card:nth-child(even) { transform: translateY(-4vh) rotate(-1.2deg); }
        .ph-card:nth-child(odd):hover {
          transform: translateY(4vh) rotate(1.2deg) scale(1.08);
          box-shadow: 0 50px 110px rgba(14, 155, 144, 0.5), 0 0 80px rgba(141, 255, 198, 0.55), 0 0 120px rgba(79, 201, 255, 0.25);
        }
        .ph-card:nth-child(even):hover {
          transform: translateY(-4vh) rotate(-1.2deg) scale(1.08);
          box-shadow: 0 50px 110px rgba(14, 155, 144, 0.5), 0 0 80px rgba(141, 255, 198, 0.55), 0 0 120px rgba(79, 201, 255, 0.25);
        }
        .ph-card img {
          object-fit: cover; width: 116% !important; left: -8% !important;
          max-width: none;
          transition: filter 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ph-card:hover img { filter: brightness(1.28) saturate(1.25) contrast(1.05); transform: scale(1.1); }
        .ph-num {
          position: absolute; top: 1.4rem; right: 1.6rem; z-index: 2;
          font-family: var(--font-display); font-weight: 700; font-size: 1.6rem;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
        }
        .ph-cap {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
          padding: 2.4rem 2rem 2.2rem;
          background: linear-gradient(
            to top,
            rgba(6, 12, 18, 0.96) 0%,
            rgba(6, 12, 18, 0.78) 45%,
            transparent 100%
          );
        }
        .ph-cap h3 {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(1.75rem, 2.2vw, 2.35rem);
          text-transform: uppercase; line-height: 1.08;
          margin-bottom: 0.65rem;
          background: linear-gradient(100deg, #8dffc6 0%, #4fc9ff 45%, #c084fc 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.45));
        }
        .ph-cap p {
          font-size: clamp(1.05rem, 1.15vw, 1.2rem);
          line-height: 1.65; font-weight: 500;
          color: #f4fbf9;
          text-shadow: 0 1px 8px rgba(0,0,0,0.55);
          margin-bottom: 0.9rem;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ph-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .ph-tags li {
          list-style: none; font-size: 0.82rem; letter-spacing: 0.08em;
          color: #fff; font-weight: 700;
          border: 1.5px solid rgba(141, 255, 198, 0.55);
          background: rgba(6, 214, 160, 0.2);
          border-radius: 100px; padding: 0.4rem 0.9rem;
          text-transform: uppercase;
        }
        .ph-note-wrap {
          padding: 10vh 4vw 14vh;
          max-width: 1560px; margin: 0 auto;
        }
        .ph-note {
          padding: 2.4rem 2.8rem; border-radius: 14px;
          background: linear-gradient(120deg, rgba(14,155,144,0.1), rgba(139,92,246,0.08));
          border: 1px solid var(--border-light);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 1.5rem;
        }
        .ph-note p { font-size: 1.25rem; line-height: 1.7; max-width: 720px; font-weight: 400; }
        .ph-note a {
          display: inline-flex; padding: 1.1rem 2.8rem; border-radius: 100px;
          background: var(--grad-vivid); color: #fff; text-decoration: none;
          font-weight: 700; font-size: 0.95rem; text-transform: uppercase;
          letter-spacing: 0.16em; transition: transform 0.3s;
          white-space: nowrap;
        }
        .ph-note a:hover { transform: translateY(-3px); }
        @media (max-width: 899px) {
          .ph-viewport { min-height: auto; padding: 16vh 0 10vh; }
          .ph-bigtext { display: none; }
          .ph-track {
            flex-direction: column; width: 100%; padding: 0 4vw;
            gap: 3rem; align-items: stretch;
          }
          .ph-intro { width: 100%; min-width: 0; }
          .ph-card { width: 100%; aspect-ratio: 4/5; }
          .ph-card:nth-child(odd), .ph-card:nth-child(even) { transform: none; }
          .ph-card:hover { transform: scale(1.06); }
          .ph-card img { width: 100% !important; left: 0 !important; }
          .ph-note-wrap { padding: 4vh 4vw 12vh; }
          .ph-note { padding: 1.8rem 1.5rem; }
          .ph-note a { width: 100%; text-align: center; justify-content: center; }
        }
      `}</style>
      <section className="photography sec-light" id="fotografcilik" ref={ref}>
        <div className="ph-viewport">
          <div className="ph-bigtext" aria-hidden>
            {d.photo.t1} — {d.photo.t2} — {d.photo.t1}
          </div>
          <div className="ph-track">
            <div className="ph-intro">
              <div className="section-label">{d.photo.label}</div>
              <h2>
                {d.photo.t1}
                <br />
                {d.photo.t2}
              </h2>
              <p>{d.photo.desc}</p>
              <span className="hint">Kaydırmaya devam et →</span>
            </div>
            {d.photo.cats.map((c, i) => (
              <div className="ph-card" key={i} data-cursor>
                <Image
                  src={catImages[i]}
                  alt={c.name}
                  fill
                  sizes="(max-width: 899px) 92vw, 34vw"
                />
                <span className="ph-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="ph-cap">
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <ul className="ph-tags">
                    {c.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ph-note-wrap">
          <div className="ph-note">
            <p>{d.photo.note}</p>
            <a href="#contact">{d.photo.noteCta}</a>
          </div>
        </div>
      </section>
    </>
  );
}
