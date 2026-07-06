/**
 * CapCut hero videolarını sıkıştırıp public/media/hero/ altına koyar.
 * Görüntü aynı kalır; boyut ~%80-90 düşer (Lighthouse için kritik).
 *
 *   npm run hero:optimize
 *
 * Gereksinim: ffmpeg (yoksa: winget install Gyan.FFmpeg)
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const heroDir = path.join(root, "public", "media", "hero");
const logFile = path.join(root, "hero-optimize-log.txt");

const SOURCES = [
  {
    src: "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1).mp4",
    out: "hero-1.mp4",
  },
  {
    src: "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1)(1).mov",
    out: "hero-2.mp4",
  },
  {
    src: "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1).mov",
    out: "hero-3.mp4",
  },
  {
    src: "C:\\Users\\ArifYazici\\AppData\\Local\\CapCut\\Videos\\0706 (1)(2).mov",
    out: "hero-4.mp4",
  },
];

const lines = [];
function log(msg) {
  console.log(msg);
  lines.push(msg);
}

function hasFfmpeg() {
  return spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status === 0;
}

function compress(src, dest) {
  const r = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      src,
      "-vf",
      "scale=1280:-2",
      "-c:v",
      "libx264",
      "-crf",
      "26",
      "-preset",
      "slow",
      "-an",
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      dest,
    ],
    { encoding: "utf8" }
  );
  if (r.status !== 0) throw new Error(r.stderr?.slice(-800) || "ffmpeg failed");
}

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

mkdirSync(heroDir, { recursive: true });

if (!hasFfmpeg()) {
  log("HATA: ffmpeg bulunamadi.");
  log("Kur:  winget install Gyan.FFmpeg");
  log("Kurduktan sonra TERMINALI KAPAT-AC ve tekrar dene.");
  writeFileSync(logFile, lines.join("\n"));
  process.exit(1);
}

let ok = 0;
for (const { src, out } of SOURCES) {
  const dest = path.join(heroDir, out);
  if (!existsSync(src)) {
    log(`atlandi (kaynak yok): ${src}`);
    continue;
  }
  const before = statSync(src).size;
  log(`sikistiriliyor: ${path.basename(src)} -> ${out} (${mb(before)})`);
  try {
    compress(src, dest);
    const after = statSync(dest).size;
    log(`  ok: ${out} ${mb(before)} -> ${mb(after)}`);
    ok++;
  } catch (e) {
    log(`  HATA: ${String(e.message || e)}`);
  }
}

log(ok === 4 ? "TAMAM: 4/4 video hazir." : `DIKKAT: ${ok}/4 video hazir.`);
writeFileSync(logFile, lines.join("\n"));
