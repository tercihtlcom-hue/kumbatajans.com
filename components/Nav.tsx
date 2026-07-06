"use client";

import { useEffect, useState } from "react";
import { useI18n, languages } from "@/lib/i18n";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, d } = useI18n();

  const links = [
    { href: "/#work", label: d.nav.work },
    { href: "/#services", label: d.nav.services },
    { href: "/#sosyal-medya", label: d.nav.social },
    { href: "/#program-satis", label: d.nav.programs },
    { href: "/#fotografcilik", label: d.nav.photo },
    { href: "/#webtasarim", label: d.nav.web },
    { href: "/hakkimizda", label: d.nav.about },
    { href: "/#contact", label: d.nav.contact },
  ];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Istanbul",
        })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        .site-nav {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 8000;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.6rem 4vw;
          opacity: 0; transform: translateY(-16px);
          transition: opacity 0.8s, transform 0.8s;
        }
        .site-nav.visible { opacity: 1; transform: translateY(0); }
        .site-nav .logo {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(1.7rem, 3.2vw, 3.4rem);
          text-decoration: none; letter-spacing: 0.02em;
          position: relative; z-index: 8100;
          text-transform: uppercase; color: #4fc9ff;
          text-shadow:
            0 0 18px rgba(79, 201, 255, 0.75),
            0 0 48px rgba(79, 201, 255, 0.45),
            0 0 90px rgba(79, 201, 255, 0.25);
          transition: color 0.35s, text-shadow 0.35s, filter 0.35s;
        }
        .site-nav .logo:hover {
          color: #9fe4ff;
          filter: brightness(1.35);
          text-shadow:
            0 0 22px rgba(159, 228, 255, 0.95),
            0 0 60px rgba(79, 201, 255, 0.7),
            0 0 120px rgba(79, 201, 255, 0.45);
        }
        .nav-clock {
          font-family: var(--font-display); font-weight: 700;
          font-size: 1.15rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #3dff88; display: flex; gap: 0.8rem; align-items: center;
          text-shadow:
            0 0 14px rgba(61, 255, 136, 0.7),
            0 0 38px rgba(61, 255, 136, 0.35);
          background: rgba(14, 13, 18, 0.6);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(61, 255, 136, 0.18);
          border-radius: 100px; padding: 0.8rem 1.6rem;
        }
        .nav-clock::before {
          content: ""; width: 9px; height: 9px; border-radius: 50%;
          background: #3dff88;
          box-shadow: 0 0 12px #3dff88, 0 0 28px rgba(61, 255, 136, 0.6);
          animation: navPulse 2s infinite;
        }
        @keyframes navPulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }
        .site-nav > ul {
          display: flex; gap: 0.4rem; list-style: none; align-items: center;
          background: rgba(14, 13, 18, 0.6);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(61, 255, 136, 0.18);
          border-radius: 100px; padding: 0.5rem 0.6rem;
        }
        .site-nav > ul a {
          display: block; padding: 0.9rem 1.35rem;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(1.1rem, 1.2vw, 1.6rem);
          text-transform: uppercase; letter-spacing: 0.03em;
          text-decoration: none; color: #3dff88;
          border-radius: 100px;
          text-shadow:
            0 0 14px rgba(61, 255, 136, 0.7),
            0 0 38px rgba(61, 255, 136, 0.4),
            0 0 70px rgba(61, 255, 136, 0.2);
          transition: background 0.35s, color 0.35s, text-shadow 0.35s, filter 0.35s;
        }
        .site-nav > ul a:hover {
          background: #3dff88; color: #0e0d12;
          text-shadow: none;
          box-shadow: 0 0 24px rgba(61, 255, 136, 0.8), 0 0 60px rgba(61, 255, 136, 0.4);
          filter: brightness(1.15);
        }
        .nav-lang { position: relative; }
        /* Buton ile liste arasındaki boşlukta mouse "dışarı çıktı" sayılmasın */
        .nav-lang.open::after {
          content: ""; position: absolute; top: 100%; left: -30px; right: -30px;
          height: 1.2rem;
        }
        .nav-lang-btn {
          display: flex; align-items: center; gap: 0.7rem;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(1.2rem, 1.3vw, 1.7rem); letter-spacing: 0.1em; text-transform: uppercase;
          color: #3dff88; cursor: pointer;
          text-shadow:
            0 0 14px rgba(61, 255, 136, 0.7),
            0 0 38px rgba(61, 255, 136, 0.35);
          background: rgba(14, 13, 18, 0.6);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(61, 255, 136, 0.18);
          border-radius: 100px; padding: 0.8rem 1.5rem;
          transition: box-shadow 0.35s, filter 0.35s;
        }
        .nav-lang-btn:hover {
          box-shadow: 0 0 24px rgba(61, 255, 136, 0.5);
          filter: brightness(1.15);
        }
        .nav-lang-btn .globe { font-size: 1.2em; line-height: 1; }
        .nav-lang-btn .arrow {
          font-size: 0.7em; transition: transform 0.3s;
        }
        .nav-lang.open .nav-lang-btn .arrow { transform: rotate(180deg); }
        .nav-lang-list {
          position: absolute; top: calc(100% + 0.7rem); left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: rgba(14, 13, 18, 0.92);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(61, 255, 136, 0.22);
          border-radius: 18px; padding: 0.5rem; min-width: 210px;
          max-height: 60vh; overflow-y: auto;
          opacity: 0; visibility: hidden;
          transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
          list-style: none;
        }
        .nav-lang.open .nav-lang-list {
          opacity: 1; visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .nav-lang-list button {
          display: flex; justify-content: space-between; align-items: center;
          width: 100%; background: none; border: none; cursor: pointer;
          font-family: var(--font-display); font-weight: 600;
          font-size: 1.3rem; text-transform: uppercase; letter-spacing: 0.06em;
          color: #3dff88; padding: 0.75rem 1.1rem; border-radius: 12px;
          transition: background 0.3s, color 0.3s;
        }
        .nav-lang-list button:hover { background: #3dff88; color: #0e0d12; }
        .nav-lang-list button .code { opacity: 0.6; font-size: 0.85em; }
        .nav-lang-list button.active { background: rgba(61, 255, 136, 0.15); }
        @media (max-width: 1360px) { .nav-lang { display: none; } }
        .nav-burger {
          display: none; background: none; border: none; width: 34px; height: 22px;
          position: relative; cursor: pointer; z-index: 8100;
        }
        .nav-burger span {
          position: absolute; left: 0; width: 100%; height: 1.5px; background: #fff;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-burger span:nth-child(1) { top: 2px; }
        .nav-burger span:nth-child(2) { top: 50%; transform: translateY(-50%); }
        .nav-burger span:nth-child(3) { bottom: 2px; }
        .nav-burger.open span:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
        .nav-burger.open span:nth-child(2) { opacity: 0; }
        .nav-burger.open span:nth-child(3) { bottom: 50%; transform: translateY(50%) rotate(-45deg); }
        .mobile-menu {
          position: fixed; inset: 0; z-index: 7900; background: var(--dark);
          display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
          gap: 1.5rem; opacity: 0; visibility: hidden; transition: opacity 0.5s, visibility 0.5s;
          padding: 6.5rem 1.5rem 3rem; overflow-y: auto;
        }
        .mobile-menu.open { opacity: 1; visibility: visible; }
        .mobile-menu a {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(1.5rem, 5.5vw, 2rem);
          text-transform: uppercase; text-decoration: none; color: #3dff88;
          text-shadow: 0 0 16px rgba(61, 255, 136, 0.6), 0 0 44px rgba(61, 255, 136, 0.3);
          transition: opacity 0.3s;
        }
        .mobile-menu a:hover { opacity: 0.7; }
        .mm-langs {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem;
          margin-top: 1.5rem; padding-top: 1.8rem;
          border-top: 1px solid rgba(61, 255, 136, 0.2);
          max-width: 340px;
        }
        .mm-langs button {
          background: rgba(61, 255, 136, 0.08); border: 1px solid rgba(61, 255, 136, 0.25);
          color: #3dff88; border-radius: 100px; padding: 0.55rem 1.1rem;
          font-family: var(--font-display); font-weight: 700; font-size: 0.95rem;
          letter-spacing: 0.08em; cursor: pointer;
        }
        .mm-langs button.active { background: #3dff88; color: #0e0d12; }
        @media (max-width: 1360px) {
          .site-nav > ul, .nav-clock { display: none; }
          .nav-burger { display: block; }
        }
      `}</style>
      <nav className={`site-nav ${visible ? "visible" : ""}`}>
        <a href="/" className="logo">
          Kumbat Ajans<span style={{ opacity: 0.6 }}>®</span>
        </a>
        <div className="nav-clock">Ankara — {time}</div>
        <div
          className={`nav-lang ${langOpen ? "open" : ""}`}
          onMouseLeave={() => setLangOpen(false)}
        >
          <button
            className="nav-lang-btn"
            onClick={() => setLangOpen(!langOpen)}
            aria-label="Dil seç"
          >
            <span className="globe" aria-hidden>🌐</span>
            {lang}
            <span className="arrow" aria-hidden>▼</span>
          </button>
          <ul className="nav-lang-list">
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  className={lang === l.code ? "active" : ""}
                  onClick={() => {
                    setLang(l.code);
                    setLangOpen(false);
                  }}
                >
                  {l.label} <span className="code">{l.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button
          aria-label="Menü"
          className={`nav-burger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <div className="mm-langs">
          {languages.map((l) => (
            <button
              key={l.code}
              className={lang === l.code ? "active" : ""}
              onClick={() => setLang(l.code)}
            >
              {l.code}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
