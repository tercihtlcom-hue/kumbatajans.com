"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/lib/i18n";
import { useDeferredSetup } from "@/lib/useDeferredSetup";

gsap.registerPlugin(ScrollTrigger);

export default function Process({ bg }: { bg?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [bgFixed, setBgFixed] = useState(false);
  const { d, lang } = useI18n();

  useEffect(() => {
    setBgFixed(window.matchMedia("(min-width: 769px)").matches);
  }, []);

  useDeferredSetup(
    ref,
    () => {
      const el = ref.current;
      if (!el) return;
      const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Masaüstü: yandan derinlikten dönen 3D scrub efekti
      mm.add("(min-width: 1025px)", () => {
        gsap.utils.toArray<HTMLElement>(".prc-item").forEach((item, i) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              rotationY: i % 2 === 0 ? -40 : 40,
              x: i % 2 === 0 ? -120 : 120,
              z: -200,
              transformPerspective: 1100,
            },
            {
              opacity: 1,
              rotationY: 0,
              x: 0,
              z: 0,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top 100%", end: "top 55%", scrub: 0.5 },
            }
          );
        });
        gsap.fromTo(
          ".prc-head",
          { opacity: 0, rotationX: -35, y: 80, transformPerspective: 900 },
          {
            opacity: 1,
            rotationX: 0,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: ".prc-head", start: "top 95%", end: "top 55%", scrub: 0.5 },
          }
        );
        gsap.fromTo(
          ".testimonial",
          { opacity: 0, scale: 0.85, y: 80, transformPerspective: 900, rotationX: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationX: 0,
            ease: "none",
            scrollTrigger: { trigger: ".testimonial", start: "top 100%", end: "top 60%", scrub: 0.5 },
          }
        );
      });

      // Mobil/tablet: hafif fade-up
      mm.add("(max-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>(".prc-item, .testimonial").forEach((node) => {
          gsap.from(node, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 90%", toggleActions: "play none none none" },
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
        .process { padding: 18vh 0; }
        .prc-head {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(3rem, 7.5vw, 7rem); text-transform: uppercase;
          line-height: 1; margin-bottom: 6rem;
        }
        .prc-list { perspective: 1200px; }
        .prc-item {
          display: grid; grid-template-columns: 110px 1fr 1.4fr; gap: 2rem;
          align-items: baseline; padding: 3.2rem 0; border-top: 1px solid var(--border);
          position: relative; will-change: transform, opacity;
        }
        .prc-item:last-of-type { border-bottom: 1px solid var(--border); }
        .prc-item::after {
          content: ""; position: absolute; top: 0; left: 0; width: 0; height: 2px;
          background: var(--grad-vivid); transition: width 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .prc-item:hover::after { width: 100%; }
        .prc-num {
          font-size: 1.3rem; font-weight: 700; letter-spacing: 0.1em;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .prc-item h3 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(1.8rem, 3.2vw, 3rem); text-transform: uppercase;
        }
        .prc-item p { color: var(--text-dim); line-height: 1.8; font-weight: 500; font-size: 1.3rem; }
        .testimonial { max-width: 900px; margin-top: 12vh; will-change: transform, opacity; }
        .testimonial p {
          font-size: clamp(1.6rem, 3.2vw, 2.7rem); font-weight: 400;
          line-height: 1.55; color: var(--text-dim); font-style: italic;
        }
        .testimonial footer { margin-top: 2rem; font-size: 1.05rem; color: var(--text-dim); letter-spacing: 0.05em; }
        .testimonial footer strong { color: var(--turq); }
        @media (max-width: 900px) {
          .prc-item { grid-template-columns: 70px 1fr; }
          .prc-item p { grid-column: 2; }
        }
      `}</style>
      <section
        className="process sec-light-alt"
        ref={ref}
        style={
          bg
            ? {
                background: `linear-gradient(rgba(236,230,218,0.965), rgba(236,230,218,0.965)), url(${bg}) center/cover no-repeat ${bgFixed ? "fixed" : "scroll"}`,
              }
            : undefined
        }
      >
        <div className="container">
          <div className="section-label">{d.process.label}</div>
          <h2 className="prc-head">
            {d.process.t1}
            <br />
            {d.process.t2}
          </h2>
          <div className="prc-list">
            {d.process.steps.map((s, i) => (
              <div className="prc-item" key={i}>
                <span className="prc-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <blockquote className="testimonial">
            <p>{d.process.quote}</p>
            <footer>
              <strong>{d.process.quoteBy}</strong> — {d.process.quoteRole}
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
