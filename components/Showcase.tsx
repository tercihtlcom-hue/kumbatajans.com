"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/lib/i18n";
import { useDeferredSetup } from "@/lib/useDeferredSetup";

gsap.registerPlugin(ScrollTrigger);

// Yatay galeri görselleri — kendi işlerinin görselleriyle değiştir
const panelImages = [
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=85",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1400&q=85",
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1400&q=85",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=85",
  "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1400&q=85",
];

export default function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const { d } = useI18n();

  useDeferredSetup(
    ref,
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
      const track = el.querySelector<HTMLElement>(".hs-track");
      if (!track) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      // Bölüm ekrana sabitlenir, içerik yatay kayar
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Panel içi görseller ters yönde hafif kayar (iç parallax)
      gsap.utils.toArray<HTMLElement>(".hs-panel img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".hs-panel"),
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      // Dev arkaplan yazısı daha yavaş kayar
      gsap.to(".hs-bigtext", {
        x: () => -getDistance() * 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      });

      // Geç kurulan pin alttaki tetik konumlarını değiştirir — yeniden hesapla
      ScrollTrigger.refresh();

      return () => mm.revert();
    },
    []
  );

  return (
    <>
      <style>{`
        .showcase { position: relative; overflow: hidden; }
        .hs-viewport { position: relative; min-height: 100vh; display: flex; align-items: center; }
        .hs-bigtext {
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
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(14, 155, 144, 0.35);
          paint-order: stroke fill;
          user-select: none; pointer-events: none;
        }
        .hs-track {
          display: flex; align-items: center; gap: 4vw;
          padding: 0 6vw; position: relative; z-index: 1;
          will-change: transform; width: max-content;
        }
        .hs-intro { width: 34vw; min-width: 420px; flex-shrink: 0; }
        .hs-intro h2 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.6rem, 4.8vw, 5rem); text-transform: uppercase;
          line-height: 1.02;
        }
        .hs-intro h2 .grad-text { display: inline; }
        .hs-intro p {
          margin-top: 2rem; opacity: 0.85; max-width: 440px;
          line-height: 1.75; font-weight: 400; font-size: 1.3rem;
        }
        .hs-intro .hint {
          margin-top: 2.6rem; display: inline-flex; align-items: center; gap: 0.8rem;
          font-size: 0.95rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hs-panel {
          position: relative; flex-shrink: 0;
          width: clamp(340px, 34vw, 560px); aspect-ratio: 4/5;
          border-radius: 10px; overflow: hidden;
          box-shadow: 0 30px 70px rgba(14, 155, 144, 0.22);
          background: var(--cream-alt);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease;
        }
        .hs-panel::after {
          content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 48%, transparent 75%);
          opacity: 0; transition: opacity 0.35s ease;
        }
        .hs-panel:hover::after { opacity: 1; }
        .hs-panel:nth-child(odd) { transform: translateY(4vh) rotate(1.2deg); }
        .hs-panel:nth-child(even) { transform: translateY(-4vh) rotate(-1.2deg); }
        .hs-panel:nth-child(odd):hover {
          transform: translateY(4vh) rotate(1.2deg) scale(1.08);
          box-shadow: 0 50px 110px rgba(14, 155, 144, 0.5), 0 0 80px rgba(141, 255, 198, 0.55), 0 0 120px rgba(79, 201, 255, 0.25);
        }
        .hs-panel:nth-child(even):hover {
          transform: translateY(-4vh) rotate(-1.2deg) scale(1.08);
          box-shadow: 0 50px 110px rgba(14, 155, 144, 0.5), 0 0 80px rgba(141, 255, 198, 0.55), 0 0 120px rgba(79, 201, 255, 0.25);
        }
        .hs-panel img {
          object-fit: cover; width: 116% !important; left: -8% !important;
          max-width: none;
          transition: filter 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hs-panel:hover img { filter: brightness(1.28) saturate(1.25) contrast(1.05); transform: scale(1.1); }
        .hs-cap {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
          padding: 2.4rem 2rem 2.2rem;
          background: linear-gradient(
            to top,
            rgba(6, 12, 18, 0.96) 0%,
            rgba(6, 12, 18, 0.78) 45%,
            transparent 100%
          );
        }
        .hs-cap .lbl {
          font-size: 0.95rem; letter-spacing: 0.22em; text-transform: uppercase;
          font-weight: 700; display: block; margin-bottom: 0.55rem;
          background: var(--grad-warm);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hs-cap h3 {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(1.75rem, 2.2vw, 2.35rem);
          text-transform: uppercase; line-height: 1.08;
          background: linear-gradient(100deg, #8dffc6 0%, #4fc9ff 45%, #c084fc 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.45));
        }
        .hs-num {
          position: absolute; top: 1.4rem; right: 1.6rem; z-index: 2;
          font-family: var(--font-display); font-weight: 700; font-size: 1.6rem;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
        }
        @media (max-width: 899px) {
          .hs-viewport { min-height: auto; padding: 16vh 0 10vh; }
          .hs-bigtext { display: none; }
          .hs-track {
            flex-direction: column; width: 100%; padding: 0 4vw; gap: 3rem;
            align-items: stretch;
          }
          .hs-intro { width: 100%; min-width: 0; }
          .hs-panel { width: 100%; aspect-ratio: 4/5; }
          .hs-panel:nth-child(odd), .hs-panel:nth-child(even) { transform: none; }
          .hs-panel:hover { transform: scale(1.06); }
        }
      `}</style>
      <section className="showcase sec-light" ref={ref}>
        <div className="hs-viewport">
          <div className="hs-bigtext" aria-hidden>
            {d.showcase.big}
          </div>
          <div className="hs-track">
            <div className="hs-intro">
              <div className="section-label">{d.showcase.label}</div>
              <h2>
                {d.showcase.t1}
                <br />
                <span className="grad-text">{d.showcase.t2}</span>
                <br />
                {d.showcase.t3}
              </h2>
              <p>{d.showcase.desc}</p>
              <span className="hint">{d.showcase.hint}</span>
            </div>
            {d.showcase.panels.map((p, i) => (
              <div className="hs-panel" key={i}>
                <Image
                  src={panelImages[i]}
                  alt={p.title}
                  fill
                  sizes="(max-width: 899px) 92vw, 34vw"
                />
                <span className="hs-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="hs-cap">
                  <span className="lbl">{p.label}</span>
                  <h3>{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
