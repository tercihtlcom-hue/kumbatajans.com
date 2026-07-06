import { copyFileSync, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src =
  "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1).mp4";
const destDir = path.join(root, "public", "media", "hero");
const dest = path.join(destDir, "hero-1.mp4");
const log = path.join(root, "copy-hero1-log.txt");

mkdirSync(destDir, { recursive: true });

const lines = [`src exists: ${existsSync(src)}`];
if (existsSync(src)) {
  copyFileSync(src, dest);
  lines.push(`copied → ${dest}`);
  lines.push(`size: ${statSync(dest).size} bytes`);
} else {
  lines.push("HATA: kaynak dosya yok");
}

writeFileSync(log, lines.join("\n"));
