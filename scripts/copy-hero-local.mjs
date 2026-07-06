import { copyFileSync, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const destDir = path.join(root, "public", "media", "hero");
const log = path.join(root, "copy-hero-log.txt");

const COPIES = [
  {
    src: "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1).mp4",
    dest: "hero-1.mp4",
  },
  {
    src: "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1)(1).mov",
    dest: "hero-2.mov",
  },
  {
    src: "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1).mov",
    dest: "hero-3.mov",
  },
  {
    src: "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1)(2).mov",
    dest: "hero-4.mov",
  },
];

mkdirSync(destDir, { recursive: true });

const lines = [];
for (const { src, dest } of COPIES) {
  const out = path.join(destDir, dest);
  if (!existsSync(src)) {
    lines.push(`skip (yok): ${src}`);
    continue;
  }
  copyFileSync(src, out);
  lines.push(`ok: ${dest} (${statSync(out).size} bytes)`);
  if (dest.endsWith(".mov")) {
    const mp4 = dest.replace(/\.mov$/i, ".mp4");
    copyFileSync(out, path.join(destDir, mp4));
    lines.push(`ok: ${mp4} (mov kopyası)`);
  }
}

writeFileSync(log, lines.join("\n") || "nothing copied");
