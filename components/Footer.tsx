"use client";

import Magnetic from "./Magnetic";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { d } = useI18n();
  return (
    <>
      <style>{`
        .site-footer {
          background: linear-gradient(140deg, #0b6e66 0%, #0e9b90 55%, #12b3a0 100%);
          color: #eafff6;
          padding: 5rem 4vw 3rem;
          display: flex; flex-direction: column; gap: 3.5rem;
        }
        .sf-cta {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 3rem; padding: 3rem 0 4rem;
          border-bottom: 1px solid rgba(234, 255, 246, 0.25);
        }
        .sf-cta h2 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.6rem, 6.5vw, 6rem); text-transform: uppercase;
          line-height: 1.02; max-width: 800px;
        }
        .sf-cta-btn {
          width: clamp(150px, 15vw, 210px); height: clamp(150px, 15vw, 210px);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          text-align: center; text-decoration: none; color: #fff;
          background: var(--grad-vivid);
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(1rem, 1.4vw, 1.3rem); text-transform: uppercase;
          letter-spacing: 0.08em; line-height: 1.3; padding: 1rem;
          box-shadow: 0 24px 60px rgba(255, 0, 128, 0.4);
          transition: box-shadow 0.4s;
        }
        .sf-cta-btn:hover { box-shadow: 0 30px 80px rgba(255, 0, 128, 0.6); }
        @media (max-width: 640px) {
          .sf-cta { justify-content: center; text-align: center; padding: 2rem 0 3rem; }
          .sf-cols { gap: 2.5rem; }
        }
        .sf-marquee-wrap { overflow: hidden; white-space: nowrap; }
        .sf-marquee {
          display: inline-flex; gap: 4rem;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(5rem, 16vw, 16rem); text-transform: uppercase;
          line-height: 1.05; letter-spacing: -0.02em;
          background: linear-gradient(
            100deg,
            #8dffc6 0%,
            #4fc9ff 35%,
            #ff6b9d 65%,
            #c084fc 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: marqueeScroll 30s linear infinite; will-change: transform;
          user-select: none;
        }
        .sf-marquee span { display: inline-block; padding-right: 4rem; }
        .sf-top { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 3rem; }
        .sf-brand .logo {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(3rem, 4.5vw, 4.2rem);
          text-transform: uppercase;
        }
        .sf-brand p {
          opacity: 0.9; max-width: 480px; margin-top: 1.4rem;
          line-height: 1.65; font-size: clamp(1.45rem, 1.8vw, 1.75rem); font-weight: 400;
        }
        .sf-cols { display: flex; gap: 6rem; flex-wrap: wrap; }
        .sf-col h3 {
          font-size: clamp(1.15rem, 1.3vw, 1.35rem); text-transform: uppercase;
          letter-spacing: 0.22em; opacity: 0.75; margin-bottom: 1.8rem; font-weight: 700;
        }
        .sf-col a {
          display: block; opacity: 0.92; text-decoration: none;
          font-size: clamp(1.55rem, 1.9vw, 1.85rem); margin-bottom: 1.1rem; transition: opacity 0.3s;
        }
        .sf-col a:hover { opacity: 1; }
        .sf-bottom {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 1rem; padding-top: 2.4rem;
          border-top: 1px solid rgba(234, 255, 246, 0.25);
        }
        .sf-bottom p { opacity: 0.7; font-size: clamp(1rem, 1.1vw, 1.1rem); letter-spacing: 0.05em; }
      `}</style>
      <footer className="site-footer">
        <div className="sf-cta">
          <h2>
            {d.footer.cta1}
            <br />
            {d.footer.cta2}
          </h2>
          <Magnetic strength={0.4}>
            <a href="/#contact" className="sf-cta-btn" data-cursor>
              {d.footer.ctaBtn}
            </a>
          </Magnetic>
        </div>
        <div className="sf-marquee-wrap" aria-hidden>
          <div className="sf-marquee">
            <span>
              Kumbat<span className="grad-text">®</span> — Kod + AI +
              Prodüksiyon —
            </span>
            <span>
              Kumbat<span className="grad-text">®</span> — Kod + AI +
              Prodüksiyon —
            </span>
          </div>
        </div>
        <div className="sf-top">
          <div className="sf-brand">
            <div className="logo">
              Kumbat<span style={{ color: "var(--accent)" }}>®</span>
            </div>
            <p>{d.footer.brandDesc}</p>
          </div>
          <div className="sf-cols">
            <div className="sf-col">
              <h3>{d.footer.colSite}</h3>
              <a href="/#work">{d.nav.work}</a>
              <a href="/#services">{d.nav.services}</a>
              <a href="/#fotografcilik">{d.nav.photo}</a>
              <a href="/#webtasarim">{d.nav.web}</a>
              <a href="/hakkimizda">{d.nav.about}</a>
              <a href="/#contact">{d.nav.contact}</a>
            </div>
            <div className="sf-col">
              <h3>{d.footer.colSocial}</h3>
              <a
                href="https://instagram.com/codetech_kumbat"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram — @codetech_kumbat
              </a>
              <a href="#">TikTok</a>
              <a href="#">YouTube</a>
              <a href="#">Facebook</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="sf-bottom">
          <p>{d.footer.rights}</p>
          <p>{d.footer.location}</p>
        </div>
      </footer>
    </>
  );
}
