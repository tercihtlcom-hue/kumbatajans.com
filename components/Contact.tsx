"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/lib/i18n";
import { useDeferredSetup } from "@/lib/useDeferredSetup";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ bg }: { bg?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [bgFixed, setBgFixed] = useState(false);
  const { d } = useI18n();

  useEffect(() => {
    setBgFixed(window.matchMedia("(min-width: 769px)").matches);
  }, []);

  useDeferredSetup(
    ref,
    () => {
      const el = ref.current;
      if (!el) return;
      const ctx = gsap.context(() => {
        gsap.from(".contact-title .ct-line-inner", {
          y: "110%",
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 65%" },
        });
        gsap.from(".contact-form-el, .contact-details", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: 0.3,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 65%" },
        });
      }, el);
      return () => ctx.revert();
    },
    []
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = encodeURIComponent(
      `Merhaba, ben ${data.get("name")}. ${data.get("message")} (${data.get("email")})`
    );
    window.open(`https://wa.me/905306009206?text=${msg}`, "_blank");
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <style>{`
        .contact { padding: 20vh 0; }
        .contact-title {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(3rem, 10vw, 10.5rem); text-transform: uppercase;
          line-height: 0.95; margin-bottom: 5rem;
        }
        .contact-title .ct-line { display: block; overflow: hidden; }
        .contact-title .ct-line-inner { display: block; }
        .contact-title .accent {
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
        }
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1.1fr; gap: 6rem; align-items: start;
        }
        .contact-details { display: flex; flex-direction: column; gap: 1.2rem; }
        .contact-details a, .contact-details span {
          opacity: 0.85; text-decoration: none; font-size: 1.4rem; font-weight: 500;
          border-bottom: 1px solid transparent; width: fit-content;
          transition: opacity 0.3s, border-color 0.3s;
        }
        .contact-details a:hover { opacity: 1; border-color: currentColor; }
        .contact-form-el { display: flex; flex-direction: column; gap: 2.1rem; }
        .cf-group { position: relative; }
        .cf-group input, .cf-group textarea {
          width: 100%; background: transparent; border: none;
          border-bottom: 1px solid var(--border-light); padding: 1.05rem 0;
          color: inherit; font-family: inherit; font-size: 1.25rem; outline: none;
          transition: border-color 0.3s; border-radius: 0; resize: vertical;
        }
        .cf-group input:focus, .cf-group textarea:focus { border-color: var(--turq); }
        .cf-group label {
          position: absolute; top: 1.05rem; left: 0; opacity: 0.6;
          font-size: 1.15rem; pointer-events: none; transition: all 0.3s ease;
        }
        .cf-group input:focus + label,
        .cf-group input:not(:placeholder-shown) + label,
        .cf-group textarea:focus + label,
        .cf-group textarea:not(:placeholder-shown) + label {
          top: -0.85rem; font-size: 0.62rem; letter-spacing: 0.18em;
          text-transform: uppercase; opacity: 0.45;
        }
        .cf-submit {
          align-self: flex-start; background: linear-gradient(120deg, #0b6e66, #12b3a0); color: #eafff6;
          border: none; padding: 1.35rem 3.8rem; font-size: 0.95rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em; cursor: pointer;
          transition: background 0.3s, transform 0.3s; border-radius: 100px;
        }
        .cf-submit:hover { background: var(--grad-vivid); color: #fff; transform: translateY(-2px); }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; gap: 4rem; } }
      `}</style>
      <section
        className="contact sec-light"
        id="contact"
        ref={ref}
        style={
          bg
            ? {
                background: `linear-gradient(rgba(244,240,232,0.95), rgba(244,240,232,0.95)), url(${bg}) center/cover no-repeat ${bgFixed ? "fixed" : "scroll"}`,
              }
            : undefined
        }
      >
        <div className="container">
          <div className="section-label">{d.contact.label}</div>
          <h2 className="contact-title">
            <span className="ct-line">
              <span className="ct-line-inner">{d.contact.t1}</span>
            </span>
            <span className="ct-line">
              <span className="ct-line-inner accent">{d.contact.t2}</span>
            </span>
          </h2>
          <div className="contact-grid">
            <div className="contact-details">
              <a href="mailto:info@kumbatajans.com">info@kumbatajans.com</a>
              <a href="tel:+905306009206">+90 530 600 92 06</a>
              <a
                href="https://instagram.com/codetech_kumbat"
                target="_blank"
                rel="noopener noreferrer"
              >
                @codetech_kumbat
              </a>
              <span>{d.contact.location}</span>
            </div>
            <form className="contact-form-el" onSubmit={onSubmit}>
              <div className="cf-group">
                <input
                  id="cf-name"
                  type="text"
                  name="name"
                  placeholder=" "
                  required
                />
                <label htmlFor="cf-name">{d.contact.formName}</label>
              </div>
              <div className="cf-group">
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  placeholder=" "
                  required
                />
                <label htmlFor="cf-email">{d.contact.formEmail}</label>
              </div>
              <div className="cf-group">
                <textarea
                  id="cf-message"
                  name="message"
                  rows={4}
                  placeholder=" "
                  required
                />
                <label htmlFor="cf-message">{d.contact.formMsg}</label>
              </div>
              <button type="submit" className="cf-submit">
                {sent ? d.contact.sent : d.contact.send}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
