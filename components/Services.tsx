"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/lib/i18n";
import { services as servicesData } from "@/lib/services-data";
import { useDeferredSetup } from "@/lib/useDeferredSetup";

gsap.registerPlugin(ScrollTrigger);

// Sıra sözlükteki services.items ile aynı; id'ler menü çapaları için
const rowIds: (string | undefined)[] = [
  undefined,
  "sosyal-medya",
  "program-satis",
];

// Sıra services.items ile aynı — her satır kendi detay sayfasına gider
const rowSlugs = [
  "web-gelistirme",
  "sosyal-medya",
  "program-satis",
  "yapay-zeka",
  "fotografcilik",
  "produksiyon",
  "test-otomasyonu",
  "dijital-strateji",
  "marka-kimligi",
  "isletmeye-ozel-muzik",
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const { d, lang } = useI18n();

  useDeferredSetup(
    ref,
    () => {
      const el = ref.current;
      if (!el) return;
      const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Masaüstü: scroll'a bağlı 3D derinlik efekti
      mm.add("(min-width: 1025px)", () => {
        gsap.utils.toArray<HTMLElement>(".srv-row").forEach((row) => {
          gsap.fromTo(
            row,
            {
              opacity: 0,
              rotationX: -55,
              y: 110,
              z: -180,
              transformPerspective: 1000,
              transformOrigin: "center top",
            },
            {
              opacity: 1,
              rotationX: 0,
              y: 0,
              z: 0,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top 100%", end: "top 58%", scrub: 0.5 },
            }
          );
        });
        gsap.fromTo(
          ".srv-head",
          { opacity: 0, rotationX: -30, y: 70, transformPerspective: 900 },
          {
            opacity: 1,
            rotationX: 0,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: ".srv-head", start: "top 95%", end: "top 55%", scrub: 0.5 },
          }
        );
      });

      // Mobil/tablet: hafif fade-up — 3D/scrub yok, jank yok
      mm.add("(max-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>(".srv-row").forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" },
          });
        });
      });
      }, el);
      return () => ctx.revert();
    },
    [lang]
  );

  return (
    <>
      <style>{`
        .services { padding: 18vh 0; }
        .srv-head {
          display: flex; justify-content: space-between; align-items: flex-end;
          flex-wrap: wrap; gap: 2rem; margin-bottom: 6rem;
        }
        .srv-head h2 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(3rem, 7.5vw, 7rem); text-transform: uppercase; line-height: 1;
        }
        .srv-head p {
          color: var(--text-dim); max-width: 500px; line-height: 1.7;
          font-weight: 500; font-size: 1.45rem;
        }
        .srv-list {
          perspective: 1200px;
          display: flex; flex-direction: column; gap: 12vh;
          max-width: 1400px; margin: 0 auto;
        }
        .srv-row {
          display: grid;
          grid-template-columns: 1fr minmax(240px, 44%);
          min-height: clamp(340px, 38vh, 440px);
          position: relative; will-change: transform, opacity;
          width: min(78%, 1000px);
          text-decoration: none; color: inherit;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 22px 55px rgba(14, 155, 144, 0.14);
          transition: transform 0.45s ease, box-shadow 0.45s ease;
        }
        .srv-row:nth-child(even) {
          grid-template-columns: minmax(240px, 44%) 1fr;
        }
        .srv-row:nth-child(even) .srv-panel { order: 2; }
        .srv-row:nth-child(even) .srv-visual { order: 1; }
        .srv-panel {
          padding: 2.6rem 2.2rem;
          display: grid;
          grid-template-columns: clamp(72px, 7vw, 110px) 1fr;
          column-gap: 1.4rem;
          row-gap: 1rem;
          align-content: center;
          background: linear-gradient(
            135deg,
            rgba(244, 240, 232, 0.97) 0%,
            rgba(244, 240, 232, 0.88) 100%
          );
        }
        .srv-visual {
          position: relative;
          min-height: 100%;
          background-image: var(--row-bg);
          background-size: cover;
          background-position: center;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .srv-visual::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(115deg, transparent 55%, rgba(255,255,255,0.22) 75%, transparent 90%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .srv-row:hover {
          transform: translateY(-4px);
          box-shadow: 0 32px 70px rgba(14, 155, 144, 0.22), 0 0 40px rgba(141, 255, 198, 0.2);
        }
        .srv-row:hover .srv-visual { transform: scale(1.06); }
        .srv-row:hover .srv-visual::after { opacity: 1; }
        .srv-row:nth-child(odd) {
          margin-right: auto;
          margin-left: 0;
        }
        .srv-row:nth-child(even) {
          margin-left: auto;
          margin-right: 0;
        }
        .srv-row:last-child { margin-bottom: 0; }
        .srv-num {
          grid-column: 1;
          grid-row: 1 / span 3;
          align-self: start;
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 3.2vw, 3rem); font-weight: 700; letter-spacing: 0.06em;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .srv-row:hover h3 { color: var(--accent); transition: color 0.4s; }
        .srv-row h3 {
          grid-column: 2;
          grid-row: 1;
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(1.8rem, 3.2vw, 3rem); text-transform: uppercase;
          line-height: 1.08;
        }
        .srv-row h3 .srv-arrow {
          display: inline-block; margin-left: 0.6rem; color: var(--turq);
          opacity: 0; transform: translateX(-8px);
          transition: opacity 0.4s, transform 0.4s;
        }
        .srv-row:hover h3 .srv-arrow { opacity: 1; transform: translateX(0); }
        .srv-row p {
          grid-column: 2;
          grid-row: 2;
          color: var(--text-dim); font-size: 1.3rem; line-height: 1.75; font-weight: 500;
          max-width: none;
        }
        .srv-tags {
          grid-column: 2;
          grid-row: 3;
          display: flex; flex-wrap: wrap; gap: 0.6rem;
          justify-content: flex-start;
        }
        .srv-tags li {
          list-style: none; font-size: 0.95rem; letter-spacing: 0.08em;
          color: var(--text); background: rgba(255, 255, 255, 0.55);
          border: 1.5px solid rgba(8, 96, 89, 0.35); border-radius: 100px;
          padding: 0.45rem 1.15rem; text-transform: uppercase; font-weight: 600;
        }
        @media (max-width: 768px) {
          .srv-list { max-width: 100%; gap: 8vh; }
          .srv-row,
          .srv-row:nth-child(even) {
            width: 100%;
            margin-left: 0 !important;
            margin-right: 0 !important;
            grid-template-columns: 1fr;
            min-height: 0;
          }
          .srv-row:nth-child(even) .srv-panel,
          .srv-row:nth-child(even) .srv-visual { order: unset; }
          .srv-visual { min-height: 220px; }
          .srv-panel {
            grid-template-columns: 64px 1fr;
            padding: 2rem 1.4rem;
          }
        }
      `}</style>
      <section className="services sec-light" id="services" ref={ref}>
        <div className="container">
          <div className="section-label">{d.services.label}</div>
          <div className="srv-head">
            <h2>
              {d.services.t1}
              <br />
              {d.services.t2}
            </h2>
            <p>{d.services.desc}</p>
          </div>
          <div className="srv-list">
            {d.services.items.map((s, i) => (
              <Link
                className="srv-row"
                key={i}
                id={rowIds[i]}
                href={`/hizmetler/${rowSlugs[i]}`}
                data-cursor
                style={
                  {
                    "--row-bg": `url(${servicesData[i]?.hero ?? ""})`,
                  } as CSSProperties
                }
              >
                <div className="srv-panel">
                  <span className="srv-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>
                    {s.title}
                    <span className="srv-arrow" aria-hidden>
                      →
                    </span>
                  </h3>
                  <p>{s.desc}</p>
                  <ul className="srv-tags">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="srv-visual" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
