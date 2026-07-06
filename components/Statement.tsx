"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/lib/i18n";
import { useDeferredSetup } from "@/lib/useDeferredSetup";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { d, lang } = useI18n();

  useDeferredSetup(
    ref,
    () => {
      const el = ref.current;
      if (!el) return;
      const ctx = gsap.context(() => {
        const words = gsap.utils.toArray<HTMLElement>(".st-word");
        gsap.fromTo(
          words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: ".st-text",
              start: "top 75%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );
      }, el);
      return () => ctx.revert();
    },
    [lang]
  );

  const text = d.statement.text;

  return (
    <>
      <style>{`
        .statement { padding: 22vh 0; }
        .st-text {
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(2.2rem, 5.2vw, 5rem);
          line-height: 1.2; letter-spacing: -0.02em; max-width: 1300px;
        }
        .st-word { display: inline-block; margin-right: 0.28em; }
        .st-sub {
          margin-top: 3.2rem; opacity: 0.85; max-width: 680px;
          line-height: 1.8; font-weight: 400; font-size: 1.35rem;
        }
        .st-sub a {
          font-weight: 600;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
      `}</style>
      <section className="statement sec-light-alt" id="about" ref={ref}>
        <div className="container">
          <div className="section-label">{d.statement.label}</div>
          <p className="st-text">
            {text.split(" ").map((w, i) => (
              <span className="st-word" key={i}>
                {w}
              </span>
            ))}
          </p>
          <p className="st-sub">
            {d.statement.sub}{" "}
            <a
              href="https://instagram.com/codetech_kumbat"
              target="_blank"
              rel="noopener noreferrer"
            >
              @codetech_kumbat
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
