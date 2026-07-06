import fs from "node:fs";
import path from "node:path";
import { HERO_VIDEO_FALLBACKS } from "./hero-videos";

const HERO_SLOTS = ["hero-1", "hero-2", "hero-3", "hero-4"] as const;
const HERO_EXTS = ["mp4", "mov", "webm"] as const;

export const sectionPaths = {
  process: "/media/sections/process.webp",
  contact: "/media/sections/contact.webp",
} as const;

const REMOTE_SECTIONS = {
  process:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=75&fm=webp",
  contact:
    "https://images.unsplash.com/photo-1557683316-973673baf926?w=1400&q=75&fm=webp",
};

const MIN_HERO_BYTES = 8_000;

function localHeroFile(urlPath: string) {
  return path.join(process.cwd(), "public", urlPath.replace(/^\//, ""));
}

function isValidLocalFile(filePath: string) {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).size >= MIN_HERO_BYTES;
  } catch {
    return false;
  }
}

/** hero-1.mp4 / hero-2.mov vb. — hangi uzantı varsa onu döner */
export function resolveLocalHero(slot: (typeof HERO_SLOTS)[number]): string | null {
  for (const ext of HERO_EXTS) {
    const urlPath = `/media/hero/${slot}.${ext}`;
    if (isValidLocalFile(localHeroFile(urlPath))) return urlPath;
  }
  return null;
}

/** Pexels listesinde var olan yerel dosyaları değiştirir */
export function mergeHeroVideos(remote: string[]): string[] {
  const base =
    remote.length >= 4 ? remote.slice(0, 4) : [...HERO_VIDEO_FALLBACKS];
  return base.map((url, i) => resolveLocalHero(HERO_SLOTS[i]) ?? url);
}

function publicFileExists(urlPath: string) {
  return fs.existsSync(localHeroFile(urlPath));
}

export function getSectionBackgrounds() {
  return {
    process: publicFileExists(sectionPaths.process)
      ? sectionPaths.process
      : REMOTE_SECTIONS.process,
    contact: publicFileExists(sectionPaths.contact)
      ? sectionPaths.contact
      : REMOTE_SECTIONS.contact,
  };
}
