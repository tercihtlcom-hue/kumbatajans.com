export type WebDesignStyle = {
  slug: string;
  hero: string;
  tr: { name: string };
  en: { name: string };
};

/** Her sektör sayfasında gösterilen 10 stil şablonu */
export const webDesignStyles: WebDesignStyle[] = [
  {
    slug: "premium",
    hero: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=85",
    tr: { name: "Premium" },
    en: { name: "Premium" },
  },
  {
    slug: "klasik",
    hero: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=85",
    tr: { name: "Klasik" },
    en: { name: "Classic" },
  },
  {
    slug: "elit",
    hero: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
    tr: { name: "Elit" },
    en: { name: "Elite" },
  },
  {
    slug: "standart",
    hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
    tr: { name: "Standart" },
    en: { name: "Standard" },
  },
  {
    slug: "dark",
    hero: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=85",
    tr: { name: "Dark" },
    en: { name: "Dark" },
  },
  {
    slug: "eglenceli",
    hero: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=85",
    tr: { name: "Eğlenceli" },
    en: { name: "Playful" },
  },
  {
    slug: "minimal",
    hero: "https://images.unsplash.com/photo-1618004912476-2988d81bcdec?w=1200&q=85",
    tr: { name: "Minimal" },
    en: { name: "Minimal" },
  },
  {
    slug: "modern",
    hero: "https://images.unsplash.com/photo-1614854262312-831c137c947b?w=1200&q=85",
    tr: { name: "Modern" },
    en: { name: "Modern" },
  },
  {
    slug: "cesur",
    hero: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=85",
    tr: { name: "Cesur" },
    en: { name: "Bold" },
  },
  {
    slug: "luks",
    hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
    tr: { name: "Lüks" },
    en: { name: "Luxury" },
  },
];

/** Sektör + stil → Vercel demo URL (sonradan doldurulur) */
export const styleDemoUrls: Record<string, Partial<Record<string, string>>> = {
  "guzellik-salonu": {
    premium: "https://pearl-beauty-nextjs.vercel.app/",
  },
};

export function getWebDesignStyle(slug: string) {
  return webDesignStyles.find((s) => s.slug === slug);
}

export function getStyleDemoUrl(sectorSlug: string, styleSlug: string) {
  return styleDemoUrls[sectorSlug]?.[styleSlug];
}
