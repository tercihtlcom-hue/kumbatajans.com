"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/lib/i18n";
import { webDesignSites } from "@/lib/webdesign-sites";
import { useDeferredSetup } from "@/lib/useDeferredSetup";

gsap.registerPlugin(ScrollTrigger);

export default function WebDesign() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { d, lang } = useI18n();

  useDeferredSetup(
    ref,
    () => {
      const el = ref.current;
      const track = trackRef.current;
      if (!el || !track) return;

      const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const getDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

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

        gsap.utils.toArray<HTMLElement>(".wd-card img", el).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".wd-card"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        gsap.to(el.querySelector(".wd-bigtext"), {
          x: () => -getDistance() * 0.35,
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
      }, el);

      // Geç kurulan pin alttaki tetik konumlarını değiştirir — yeniden hesapla
      const refresh = () => ScrollTrigger.refresh();
      refresh();
      const t = setTimeout(refresh, 400);

      return () => {
        clearTimeout(t);
        ctx.revert();
      };
    },
    [lang]
  );

  return (
    <>
      <style>{`
        .webdesign { position: relative; overflow: hidden; }
        .wd-viewport {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
        }
        .wd-bigtext {
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
        .wd-track {
          display: flex; align-items: center; gap: 4vw;
          padding: 0 6vw; position: relative; z-index: 1;
          will-change: transform; width: max-content;
        }
        .wd-intro {
          width: 36vw; min-width: 460px; flex-shrink: 0;
        }
        .wd-intro h2 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.6rem, 4.8vw, 5rem); text-transform: uppercase;
          line-height: 1.02;
        }
        .wd-intro p {
          margin-top: 2rem; opacity: 0.85; max-width: 440px;
          line-height: 1.75; font-weight: 400; font-size: 1.3rem;
        }
        .wd-intro .hint {
          margin-top: 2.6rem; display: inline-flex; align-items: center; gap: 0.8rem;
          font-size: 0.95rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .wd-card {
          position: relative; flex-shrink: 0;
          width: clamp(400px, 40vw, 680px); aspect-ratio: 4/5;
          border-radius: 10px; overflow: hidden;
          box-shadow: 0 30px 70px rgba(14, 155, 144, 0.22);
          background: var(--cream-alt);
          text-decoration: none; color: #fff;
          display: block;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease;
        }
        .wd-card::after {
          content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 48%, transparent 75%);
          opacity: 0; transition: opacity 0.35s ease;
        }
        .wd-card:hover::after { opacity: 1; }
        .wd-card:nth-child(odd) { transform: translateY(4vh) rotate(1.2deg); }
        .wd-card:nth-child(even) { transform: translateY(-4vh) rotate(-1.2deg); }
        .wd-card:nth-child(odd):hover {
          transform: translateY(4vh) rotate(1.2deg) scale(1.08);
          box-shadow: 0 50px 110px rgba(14, 155, 144, 0.5), 0 0 80px rgba(141, 255, 198, 0.55), 0 0 120px rgba(79, 201, 255, 0.25);
        }
        .wd-card:nth-child(even):hover {
          transform: translateY(-4vh) rotate(-1.2deg) scale(1.08);
          box-shadow: 0 50px 110px rgba(14, 155, 144, 0.5), 0 0 80px rgba(141, 255, 198, 0.55), 0 0 120px rgba(79, 201, 255, 0.25);
        }
        .wd-card img {
          object-fit: cover; width: 116% !important; left: -8% !important;
          max-width: none;
          transition: filter 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .wd-card:hover img { filter: brightness(1.28) saturate(1.25) contrast(1.05); transform: scale(1.1); }
        .wd-num {
          position: absolute; top: 1.4rem; right: 1.6rem; z-index: 2;
          font-family: var(--font-display); font-weight: 700; font-size: 1.6rem;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
        }
        .wd-info {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
          padding: 2.4rem 2rem 2.2rem;
          background: linear-gradient(
            to top,
            rgba(6, 12, 18, 0.96) 0%,
            rgba(6, 12, 18, 0.78) 45%,
            transparent 100%
          );
        }
        .wd-info h3 {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(1.75rem, 2.2vw, 2.35rem);
          text-transform: uppercase; line-height: 1.08;
          margin-bottom: 0.65rem;
          background: linear-gradient(100deg, #8dffc6 0%, #4fc9ff 45%, #c084fc 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.45));
        }
        .wd-info p {
          font-size: clamp(1.05rem, 1.15vw, 1.2rem);
          line-height: 1.65; font-weight: 500;
          color: #f4fbf9;
          text-shadow: 0 1px 8px rgba(0,0,0,0.55);
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .wd-demo {
          display: inline-flex; align-items: center; gap: 0.5rem;
          margin-top: 1.2rem; padding: 0.75rem 1.4rem;
          font-size: 1rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          border-radius: 100px;
          background: var(--grad-vivid);
          color: #fff;
          box-shadow: 0 8px 28px rgba(255, 0, 128, 0.4);
        }
        @media (max-width: 899px) {
          .wd-viewport { min-height: auto; padding: 16vh 0 10vh; }
          .wd-bigtext { display: none; }
          .wd-track {
            flex-direction: column; width: 100%; padding: 0 4vw;
            gap: 3rem; align-items: stretch;
          }
          .wd-intro { width: 100%; min-width: 0; }
          .wd-card { width: 100%; aspect-ratio: 4/5; }
          .wd-card:nth-child(odd), .wd-card:nth-child(even) { transform: none; }
          .wd-card:hover { transform: scale(1.06); }
          .wd-card img { width: 100% !important; left: 0 !important; }
        }
      `}</style>
      <section className="webdesign sec-light" id="webtasarim" ref={ref}>
        <div className="wd-viewport">
          <div className="wd-bigtext" aria-hidden>
            {d.webdesign.t1} — {d.webdesign.t2} — {d.webdesign.t1}
          </div>
          <div className="wd-track" ref={trackRef}>
            <div className="wd-intro">
              <div className="section-label">{d.webdesign.label}</div>
              <h2>
                {d.webdesign.t1}
                <br />
                {d.webdesign.t2}
              </h2>
              <p>{d.webdesign.desc}</p>
              <span className="hint">Kaydırmaya devam et →</span>
            </div>
            {d.webdesign.items.map((ind, i) => {
              const site = webDesignSites[i];
              if (!site) return null;
              return (
              <Link
                className="wd-card"
                key={site.slug}
                href={`/web-tasarim/${site.slug}`}
                data-cursor
              >
                <Image
                  src={site.hero}
                  alt={ind.name}
                  fill
                  sizes="(max-width: 899px) 92vw, 40vw"
                />
                <span className="wd-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="wd-info">
                  <h3>{ind.name}</h3>
                  <p>{ind.desc}</p>
                  <span className="wd-demo">{d.webdesign.viewStyles}</span>
                </div>
              </Link>
            );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
