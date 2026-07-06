import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const project = "C:\\Users\\ArifYazici\\Desktop\\kumbat-locomotive";
const downloads = "C:\\Users\\ArifYazici\\Downloads";
const heroDir = path.join(project, "public", "media", "hero");
const rawDir = path.join(project, "public", "media", "hero-raw");

const MAP = [
  { match: "3129671", out: "hero-1.mp4" },
  { match: "18069166", out: "hero-2.mp4" },
  { match: "3121459", out: "hero-3.mp4" },
  { match: "857251", out: "hero-4.mp4" },
];

const EXPLICIT = [
  "C:\\Users\\ArifYazici\\Downloads\\3129671-hd_1920_1080_30fps.mp4",
];

mkdirSync(heroDir, { recursive: true });
mkdirSync(rawDir, { recursive: true });

const log = [];

function copyOne(src, destName, destDir) {
  const dest = path.join(destDir, destName);
  copyFileSync(src, dest);
  log.push(`ok: ${path.basename(src)} → ${destName} (${statSync(dest).size} bytes)`);
}

for (const src of EXPLICIT) {
  if (!existsSync(src)) {
    log.push(`missing: ${src}`);
    continue;
  }
  const entry = MAP.find((m) => path.basename(src).includes(m.match));
  const name = entry?.out ?? path.basename(src);
  copyOne(src, name, rawDir);
  copyOne(src, name, heroDir);
}

if (existsSync(downloads)) {
  for (const name of readdirSync(downloads)) {
    if (!name.toLowerCase().endsWith(".mp4")) continue;
    const entry = MAP.find((m) => name.includes(m.match));
    if (!entry) continue;
    const src = path.join(downloads, name);
    const destRaw = path.join(rawDir, entry.out);
    const destHero = path.join(heroDir, entry.out);
    if (!existsSync(destRaw)) copyOne(src, entry.out, rawDir);
    if (!existsSync(destHero)) copyOne(src, entry.out, heroDir);
  }
}

writeFileSync(path.join(project, "copy-hero-log.txt"), log.join("\n") || "no files copied");
