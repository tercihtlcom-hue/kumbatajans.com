"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";
import { useDeferredSetup } from "@/lib/useDeferredSetup";

gsap.registerPlugin(ScrollTrigger);

// Sıra sözlükteki services.items ile aynı — her hizmete bir görsel + detay sayfası
const serviceMeta = [
  {
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1800&q=90",
    href: "/hizmetler/web-gelistirme",
  },
  {
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1800&q=90",
    href: "/hizmetler/sosyal-medya",
  },
  {
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85",
    href: "/hizmetler/program-satis",
  },
  {
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=85",
    href: "/hizmetler/yapay-zeka",
  },
  {
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1600&q=85",
    href: "/hizmetler/fotografcilik",
  },
  {
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=85",
    href: "/hizmetler/produksiyon",
  },
  {
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=85",
    href: "/hizmetler/test-otomasyonu",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85",
    href: "/hizmetler/dijital-strateji",
  },
  {
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1800&q=90",
    href: "/hizmetler/marka-kimligi",
  },
  {
    img: "https://images.unsplash.com/photo-1511379934373-07a1bf625cc6?w=1800&q=90",
    href: "/hizmetler/isletmeye-ozel-muzik",
  },
];

export default function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  const { d, lang } = useI18n();

  useDeferredSetup(
    ref,
    () => {
      const el = ref.current;
      if (!el) return;
      const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fw-item").forEach((item) => {
        const wrap = item.querySelector(".fw-img-wrap");
        const img = item.querySelector(".fw-img-wrap img");
        const caption = item.querySelector(".fw-caption");

        if (wrap) {
          gsap.fromTo(
            wrap,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        if (img) {
          const mm = gsap.matchMedia();
          mm.add("(min-width: 1025px)", () => {
            gsap.fromTo(
              img,
              { yPercent: -10, scale: 1.18 },
              {
                yPercent: 10,
                scale: 1.18,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });
        }
        if (caption) {
          gsap.from(caption, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
      }, el);
      return () => ctx.revert();
    },
    [lang]
  );

  return (
    <>
      <style>{`
        .featured { padding: 16vh 0 14vh; }
        .fw-head {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 8rem; flex-wrap: wrap; gap: 2rem;
        }
        .fw-head h2 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.6rem, 7vw, 6.5rem); text-transform: uppercase; line-height: 0.95;
        }
        .fw-head .count {
          font-family: var(--font-display); font-size: 1rem; opacity: 0.5;
        }
        .fw-list {
          display: flex; flex-direction: column; gap: 18vh;
          max-width: 1400px; margin: 0 auto;
        }
        .fw-item { text-decoration: none; color: inherit; display: block; }
        .fw-item:nth-child(odd) {
          width: min(72%, 920px);
          margin-right: auto;
          margin-left: 0;
        }
        .fw-item:nth-child(even) {
          width: min(72%, 920px);
          margin-left: auto;
          margin-right: 0;
        }
        .fw-img-wrap {
          overflow: hidden; border-radius: 4px; aspect-ratio: 16/10;
          position: relative; background: var(--cream-alt);
          will-change: clip-path;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease;
        }
        .fw-img-wrap::after {
          content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 48%, transparent 75%);
          opacity: 0; transition: opacity 0.35s ease;
        }
        .fw-item:hover .fw-img-wrap {
          transform: scale(1.06);
          box-shadow: 0 45px 100px rgba(14, 155, 144, 0.45), 0 0 75px rgba(141, 255, 198, 0.5), 0 0 110px rgba(79, 201, 255, 0.22);
        }
        .fw-item:hover .fw-img-wrap::after { opacity: 1; }
        .fw-img-wrap img {
          object-fit: cover;
          transition: filter 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fw-item:hover .fw-img-wrap img { filter: brightness(1.28) saturate(1.25) contrast(1.05); transform: scale(1.12); }
        .fw-caption {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-top: 1.5rem; gap: 1rem; flex-wrap: wrap;
        }
        .fw-caption .left { display: flex; align-items: baseline; gap: 1.4rem; }
        .fw-caption .idx {
          font-size: 1.1rem; font-weight: 700; letter-spacing: 0.1em;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .fw-caption h3 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(1.8rem, 3.6vw, 3.2rem); text-transform: uppercase;
          position: relative;
        }
        .fw-caption h3::after {
          content: ""; position: absolute; bottom: -6px; left: 0; width: 0; height: 2px;
          background: var(--grad-vivid); transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .fw-item:hover .fw-caption h3::after { width: 100%; }
        .fw-caption .meta {
          font-size: clamp(1.2rem, 1.75vw, 1.5rem);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.85;
        }
        @media (max-width: 768px) {
          .fw-list { max-width: 100%; gap: 10vh; }
          .fw-item:nth-child(even), .fw-item:nth-child(odd) {
            width: 100%; margin-left: 0; margin-right: 0;
          }
        }
      `}</style>
      <section className="featured sec-light" id="work" ref={ref}>
        <div className="container">
          <div className="section-label">{d.fw.label}</div>
          <div className="fw-head">
            <h2>
              {d.fw.t1}
              <br />
              {d.fw.t2}
            </h2>
            <span className="count">({d.services.items.length})</span>
          </div>
          <div className="fw-list">
            {d.services.items.map((s, i) => (
              <Link
                href={serviceMeta[i].href}
                className="fw-item"
                key={i}
                data-cursor
              >
                <div className="fw-img-wrap">
                  <Image
                    src={serviceMeta[i].img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>
                <div className="fw-caption">
                  <div className="left">
                    <span className="idx">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{s.title}</h3>
                  </div>
                  <span className="meta">{s.tags.slice(0, 3).join(" · ")}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
