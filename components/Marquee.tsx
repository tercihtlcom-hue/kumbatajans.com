"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

// Scroll hızına tepki veren marquee: hızlı kaydırınca hızlanır ve eğilir
export default function Marquee({ light = false }: { light?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { d } = useI18n();
  const row = [...d.marquee, ...d.marquee, ...d.marquee];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    // Mobil/tablet: saf CSS animasyonu kullanılır (aşağıdaki media query).
    // GSAP'in sonsuz tween'i + hız-takip ScrollTrigger'ı ana thread'i sürekli
    // meşgul ediyordu — mobilde tamamen atla.
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    const inner = wrap.querySelector(".marquee-inner");
    if (!inner) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(inner, {
        xPercent: -33.333,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      const proxy = { skew: 0, speed: 1 };
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          const speed = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 600);
          const skew = gsap.utils.clamp(-12, 12, v / 220);
          gsap.to(proxy, {
            speed,
            skew,
            duration: 0.4,
            overwrite: true,
            onUpdate: () => {
              tween.timeScale(proxy.speed);
              gsap.set(inner, { skewX: proxy.skew });
            },
          });
          // Hız düşünce normale dön
          gsap.to(proxy, {
            speed: 1,
            skew: 0,
            duration: 1.2,
            delay: 0.15,
            onUpdate: () => {
              tween.timeScale(proxy.speed);
              gsap.set(inner, { skewX: proxy.skew });
            },
          });
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .marquee-band {
          overflow: hidden; padding: 2rem 0; white-space: nowrap;
          border-top: 1px solid; border-bottom: 1px solid;
        }
        .marquee-band.dark { background: var(--grad-vivid); color: #fff; border-color: transparent; }
        .marquee-band.light { background: var(--cream-alt); color: var(--turq); border-color: var(--border-light); }
        .marquee-inner {
          display: inline-flex; align-items: center; gap: 3.2rem;
          will-change: transform;
        }
        .marquee-inner span {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(1.4rem, 2.8vw, 2.4rem); text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 3.2rem;
        }
        .marquee-inner span::after { content: "✦"; font-size: 0.8em; opacity: 0.6; }
        /* Mobil/tablet: GSAP yerine hafif CSS animasyonu */
        @media (max-width: 1024px) {
          .marquee-inner {
            animation: marqueeMobile 22s linear infinite;
            will-change: auto;
          }
        }
        @keyframes marqueeMobile {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
      <div
        className={`marquee-band ${light ? "light" : "dark"}`}
        aria-hidden
        ref={wrapRef}
      >
        <div className="marquee-inner">
          {row.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </>
  );
}
