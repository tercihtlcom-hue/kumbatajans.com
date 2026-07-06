import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proje | Kumbat Ajans®" };
  return {
    title: `${project.title} | Kumbat Ajans®`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main className="project-page">
        <style>{`
          .project-page { padding-top: 22vh; }
          .pp-head h1 {
            font-family: var(--font-display); font-weight: 600;
            font-size: clamp(2.4rem, 7.5vw, 7.5rem); text-transform: uppercase;
            line-height: 0.98; max-width: 1200px;
          }
          .pp-meta {
            display: flex; gap: 3rem; flex-wrap: wrap; margin-top: 3rem;
            font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
            opacity: 0.6;
          }
          .pp-hero-img {
            position: relative; aspect-ratio: 16/8; border-radius: 6px;
            overflow: hidden; margin-top: 5rem;
          }
          .pp-hero-img img { object-fit: cover; }
          .pp-body {
            display: grid; grid-template-columns: 1fr 1.4fr; gap: 5rem;
            padding: 12vh 0;
          }
          .pp-services h4 {
            font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.24em;
            opacity: 0.45; margin-bottom: 1.4rem;
          }
          .pp-services li {
            list-style: none; padding: 0.85rem 0; border-top: 1px solid var(--border-light);
            font-size: 0.95rem; opacity: 0.85;
          }
          .pp-desc p {
            opacity: 0.78; line-height: 1.9; font-weight: 300;
            font-size: 1.1rem; margin-bottom: 1.8rem;
          }
          .pp-live {
            display: inline-block; margin-top: 1rem; padding: 1.1rem 3rem;
            background: var(--grad-vivid); color: #fff; text-decoration: none;
            border-radius: 100px; font-size: 0.72rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.2em;
            transition: transform 0.3s;
          }
          .pp-live:hover { transform: translateY(-3px); }
          .pp-gallery { display: flex; flex-direction: column; gap: 2rem; padding-bottom: 12vh; }
          .pp-gallery .g-img {
            position: relative; aspect-ratio: 16/9; border-radius: 6px; overflow: hidden;
          }
          .pp-gallery .g-img img { object-fit: cover; }
          .pp-next {
            padding: 14vh 0; text-align: center; background: var(--cream-alt); color: var(--turq);
          }
          .pp-next .label {
            font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
            opacity: 0.5; display: block; margin-bottom: 1.6rem;
          }
          .pp-next a {
            font-family: var(--font-display); font-weight: 600;
            font-size: clamp(2rem, 6vw, 5.5rem); text-transform: uppercase;
            text-decoration: none; color: inherit; line-height: 1.05;
            transition: opacity 0.3s;
          }
          .pp-next a:hover { opacity: 0.6; }
          @media (max-width: 900px) { .pp-body { grid-template-columns: 1fr; gap: 3rem; } }
        `}</style>
        <div className="container">
          <div className="pp-head">
            <div className="section-label">Proje</div>
            <h1>{project.title}</h1>
            <div className="pp-meta">
              <span>{project.tag}</span>
              <span>{project.year}</span>
              <span>Kumbat Ajans®</span>
            </div>
          </div>
          <div className="pp-hero-img">
            <Image
              src={project.img}
              alt={project.title}
              fill
              priority
              sizes="92vw"
            />
          </div>
          <div className="pp-body">
            <div className="pp-services">
              <h4>Hizmetler</h4>
              <ul>
                {project.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="pp-desc">
              {project.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-live"
                >
                  Canlı Demo →
                </a>
              )}
            </div>
          </div>
          <div className="pp-gallery">
            {project.gallery.slice(1).map((src, i) => (
              <div className="g-img" key={i}>
                <Image
                  src={src}
                  alt={`${project.title} görsel ${i + 2}`}
                  fill
                  sizes="92vw"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="pp-next">
          <span className="label">Sıradaki Proje</span>
          <Link href={`/projeler/${next.slug}`}>{next.title} →</Link>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
