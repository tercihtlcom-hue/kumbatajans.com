export type Project = {
  slug: string;
  title: string;
  tag: string;
  year: string;
  img: string;
  gallery: string[];
  summary: string;
  description: string[];
  services: string[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "pearl-beauty",
    title: "Pearl Beauty — Güzellik Salonu",
    tag: "Next.js / Web Tasarım",
    year: "2026",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=85",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1600&q=85",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=85",
    ],
    summary:
      "Güzellik salonları için modern, randevu odaklı web sitesi tasarımı.",
    description: [
      "Pearl Beauty, güzellik salonları için tasarladığımız modern web sitesi konseptimiz. Hizmet listesi, fiyatlandırma, galeri ve online randevu akışı tek sayfada toplandı.",
      "Next.js ile geliştirildi; mobil öncelikli tasarım, hızlı açılış ve SEO optimizasyonu ile salonunuzun Google'da öne çıkmasını sağlar. WhatsApp entegrasyonu ile müşteriler tek tıkla randevu talebi gönderir.",
    ],
    services: ["Web Tasarım", "Next.js", "SEO", "WhatsApp Entegrasyonu"],
    liveUrl: "https://pearl-beauty-nextjs.vercel.app/",
  },
  {
    slug: "fintech-mobil",
    title: "FinTech Mobil Uygulama",
    tag: "React Native / Node.js",
    year: "2025",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=85",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=85",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85",
    ],
    summary: "Bütçe takibi ve anlık bildirimli mobil finans uygulaması.",
    description: [
      "Kullanıcıların harcamalarını kategorilere ayırıp bütçe hedefleri koyabildiği, anlık bildirimlerle destekli bir mobil finans uygulaması geliştirdik.",
      "React Native ile iOS ve Android'de tek kod tabanı, Node.js backend ile güvenli veri akışı sağlandı. Biyometrik giriş ve uçtan uca şifreleme ile güvenlik ön planda tutuldu.",
    ],
    services: ["Mobil Uygulama", "React Native", "Node.js", "UI/UX"],
  },
  {
    slug: "e-ticaret-platformu",
    title: "E-Ticaret Platformu",
    tag: "Next.js / Shopify",
    year: "2025",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=85",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=85",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85",
    ],
    summary: "Yüksek dönüşüm oranlı headless e-ticaret deneyimi.",
    description: [
      "Shopify altyapısını Next.js ile headless mimaride birleştirerek saniyeler içinde açılan, dönüşüm odaklı bir e-ticaret deneyimi kurduk.",
      "Ürün sayfaları, sepet akışı ve ödeme adımları A/B testleriyle optimize edildi. Sonuç: daha hızlı sayfalar, daha az terk edilen sepet.",
    ],
    services: ["E-Ticaret", "Next.js", "Shopify", "CRO"],
  },
  {
    slug: "kurumsal-tanitim-filmi",
    title: "Kurumsal Tanıtım Filmi",
    tag: "Prodüksiyon / Post",
    year: "2024",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=85",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=85",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=85",
    ],
    summary: "4K sinematik kurumsal tanıtım filmi — çekimden renk düzenine.",
    description: [
      "Senaryodan yayına uçtan uca yürüttüğümüz 4K kurumsal tanıtım filmi projesi. Drone çekimleri, stüdyo röportajları ve ürün planları tek hikayede birleşti.",
      "Post-prodüksiyonda color grading, ses tasarımı ve motion graphics ile markanın premium kimliği ekrana taşındı.",
    ],
    services: ["Prodüksiyon", "4K Çekim", "Color Grading", "Motion Graphics"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
