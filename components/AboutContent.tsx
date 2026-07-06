"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export default function AboutContent() {
  const { d } = useI18n();
  const a = d.about;

  return (
    <>
      <style>{`
        .about-page { padding-top: 22vh; }
        .about-hero h1 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.8rem, 9vw, 9rem); text-transform: uppercase;
          line-height: 0.95;
        }
        .about-hero .grad-text { display: inline; }
        .about-intro {
          display: grid; grid-template-columns: 1fr 1fr; gap: 5rem;
          margin-top: 7rem; padding-bottom: 14vh;
        }
        .about-intro .img-wrap {
          position: relative; aspect-ratio: 4/3; border-radius: 6px; overflow: hidden;
        }
        .about-intro .img-wrap img { object-fit: cover; }
        .about-intro .text p {
          opacity: 0.75; line-height: 1.85; font-weight: 300; margin-bottom: 1.6rem;
          font-size: 1.05rem;
        }
        .about-intro .text a {
          font-weight: 600;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .about-values { padding: 14vh 0; background: var(--cream-alt); color: var(--turq); }
        .about-values h2 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.2rem, 5.5vw, 5rem); text-transform: uppercase;
          margin-bottom: 5rem;
        }
        .values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3.5rem; }
        .value-item { border-top: 1px solid var(--border-light); padding-top: 1.8rem; }
        .value-item .num {
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
          background: var(--grad-vivid);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .value-item h3 {
          font-family: var(--font-display); font-weight: 600;
          font-size: 1.5rem; text-transform: uppercase; margin: 0.8rem 0;
        }
        .value-item p { opacity: 0.7; line-height: 1.75; font-weight: 300; }
        .about-cta { padding: 16vh 0; text-align: center; }
        .about-cta h2 {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.4rem, 7vw, 6.5rem); text-transform: uppercase; line-height: 1;
        }
        .about-cta a.btn {
          display: inline-block; margin-top: 3rem; padding: 1.2rem 3.4rem;
          background: var(--grad-vivid); color: #fff; text-decoration: none;
          border-radius: 100px; font-size: 0.75rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em;
          transition: transform 0.3s;
        }
        .about-cta a.btn:hover { transform: translateY(-3px) scale(1.03); }
        @media (max-width: 900px) {
          .about-intro, .values-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>
      <main className="about-page">
        <section className="about-hero">
          <div className="container">
            <div className="section-label">{a.label}</div>
            <h1>
              {a.h1a} <span className="grad-text">{a.h1b}</span>
              <br />
              {a.h1c}
            </h1>
            <div className="about-intro">
              <div className="img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=85"
                  alt={a.teamAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="text">
                <p>{a.p1}</p>
                <p>{a.p2}</p>
                <p>
                  {a.p3prefix}{" "}
                  <a
                    href="https://instagram.com/codetech_kumbat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @codetech_kumbat
                  </a>{" "}
                  {a.p3suffix}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="about-values">
          <div className="container">
            <div className="section-label">{a.valuesLabel}</div>
            <h2>{a.valuesTitle}</h2>
            <div className="values-grid">
              {a.values.map((v) => (
                <div className="value-item" key={v.num}>
                  <span className="num">{v.num}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="about-cta">
          <div className="container">
            <h2>
              {a.ctaTitle1}
              <br />
              {a.ctaTitle2}
            </h2>
            <a href="/#contact" className="btn">
              {a.ctaBtn}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
