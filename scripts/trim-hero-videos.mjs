/**
 * İndirilen hero MP4'lerin ilk 2 saniyesini keser → public/media/hero/
 *
 *   node scripts/trim-hero-videos.mjs
 *   node scripts/trim-hero-videos.mjs "C:\path\to\video.mp4"
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const heroDir = path.join(root, "public", "media", "hero");
const downloads = path.join(process.env.USERPROFILE || "", "Downloads");
const logFile = path.join(root, ".trim-hero-log.txt");

const MAP = [
  { match: "3129671", out: "hero-1.mp4" },
  { match: "18069166", out: "hero-2.mp4" },
  { match: "3121459", out: "hero-3.mp4" },
  { match: "857251", out: "hero-4.mp4" },
];

function log(...args) {
  const line = args.join(" ");
  console.log(line);
  return line;
}

function hasFfmpeg() {
  return spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status === 0;
}

function trim(src, dest) {
  const r = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      src,
      "-t",
      "2",
      "-vf",
      "scale=1280:-2",
      "-c:v",
      "libx264",
      "-crf",
      "28",
      "-preset",
      "medium",
      "-an",
      "-movflags",
      "+faststart",
      dest,
    ],
    { encoding: "utf8" }
  );
  if (r.status !== 0) {
    throw new Error(r.stderr || "ffmpeg failed");
  }
}

function findSources(extraArgs) {
  const found = new Map();

  for (const file of extraArgs) {
    if (existsSync(file) && file.toLowerCase().endsWith(".mp4")) {
      const entry = MAP.find((m) => path.basename(file).includes(m.match));
      const out = entry?.out ?? `hero-extra-${found.size + 1}.mp4`;
      found.set(out, file);
    }
  }

  if (found.size === 0 && existsSync(downloads)) {
    for (const name of readdirSync(downloads)) {
      if (!name.toLowerCase().endsWith(".mp4")) continue;
      const entry = MAP.find((m) => name.includes(m.match));
      if (!entry) continue;
      found.set(entry.out, path.join(downloads, name));
    }
  }

  return found;
}

async function main() {
  const lines = [];
  const push = (...a) => lines.push(log(...a));

  mkdirSync(heroDir, { recursive: true });

  if (!hasFfmpeg()) {
    push("HATA: ffmpeg yüklü değil.");
    push("Kur: winget install Gyan.FFmpeg");
    process.exit(1);
  }

  const sources = findSources(process.argv.slice(2));
  if (sources.size === 0) {
    push("HATA: Downloads içinde Pexels hero MP4 bulunamadı.");
    push("Beklenen dosya adları: 3129671, 18069166, 3121459, 857251");
    process.exit(1);
  }

  push(`Kaynak: ${sources.size} video`);

  for (const [out, src] of sources) {
    const dest = path.join(heroDir, out);
    push(`kesiliyor (2sn): ${path.basename(src)} → ${out}`);
    trim(src, dest);
    push(`ok: ${dest}`);
  }

  push("Bitti.");
  return lines.join("\n");
}

main()
  .then((text) => {
    import("node:fs").then((fs) => fs.writeFileSync(logFile, text));
  })
  .catch((e) => {
    const msg = String(e?.message || e);
    import("node:fs").then((fs) => fs.writeFileSync(logFile, msg));
    console.error(e);
    process.exit(1);
  });
