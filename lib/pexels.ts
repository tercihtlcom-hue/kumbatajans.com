// Pexels API — sunucu tarafında çalışır, key tarayıcıya gitmez.
// Kalıcı kullanım için key'i .env.local dosyasına taşı: PEXELS_API_KEY=...
import { HERO_VIDEO_FALLBACKS } from "./hero-videos";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY ?? "";

const QUERIES = [
  "technology abstract dark cinematic",
  "neon lights night city",
  "film production studio camera",
  "coding programmer screen dark",
];

const FALLBACKS = [...HERO_VIDEO_FALLBACKS];

type PexelsVideoFile = {
  link: string;
  quality: string;
  width: number;
};

async function fetchOne(query: string, fallback: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: PEXELS_API_KEY },
        next: { revalidate: 60 * 60 * 24 },
      }
    );
    if (!res.ok) return fallback;
    const data = await res.json();
    const files: PexelsVideoFile[] = data?.videos?.[0]?.video_files ?? [];
    const pick =
      files.find((f) => f.quality === "hd" && f.width <= 1400) ??
      files.find((f) => f.quality === "sd" && f.width >= 900) ??
      files.find((f) => f.quality === "hd") ??
      files[0];
    return pick?.link ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getHeroVideos(): Promise<string[]> {
  return Promise.all(QUERIES.map((q, i) => fetchOne(q, FALLBACKS[i])));
}

const PHOTO_QUERIES = [
  "creative digital agency team laptop workspace",
  "creative studio bright design colorful",
  "abstract soft gradient pastel",
];

const PHOTO_FALLBACKS = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=75",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=70",
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=70",
];

async function fetchPhoto(query: string, fallback: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: PEXELS_API_KEY },
        next: { revalidate: 60 * 60 * 24 },
      }
    );
    if (!res.ok) return fallback;
    const data = await res.json();
    return data?.photos?.[0]?.src?.large ?? fallback;
  } catch {
    return fallback;
  }
}

export { HERO_VIDEO_FALLBACKS } from "./hero-videos";

export async function getSectionImages(): Promise<string[]> {
  return Promise.all(
    PHOTO_QUERIES.map((q, i) => fetchPhoto(q, PHOTO_FALLBACKS[i]))
  );
}
