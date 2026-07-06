import type { Lang } from "./i18n";

export type WebDesignSite = {
  slug: string;
  hero: string;
  tr: { name: string };
  en: { name: string };
};

export const webDesignSites: WebDesignSite[] = [
  {
    slug: "guzellik-salonu",
    hero: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=85",
    tr: { name: "Güzellik Salonu" },
    en: { name: "Beauty Salon" },
  },
  {
    slug: "kuafor-berber",
    hero: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=85",
    tr: { name: "Kuaför & Berber" },
    en: { name: "Hair & Barber" },
  },
  {
    slug: "restoran-kafe",
    hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85",
    tr: { name: "Restoran & Kafe" },
    en: { name: "Restaurant & Café" },
  },
  {
    slug: "dis-klinigi",
    hero: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=85",
    tr: { name: "Diş Klinikleri" },
    en: { name: "Dental Clinics" },
  },
  {
    slug: "fitness-spor",
    hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85",
    tr: { name: "Fitness & Spor Salonu" },
    en: { name: "Fitness & Gym" },
  },
  {
    slug: "emlak-insaat",
    hero: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85",
    tr: { name: "Emlak & İnşaat" },
    en: { name: "Real Estate & Construction" },
  },
  {
    slug: "e-ticaret",
    hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85",
    tr: { name: "E-Ticaret" },
    en: { name: "E-Commerce" },
  },
  {
    slug: "avukatlik-danismanlik",
    hero: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=85",
    tr: { name: "Avukatlık & Danışmanlık" },
    en: { name: "Law & Consulting" },
  },
  {
    slug: "isletme-kobi",
    hero: "https://images.unsplash.com/photo-1556761175-5973dc0f32e8?w=1200&q=85",
    tr: { name: "İşletme & KOBİ" },
    en: { name: "Business & SME" },
  },
  {
    slug: "dersane-egitim",
    hero: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=85",
    tr: { name: "Dersane & Eğitim Merkezi" },
    en: { name: "Tutoring & Prep School" },
  },
  {
    slug: "ozel-okul-kolej",
    hero: "https://images.unsplash.com/photo-1580582932707-7cd826f43706?w=1200&q=85",
    tr: { name: "Özel Okul & Kolej" },
    en: { name: "Private School & College" },
  },
  {
    slug: "kurumsal-isletme",
    hero: "https://images.unsplash.com/photo-1497366216548-3cb9c4a7b609?w=1200&q=85",
    tr: { name: "Kurumsal & Büyük İşletmeler" },
    en: { name: "Corporate & Enterprise" },
  },
];

export function getWebDesignSite(slug: string) {
  return webDesignSites.find((s) => s.slug === slug);
}

export function webDesignSiteLabel(site: WebDesignSite, lang: Lang) {
  return lang === "TR" ? site.tr.name : site.en.name;
}
