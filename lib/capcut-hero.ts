import fs from "node:fs";
import path from "node:path";
import { HERO_VIDEO_FALLBACKS } from "./hero-videos";

/** CapCut exportları — sıra hero 1→4 */
export const CAPCUT_HERO_FILES = [
  "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1).mp4",
  "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1)(1).mov",
  "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1).mov",
  "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1)(2).mov",
] as const;

const PUBLIC_HERO = [
  "/media/hero/hero-1.mp4",
  "/media/hero/hero-2.mp4",
  "/media/hero/hero-3.mp4",
  "/media/hero/hero-4.mp4",
] as const;

function publicExists(urlPath: string) {
  const file = path.join(process.cwd(), "public", urlPath.replace(/^\//, ""));
  try {
    return fs.existsSync(file) && fs.statSync(file).size > 8000;
  } catch {
    return false;
  }
}

function capcutExists(filePath: string) {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).size > 8000;
  } catch {
    return false;
  }
}

/** public → CapCut API → Pexels */
export function getHeroVideoUrls(): string[] {
  return CAPCUT_HERO_FILES.map((capcut, i) => {
    const pub = PUBLIC_HERO[i];
    if (publicExists(pub)) return pub;
    if (capcutExists(capcut)) return `/api/hero-video/${i + 1}`;
    return HERO_VIDEO_FALLBACKS[i];
  });
}

export function getCapcutPath(slot: number): string | null {
  const file = CAPCUT_HERO_FILES[slot - 1];
  return file && capcutExists(file) ? file : null;
}
