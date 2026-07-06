/**
 * Hero videolarını indirir; ffmpeg varsa 720p'ye sıkıştırır.
 *
 *   node scripts/setup-local-media.mjs
 */
import { spawnSync } from "node:child_process";
import { createWriteStream, existsSync, mkdirSync, renameSync } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const heroDir = path.join(root, "public", "media", "hero");
const sectionsDir = path.join(root, "public", "media", "sections");
const tmpDir = path.join(root, ".tmp-media");

mkdirSync(heroDir, { recursive: true });
mkdirSync(sectionsDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

function hasFfmpeg() {
  const r = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" });
  return r.status === 0;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

function compressHero(srcTmp, dest) {
  const r = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      srcTmp,
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
    { stdio: "inherit" }
  );
  if (r.status !== 0) throw new Error("ffmpeg failed");
}

const HERO = [
  {
    url: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
    out: "hero-1.mp4",
  },
  {
    url: "https://videos.pexels.com/video-files/18069166/18069166-hd_1920_1080_25fps.mp4",
    out: "hero-2.mp4",
  },
  {
    url: "https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_25fps.mp4",
    out: "hero-3.mp4",
  },
  {
    url: "https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4",
    out: "hero-4.mp4",
  },
];

const SECTIONS = [
  {
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=75&fm=webp",
    out: "process.webp",
  },
  {
    url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1400&q=75&fm=webp",
    out: "contact.webp",
  },
];

async function main() {
  const ffmpeg = hasFfmpeg();
  console.log(ffmpeg ? "ffmpeg: ok" : "ffmpeg: yok — 1080p dosya olduğu gibi kopyalanacak");

  for (const { url, out } of HERO) {
    const dest = path.join(heroDir, out);
    if (existsSync(dest)) {
      console.log(`skip: ${out}`);
      continue;
    }
    const tmp = path.join(tmpDir, `raw-${out}`);
    console.log(`download: ${out}`);
    await download(url, tmp);
    if (ffmpeg) {
      console.log(`compress: ${out}`);
      compressHero(tmp, dest);
    } else {
      renameSync(tmp, dest);
    }
  }

  for (const { url, out } of SECTIONS) {
    const dest = path.join(sectionsDir, out);
    if (existsSync(dest)) {
      console.log(`skip: ${out}`);
      continue;
    }
    console.log(`download: ${out}`);
    await download(url, dest);
  }

  console.log("Bitti → public/media/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
