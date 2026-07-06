"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { sectorNameFromDict, styleNameFromDict } from "@/lib/i18n/helpers";
import type { WebDesignSite } from "@/lib/webdesign-sites";
import type { WebDesignStyle } from "@/lib/webdesign-styles";

export default function WebTemplateShell({
  sector,
  style,
}: {
  sector: WebDesignSite;
  style: WebDesignStyle;
}) {
  const { d } = useI18n();
  const ts = d.templateShell;
  const sectorName = sectorNameFromDict(d, sector.slug, sector.en.name);
  const styleName = styleNameFromDict(d, style.slug);

  return (
    <>
      <style>{`
        .wts {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: system-ui, sans-serif;
        }
        .wts-back, .wts-badge {
          position: fixed; z-index: 100;
          padding: 0.55rem 1rem; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none;
        }
        .wts-back { top: 1rem; left: 1rem; background: rgba(0,0,0,0.55); color: #fff; }
        .wts-badge { top: 1rem; right: 1rem; opacity: 0.75; }
        .wts-nav, .wts-hero, .wts-features, .wts-showcase, .wts-cta, .wts-foot {
          border: 1px dashed;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.45;
        }
        .wts-nav { min-height: 72px; justify-content: space-between; padding: 0 2rem; }
        .wts-hero { min-height: 58vh; flex-direction: column; gap: 0.8rem; }
        .wts-hero strong { font-size: 1rem; opacity: 0.65; }
        .wts-features {
          min-height: 240px; display: grid;
          grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 1.5rem;
        }
        .wts-features > div {
          border: 1px dashed; min-height: 150px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; opacity: 0.4;
        }
        .wts-showcase { min-height: 300px; }
        .wts-cta { min-height: 140px; }
        .wts-foot { min-height: 90px; margin-top: auto; }

        .wts-premium { background: #fafafa; color: #111; }
        .wts-premium .wts-nav, .wts-premium .wts-hero, .wts-premium .wts-showcase,
        .wts-premium .wts-cta, .wts-premium .wts-foot, .wts-premium .wts-features > div,
        .wts-premium .wts-badge { border-color: #d4af37; color: #111; }
        .wts-klasik { background: #f6f1e8; color: #1c2f3f; }
        .wts-klasik .wts-nav, .wts-klasik .wts-hero, .wts-klasik .wts-showcase,
        .wts-klasik .wts-cta, .wts-klasik .wts-foot, .wts-klasik .wts-features > div,
        .wts-klasik .wts-badge { border-color: #b8a88a; }
        .wts-elit { background: #0a0a0a; color: #f5e6c8; }
        .wts-elit .wts-nav, .wts-elit .wts-hero, .wts-elit .wts-showcase,
        .wts-elit .wts-cta, .wts-elit .wts-foot, .wts-elit .wts-features > div,
        .wts-elit .wts-badge { border-color: #c9a227; color: #f5e6c8; }
        .wts-standart { background: #f0f4f8; color: #1a365d; }
        .wts-standart .wts-nav, .wts-standart .wts-hero, .wts-standart .wts-showcase,
        .wts-standart .wts-cta, .wts-standart .wts-foot, .wts-standart .wts-features > div,
        .wts-standart .wts-badge { border-color: #4a6fa5; }
        .wts-dark { background: #0b0f14; color: #e8f4ff; }
        .wts-dark .wts-nav, .wts-dark .wts-hero, .wts-dark .wts-showcase,
        .wts-dark .wts-cta, .wts-dark .wts-foot, .wts-dark .wts-features > div,
        .wts-dark .wts-badge { border-color: #2a3a4f; color: #e8f4ff; }
        .wts-eglenceli { background: linear-gradient(160deg, #fff5f8, #f0f9ff); color: #2d1b4e; }
        .wts-eglenceli .wts-nav, .wts-eglenceli .wts-hero, .wts-eglenceli .wts-showcase,
        .wts-eglenceli .wts-cta, .wts-eglenceli .wts-foot, .wts-eglenceli .wts-features > div,
        .wts-eglenceli .wts-badge { border-color: #ff6b9d; border-radius: 16px; }
        .wts-minimal { background: #fff; color: #333; }
        .wts-minimal .wts-nav, .wts-minimal .wts-hero, .wts-minimal .wts-showcase,
        .wts-minimal .wts-cta, .wts-minimal .wts-foot, .wts-minimal .wts-features > div,
        .wts-minimal .wts-badge { border-color: #ddd; }
        .wts-modern {
          background: linear-gradient(135deg, #0f172a, #1e1b4b, #0e7490);
          color: #e0f2fe;
        }
        .wts-modern .wts-nav, .wts-modern .wts-hero, .wts-modern .wts-showcase,
        .wts-modern .wts-cta, .wts-modern .wts-foot, .wts-modern .wts-features > div,
        .wts-modern .wts-badge { border-color: rgba(125,211,252,0.35); color: #e0f2fe; }
        .wts-cesur { background: #111; color: #fff; }
        .wts-cesur .wts-nav, .wts-cesur .wts-hero, .wts-cesur .wts-showcase,
        .wts-cesur .wts-cta, .wts-cesur .wts-foot, .wts-cesur .wts-features > div,
        .wts-cesur .wts-badge { border-color: #ff2d2d; }
        .wts-luks { background: #0d1f1a; color: #e8dcc8; }
        .wts-luks .wts-nav, .wts-luks .wts-hero, .wts-luks .wts-showcase,
        .wts-luks .wts-cta, .wts-luks .wts-foot, .wts-luks .wts-features > div,
        .wts-luks .wts-badge { border-color: #5c7a6a; color: #e8dcc8; }

        @media (max-width: 768px) {
          .wts-features { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className={`wts wts-${style.slug}`}>
        <Link href={`/web-tasarim/${sector.slug}`} className="wts-back">
          ← {sectorName}
        </Link>
        <span className="wts-badge">
          {sectorName} · {styleName}
        </span>
        <header className="wts-nav">
          <span>{ts.logo}</span>
          <span>{ts.menu}</span>
        </header>
        <section className="wts-hero">
          <strong>
            {sectorName} — {styleName}
          </strong>
          {ts.heroArea}
        </section>
        <section className="wts-features">
          <div>{ts.card1}</div>
          <div>{ts.card2}</div>
          <div>{ts.card3}</div>
        </section>
        <section className="wts-showcase">{ts.visualArea}</section>
        <section className="wts-cta">{ts.ctaArea}</section>
        <footer className="wts-foot">{ts.footerArea}</footer>
      </div>
    </>
  );
}
