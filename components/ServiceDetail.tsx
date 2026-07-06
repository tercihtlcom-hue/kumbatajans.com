"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import { useI18n } from "@/lib/i18n";
import { serviceContent, type Service } from "@/lib/services-data";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail({
  service,
  next,
}: {
  service: Service;
  next: Service;
}) {
  const ref = useRef<HTMLElement>(null);
  const { d, lang } = useI18n();
  const c = serviceContent(service, lang);
  const nextContent = serviceContent(next, lang);
  const sp = d.servicePage;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".sd-hero-title .ln", {
        yPercent: 115,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.15,
      });
      gsap.from(".sd-hero-tagline, .sd-hero-tags", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.utils.toArray<HTMLElement>(".sd-reveal").forEach((node) => {
        gsap.from(node, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".sd-feature").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          rotateX: -35,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
          delay: (i % 3) * 0.08,
        });
      });
    }, el);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="service-detail" ref={ref}>
      <style>{`
        .service-detail { padding-top: 20vh; overflow: hidden; }
        .sd-crumb {
          display: flex; gap: 0.6rem; align-items: center; font-size: 0.95rem;
          letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.55; margin-bottom: 1.8rem;
        }
        .sd-crumb a { color: inherit; text-decoration: none; }
        .sd-crumb a:hover { color: var(--turq); }
        .sd-hero-title {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.8rem, 9vw, 8rem); line-height: 0.95;
          text-transform: uppercase; margin-bottom: 2rem;
        }
        .sd-hero-title .ln { display: block; overflow: hidden; }
        .sd-hero-tagline {
          font-size: clamp(1.4rem, 2.6vw, 2.2rem); font-weight: 500;
          max-width: 780px; color: var(--text-dim); line-height: 1.35;
        }
        .sd-hero-tags { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 2.4rem; }
        .sd-hero-tags li {
          list-style: none; padding: 0.6rem 1.3rem; border: 1.5px solid rgba(8,96,89,0.35);
          border-radius: 100px; font-size: 0.95rem; font-weight: 600; color: var(--turq);
        }
        .sd-hero-img {
          position: relative; aspect-ratio: 16/7; border-radius: 8px;
          overflow: hidden; margin-top: 4rem;
        }
        .sd-hero-img img { object-fit: cover; }
        .sd-intro {
          display: grid; grid-template-columns: 1fr 1.5fr; gap: 5rem; padding: 14vh 0 10vh;
        }
        .sd-intro .lbl { font-size: 1rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--turq); }
        .sd-intro p {
          font-size: clamp(1.3rem, 2vw, 1.7rem); line-height: 1.7; font-weight: 400;
          color: var(--text-dim); margin-bottom: 1.8rem;
        }
        .sd-section-title {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.2rem, 5vw, 4.4rem); text-transform: uppercase;
          line-height: 1; margin-bottom: 4rem;
        }
        .sd-features {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.8rem;
          padding-bottom: 12vh; perspective: 1200px;
        }
        .sd-feature {
          background: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.6);
          border-radius: 14px; padding: 2.6rem 2.2rem;
          transition: transform 0.4s, box-shadow 0.4s, background 0.4s;
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 8px 32px rgba(8,96,89,0.06);
          will-change: transform, opacity;
        }
        .sd-feature:hover {
          transform: translateY(-6px); background: rgba(255,255,255,0.65);
          box-shadow: 0 28px 70px rgba(8,96,89,0.16);
        }
        .sd-feature h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.9rem; color: var(--dark); }
        .sd-feature p { font-size: 1.1rem; line-height: 1.6; color: var(--text-muted); }
        .sd-steps-wrap { background: var(--cream-alt); padding: 14vh 0; }
        .sd-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        .sd-step .num {
          font-family: var(--font-display); font-size: 3.4rem; font-weight: 600;
          color: var(--turq); opacity: 0.35; line-height: 1;
        }
        .sd-step h3 { font-size: 1.5rem; font-weight: 600; margin: 1rem 0 0.7rem; }
        .sd-step p { font-size: 1.1rem; line-height: 1.6; color: var(--text-muted); }
        .sd-gallery { padding: 14vh 0; }
        .sd-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; }
        .sd-gallery-grid .g {
          position: relative; aspect-ratio: 4/5; border-radius: 8px; overflow: hidden;
        }
        .sd-gallery-grid .g img { object-fit: cover; transition: transform 0.6s; }
        .sd-gallery-grid .g:hover img { transform: scale(1.06); }
        .sd-faq-wrap { background: var(--cream-alt); padding: 14vh 0; }
        .sd-faq { max-width: 900px; }
        .sd-faq details {
          border-bottom: 1px solid var(--border-light); padding: 1.8rem 0; cursor: pointer;
        }
        .sd-faq summary {
          font-size: clamp(1.3rem, 2.2vw, 1.8rem); font-weight: 600; list-style: none;
          display: flex; justify-content: space-between; align-items: center; gap: 1rem;
        }
        .sd-faq summary::-webkit-details-marker { display: none; }
        .sd-faq summary::after { content: "+"; font-size: 1.8rem; color: var(--turq); transition: transform 0.3s; }
        .sd-faq details[open] summary::after { transform: rotate(45deg); }
        .sd-faq p { font-size: 1.2rem; line-height: 1.7; color: var(--text-muted); margin-top: 1.2rem; }
        .sd-cta {
          padding: 16vh 0; text-align: center;
          background: linear-gradient(140deg, #0b6e66 0%, #0e9b90 55%, #12b3a0 100%); color: #fff;
        }
        .sd-cta h2 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.4rem, 6vw, 5.5rem); text-transform: uppercase; margin-bottom: 3rem;
        }
        .sd-cta-btns { display: flex; gap: 1.4rem; justify-content: center; flex-wrap: wrap; }
        .sd-cta-btn {
          display: inline-block; padding: 1.4rem 3.4rem; border-radius: 100px;
          font-size: 1.05rem; font-weight: 700; text-decoration: none;
          background: #fff; color: var(--dark); transition: transform 0.3s;
        }
        .sd-cta-btn.ghost { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.5); }
        .sd-cta-btn:hover { transform: translateY(-4px); }
        .sd-next { padding: 14vh 0; text-align: center; }
        .sd-next .label {
          font-size: 1rem; letter-spacing: 0.2em; text-transform: uppercase;
          opacity: 0.5; display: block; margin-bottom: 1.4rem;
        }
        .sd-next a {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2rem, 6vw, 5rem); text-transform: uppercase;
          text-decoration: none; color: var(--turq); line-height: 1.05; transition: opacity 0.3s;
        }
        .sd-next a:hover { opacity: 0.6; }
        @media (max-width: 1024px) {
          .sd-features, .sd-steps, .sd-gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 1024px) {
          .sd-feature {
            background: rgba(255,255,255,0.85);
            backdrop-filter: none; -webkit-backdrop-filter: none;
          }
          .sd-feature:hover { background: rgba(255,255,255,0.92); }
        }
        @media (max-width: 768px) {
          .service-detail { padding-top: 16vh; }
          .sd-intro { grid-template-columns: 1fr; gap: 2rem; padding: 8vh 0 6vh; }
          .sd-features, .sd-steps, .sd-gallery-grid { grid-template-columns: 1fr; }
          .sd-hero-img { aspect-ratio: 16/11; }
          .sd-steps-wrap, .sd-faq-wrap, .sd-gallery { padding: 9vh 0; }
          .sd-cta { padding: 11vh 0; }
          .sd-next { padding: 10vh 0; }
          .sd-hero-tags li { padding: 0.5rem 1rem; font-size: 0.85rem; }
        }
      `}</style>

      <div className="container">
        <div className="sd-crumb">
          <Link href="/#services">{sp.allServices}</Link>
          <span>/</span>
          <span>{sp.breadcrumb}</span>
        </div>
        <h1 className="sd-hero-title">
          {c.title.split(" ").map((w, i) => (
            <span className="ln" key={i}>
              <span style={{ display: "inline-block" }}>{w}</span>
            </span>
          ))}
        </h1>
        <p className="sd-hero-tagline">{c.tagline}</p>
        <ul className="sd-hero-tags">
          {service.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="sd-hero-img sd-reveal">
          <Image src={service.hero} alt={c.title} fill priority sizes="92vw" />
        </div>

        <div className="sd-intro">
          <div className="sd-reveal">
            <span className="lbl">{d.services.label}</span>
          </div>
          <div className="sd-reveal">
            {c.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="sd-reveal">
          <h2 className="sd-section-title">{sp.whatIncludes}</h2>
        </div>
        <div className="sd-features">
          {c.features.map((f, i) => (
            <div className="sd-feature" key={i}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sd-steps-wrap">
        <div className="container">
          <div className="sd-reveal">
            <h2 className="sd-section-title">{sp.howWeWork}</h2>
          </div>
          <div className="sd-steps">
            {c.steps.map((s, i) => (
              <div className="sd-step sd-reveal" key={i}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container sd-gallery">
        <div className="sd-reveal">
          <h2 className="sd-section-title">{sp.galleryTitle}</h2>
        </div>
        <div className="sd-gallery-grid">
          {service.gallery.map((src, i) => (
            <div className="g sd-reveal" key={i}>
              <Image
                src={src}
                alt={`${c.title} ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sd-faq-wrap">
        <div className="container">
          <div className="sd-reveal">
            <h2 className="sd-section-title">{sp.faqTitle}</h2>
          </div>
          <div className="sd-faq">
            {c.faq.map((f, i) => (
              <details className="sd-reveal" key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="sd-cta">
        <div className="container">
          <h2>{sp.ctaTitle}</h2>
          <div className="sd-cta-btns">
            <Magnetic strength={0.3}>
              <Link href="/#contact" className="sd-cta-btn" data-cursor>
                {sp.ctaBtn}
              </Link>
            </Magnetic>
            {service.liveUrl && (
              <a
                href={service.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sd-cta-btn ghost"
                data-cursor
              >
                {sp.liveDemo}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="sd-next">
          <span className="label">{sp.next}</span>
          <Link href={`/hizmetler/${next.slug}`}>{nextContent.title} →</Link>
      </div>
    </section>
  );
}
