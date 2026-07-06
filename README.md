# Kumbat Ajans — Locomotive tarzı Next.js sitesi

## Kurulum

```bash
cd Desktop/kumbat-locomotive
npm install
npm run dev
```

Tarayıcıda http://localhost:3000 aç.

## Yapı

- `app/` — Next.js App Router (layout, sayfa, global CSS)
- `components/` — Loader, Cursor, Nav, Hero, FeaturedWork, Statement, Services, Stats, Contact, Footer
- Animasyon: GSAP + ScrollTrigger, smooth scroll: Lenis

## Kendi içeriğini ekleme

- Proje görselleri: `components/FeaturedWork.tsx` içindeki `projects` dizisi
- Hizmetler: `components/Services.tsx` içindeki `services` dizisi
- İletişim/WhatsApp: `components/Contact.tsx`
