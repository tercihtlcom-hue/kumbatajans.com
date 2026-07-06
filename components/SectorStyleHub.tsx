"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";
import { sectorNameFromDict, styleNameFromDict } from "@/lib/i18n/helpers";
import type { WebDesignSite } from "@/lib/webdesign-sites";
import {
  getStyleDemoUrl,
  webDesignStyles,
} from "@/lib/webdesign-styles";

gsap.registerPlugin(ScrollTrigger);

export default function SectorStyleHub({ sector }: { sector: WebDesignSite }) {
  const ref = useRef<HTMLElement>(null);
  const { d } = useI18n();
  const sectorName = sectorNameFromDict(d, sector.slug, sector.en.name);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ssh-item").forEach((item) => {
        const wrap = item.querySelector(".ssh-img-wrap");
        const caption = item.querySelector(".ssh-caption");

        if (wrap) {
          gsap.fromTo(
            wrap,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        if (caption) {
          gsap.from(caption, {
            y: 28,
            opacity: 0,
            duration: 0.75,
            delay: 0.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, el);
    return () => ctx.revert();
  }, [d]);

  return (
    <>
      <style>{`
        .ssh {
          position: relative;
          min-height: 100vh;
          padding: 12vh 4vw 14vh;
          overflow: hidden;
          background: linear-gradient(
            165deg,
            #f4f0e8 0%,
            #e8f7f2 35%,
            #f0eef8 65%,
            #f4f0e8 100%
          );
        }
        .ssh-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
        }
        .ssh-blob {
          position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.45;
        }
        .ssh-blob-1 {
          width: 55vw; height: 55vw; max-width: 620px; max-height: 620px;
          top: -12%; right: -8%;
          background: radial-gradient(circle, rgba(6, 214, 160, 0.55), transparent 70%);
        }
        .ssh-blob-2 {
          width: 48vw; height: 48vw; max-width: 520px; max-height: 520px;
          bottom: 5%; left: -10%;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.4), transparent 70%);
        }
        .ssh-blob-3 {
          width: 30vw; height: 30vw; max-width: 340px;
          top: 42%; left: 38%;
          background: radial-gradient(circle, rgba(79, 201, 255, 0.35), transparent 70%);
        }
        .ssh-wave {
          position: absolute; left: 0; width: 100%; line-height: 0; z-index: 0;
        }
        .ssh-wave-top { top: 0; transform: rotate(180deg); }
        .ssh-wave-mid { top: 38%; opacity: 0.55; }
        .ssh-wave-bottom { bottom: -2px; }
        .ssh-wave svg { display: block; width: 100%; height: auto; }
        .ssh-inner { position: relative; z-index: 1; }
        .ssh-top {
          max-width: 1200px;
          margin: 0 auto 5rem;
          text-align: center;
        }
        .ssh-back {
          display: inline-flex;
          margin-bottom: 2rem;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--text-dim);
          padding: 0.5rem 1.2rem;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(14, 155, 144, 0.2);
          backdrop-filter: blur(8px);
        }
        .ssh-top h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.6rem, 6vw, 4.8rem);
          text-transform: uppercase;
          line-height: 1.02;
          background: linear-gradient(100deg, #06d6a0 0%, #0e9b90 40%, #4fc9ff 70%, #c084fc 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .ssh-top p {
          margin: 1.2rem auto 0;
          max-width: 620px;
          font-size: 1.2rem;
          line-height: 1.75;
          color: var(--text-dim);
        }
        .ssh-list {
          display: flex;
          flex-direction: column;
          gap: clamp(11vh, 14vh, 16vh);
          max-width: 1500px;
          margin: 0 auto;
          padding: 2vh 0 8vh;
        }
        .ssh-item {
          display: block;
          text-decoration: none;
          color: inherit;
          width: min(78%, 1000px);
        }
        .ssh-item:nth-child(odd) {
          margin-right: auto;
          margin-left: 0;
        }
        .ssh-item:nth-child(even) {
          margin-left: auto;
          margin-right: 0;
        }
        .ssh-img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          aspect-ratio: 3/4;
          min-height: clamp(520px, 48vw, 680px);
          background: var(--cream-alt);
          will-change: clip-path;
          box-shadow: 0 40px 100px rgba(14, 155, 144, 0.22);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease;
        }
        .ssh-item:nth-child(odd) .ssh-img-wrap { transform: translateY(-10px) rotate(0.6deg); }
        .ssh-item:nth-child(even) .ssh-img-wrap { transform: translateY(10px) rotate(-0.6deg); }
        .ssh-item:hover .ssh-img-wrap {
          transform: translateY(-12px) scale(1.03) rotate(0deg);
          box-shadow: 0 52px 120px rgba(14, 155, 144, 0.4), 0 0 70px rgba(141, 255, 198, 0.35);
        }
        .ssh-img-wrap::after {
          content: "";
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(6, 12, 18, 0.82) 0%,
            rgba(6, 12, 18, 0.22) 42%,
            rgba(6, 12, 18, 0.04) 100%
          );
          transition: background 0.45s ease;
        }
        .ssh-item:hover .ssh-img-wrap::after {
          background: linear-gradient(
            to top,
            rgba(6, 12, 18, 0.65) 0%,
            rgba(6, 12, 18, 0.1) 38%,
            transparent 100%
          );
        }
        .ssh-img-wrap img {
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s ease;
          filter: brightness(1.16) saturate(1.18) contrast(1.04);
        }
        .ssh-item:hover .ssh-img-wrap img {
          transform: scale(1.1);
          filter: brightness(1.34) saturate(1.3) contrast(1.06);
        }
        .ssh-overlay-num {
          position: absolute; top: 1.8rem; right: 2rem; z-index: 2;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(1.8rem, 2.6vw, 2.4rem);
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ssh-overlay-cta {
          position: absolute; left: 2.4rem; bottom: 2.4rem; z-index: 2;
          padding: 0.95rem 1.8rem;
          border-radius: 100px;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--grad-vivid);
          color: #fff;
        }
        .ssh-caption {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: 1.6rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .ssh-caption .left {
          display: flex;
          align-items: baseline;
          gap: 1.4rem;
        }
        .ssh-caption .idx {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2vw, 1.8rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ssh-caption h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(2rem, 3.2vw, 3rem);
          text-transform: uppercase;
          line-height: 1.05;
          background: linear-gradient(100deg, #8dffc6, #4fc9ff, #c084fc);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ssh-caption .meta {
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-dim);
        }
        @media (max-width: 768px) {
          .ssh-list { gap: 10vh; }
          .ssh-item,
          .ssh-item:nth-child(odd),
          .ssh-item:nth-child(even) {
            width: 100%;
            margin-left: 0;
            margin-right: 0;
          }
          .ssh-item:nth-child(odd) .ssh-img-wrap,
          .ssh-item:nth-child(even) .ssh-img-wrap {
            transform: none;
            min-height: clamp(480px, 88vw, 600px);
          }
          .ssh-item:hover .ssh-img-wrap {
            transform: translateY(-8px) scale(1.02);
          }
        }
      `}</style>
      <section className="ssh" ref={ref}>
        <div className="ssh-bg" aria-hidden>
          <div className="ssh-blob ssh-blob-1" />
          <div className="ssh-blob ssh-blob-2" />
          <div className="ssh-blob ssh-blob-3" />
          <div className="ssh-wave ssh-wave-top">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="rgba(6,214,160,0.12)">
              <path d="M0,64 C320,120 480,0 720,48 C960,96 1120,24 1440,64 L1440,120 L0,120 Z" />
            </svg>
          </div>
          <div className="ssh-wave ssh-wave-mid">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="rgba(192,132,252,0.1)">
              <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
            </svg>
          </div>
          <div className="ssh-wave ssh-wave-bottom">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" fill="rgba(14,155,144,0.14)">
              <path d="M0,32 C360,96 540,8 720,56 C900,104 1080,16 1440,48 L1440,100 L0,100 Z" />
            </svg>
          </div>
        </div>
        <div className="ssh-inner">
          <div className="ssh-top">
            <Link href="/#webtasarim" className="ssh-back">
              {d.styleHub.back}
            </Link>
            <div className="section-label">{sectorName}</div>
            <h1>{d.styleHub.title}</h1>
            <p>{d.styleHub.desc.replace("{sector}", sectorName)}</p>
          </div>
          <div className="ssh-list">
            {webDesignStyles.map((style, i) => {
              const hasDemo = !!getStyleDemoUrl(sector.slug, style.slug);
              const styleName = styleNameFromDict(d, style.slug);
              return (
                <Link
                  key={style.slug}
                  href={`/web-tasarim/${sector.slug}/${style.slug}`}
                  className="ssh-item"
                  data-cursor
                >
                  <div className="ssh-img-wrap">
                    <Image
                      src={style.hero}
                      alt={styleName}
                      fill
                      sizes="(max-width: 768px) 100vw, 78vw"
                    />
                    <span className="ssh-overlay-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="ssh-overlay-cta">
                      {hasDemo ? d.webdesign.demo : d.styleHub.viewTemplate}
                    </span>
                  </div>
                  <div className="ssh-caption">
                    <div className="left">
                      <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{styleName}</h3>
                    </div>
                    <span className="meta">
                      {hasDemo ? d.styleHub.liveDemoMeta : d.styleHub.emptyShell}
                    </span>
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
