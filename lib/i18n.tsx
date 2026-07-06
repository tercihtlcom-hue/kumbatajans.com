"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DE } from "./i18n/locales/de";
import { ES } from "./i18n/locales/es";
import { FR } from "./i18n/locales/fr";
import { AR } from "./i18n/locales/ar";
import { ZH } from "./i18n/locales/zh";
import { RU } from "./i18n/locales/ru";

/* ------------------------------------------------------------------ */
/* Sözlükler: TR ve EN tam; diğer diller ana metinleri çevirir,        */
/* uzun açıklamalar İngilizce'ye düşer (spread ile).                   */
/* ------------------------------------------------------------------ */

const TR = {
  nav: {
    work: "Projeler",
    services: "Hizmetler",
    social: "Sosyal Medya",
    programs: "Program Satışı",
    photo: "Fotoğrafçılık",
    web: "Web Tasarım",
    about: "Hakkımızda",
    contact: "İletişim",
  },
  hero: {
    line3: "Ajans",
    desc: "Kod, yapay zeka, otomasyon ve prodüksiyon. Markanız için özel tasarlanmış digital-first deneyimler — strateji, tasarım ve geliştirme tek çatı altında.",
    cta: "Projeni Başlat",
    explore: "Keşfet",
    copyright: "©2024–2026 — Ankara",
  },
  marquee: [
    "Kod",
    "Yapay Zeka",
    "Otomasyon",
    "Prodüksiyon",
    "Sosyal Medya",
    "Strateji",
    "UI/UX",
  ],
  fw: { label: "Hizmetlerimiz", t1: "Tüm", t2: "Hizmetlerimiz" },
  statement: {
    label: "Manifesto",
    text: "Tasarım ve kod sadece ifade araçlarıdır. Bizi farklı kılan insanlardır. 2024'ten beri markalar için anlamlı, yenilikçi ve sonuç odaklı dijital deneyimler üretiyoruz.",
    sub: "Kumbat Ajans olarak inovasyonu ve yaratıcılığı bir araya getirerek işletmelerin dijital dünyada öne çıkmasını sağlıyoruz. Sadece bir ajans değil — dijital dönüşüm partneriniz. Güncel işlerimiz için",
  },
  showcase: {
    label: "İşlerimizden",
    t1: "Web, Fotoğraf,",
    t2: "Prodüksiyon",
    t3: "Tek Çatıda",
    desc: "Web sitelerinden ürün fotoğrafçılığına, tanıtım filmlerinden sosyal medya içeriklerine — ürettiğimiz her iş markanızı bir adım öne taşır.",
    hint: "Kaydırmaya devam et →",
    big: "İşlerimiz — Kumbat® — İşlerimiz",
    panels: [
      { label: "Web Tasarım", title: "Randevu odaklı salon siteleri" },
      { label: "Fotoğrafçılık", title: "Ürün & mekan çekimleri" },
      { label: "Prodüksiyon", title: "4K tanıtım filmleri" },
      { label: "E-Ticaret", title: "Dönüşüm odaklı mağazalar" },
      { label: "Sosyal Medya", title: "Büyüme odaklı içerik" },
    ],
  },
  services: {
    label: "Hizmetler",
    t1: "Ne",
    t2: "Yapıyoruz",
    desc: "Stratejiden dağıtıma ve bakıma kadar — dijital tek durak noktanız. Her adımda yanınızdayız.",
    items: [
      {
        title: "Web & Mobil Geliştirme",
        desc: "React, Next.js ve Node.js ile kurumsal siteler, e-ticaret altyapıları ve mobil uygulamalar geliştiriyoruz. SEO uyumlu, hızlı ve mobil öncelikli — projeniz yayına girdikten sonra bakım ve güncelleme desteği de bizden.",
        tags: ["Full-Stack", "iOS/Android", "E-Ticaret", "SEO"],
      },
      {
        title: "Sosyal Medya Yönetimi",
        desc: "Instagram, TikTok, YouTube ve Facebook hesaplarınızı uçtan uca yönetiyoruz: aylık içerik planı, tasarım ve metin yazımı, Reels/Shorts üretimi, düzenli paylaşım, yorum/DM takibi. Hedefimiz takipçi sayısı değil, gerçek etkileşim ve müşteri kazanımı. Örnek işlerimiz: @codetech_kumbat",
        tags: ["Instagram", "TikTok", "YouTube", "Facebook"],
      },
      {
        title: "Program & Yazılım Satışı",
        desc: "İşletmenizin ihtiyacına uygun hazır yazılım çözümleri: randevu takip, stok ve adisyon programları, kasa/POS entegrasyonları, kurye ve sipariş takip sistemleri. Kurulum, personel eğitimi ve satış sonrası destek dahil. İhtiyacınıza tam uyan hazır çözüm yoksa size özel geliştiriyoruz.",
        tags: ["Randevu Takip", "Stok/Adisyon", "POS", "Kurulum & Destek"],
      },
      {
        title: "Yapay Zeka & Otomasyon",
        desc: "Playwright ile tekrarlayan iş süreçlerini otomatikleştiriyoruz: form doldurma, veri toplama, rapor çekme, stok takibi. Ayrıca işletmenize özel chatbot ve yapay zeka destekli içerik üretim akışları kuruyoruz.",
        tags: ["Playwright", "Chatbot", "Veri Toplama", "RPA"],
      },
      {
        title: "Fotoğrafçılık",
        desc: "Düğün, nişan, doğum günü, mezuniyet ve özel gün çekimleri; işletmeler için ürün, mekan ve menü fotoğrafçılığı; oyuncu ve mankenler için headshot, portfolyo ve self-tape çekimleri. Profesyonel ekipman, retouch dahil dijital teslim.",
        tags: ["Düğün", "Mezuniyet", "Headshot", "Self-Tape"],
      },
      {
        title: "Profesyonel Prodüksiyon",
        desc: "İşletme tanıtım filmleri, ürün videoları ve sosyal medya için dikey video içerikler. 4K çekim, kurgu, renk düzenleme ve ses miksajı dahil — teslimde yayına hazır dosyalar alırsınız.",
        tags: ["Tanıtım Filmi", "4K Çekim", "Kurgu", "Color Grading"],
      },
      {
        title: "Test Otomasyonu & QA",
        desc: "Playwright, Cypress ve Selenium ile uçtan uca test senaryoları yazıyor, CI/CD hattınıza entegre ediyoruz. Her sürümde siteniz otomatik test edilir; hatalar kullanıcıya ulaşmadan yakalanır.",
        tags: ["Playwright", "E2E", "Performans", "CI/CD"],
      },
      {
        title: "Dijital Strateji & SEO",
        desc: "Google'da bulunabilirlik için teknik SEO, anahtar kelime çalışması ve içerik stratejisi. Analitik kurulumuyla hangi kanaldan müşteri geldiğini ölçüyor, bütçenizi doğru yere yönlendiriyoruz.",
        tags: ["SEO", "Google Ads", "Analitik", "İçerik"],
      },
      {
        title: "Marka Kimliği & UI/UX",
        desc: "Logo, renk paleti, tipografi ve marka kitapçığı; uygulama ve siteler için kullanıcı deneyimi tasarımı. Markanız her kanalda aynı dili konuşur.",
        tags: ["Logo", "UI/UX", "Design System"],
      },
      {
        title: "İşletmeye Özel Müzik",
        desc: "Kafe, restoran, mağaza ve kurumsal mekanlar için markanıza özel arka plan müziği, jingle ve ses kimliği üretiyoruz. Telif derdi olmadan, mekanınızın atmosferine uygun lisanslı müzikler — günlük playlist yönetimi dahil.",
        tags: ["Jingle", "Ambient", "Marka Sesi", "Lisanslı"],
      },
    ],
  },
  photo: {
    label: "Fotoğrafçılık",
    t1: "Her Anınız",
    t2: "Kadraja Değer",
    desc: "Düğünden mezuniyete, ürün çekiminden kurumsal portreye — profesyonel ekipman ve deneyimli bakış açısıyla Ankara ve çevresinde çekim yapıyoruz.",
    note: "Tüm çekimlerde fotoğraflar profesyonel olarak seçilir, renk ve ışık düzenlemesi (retouch) yapılır ve dijital olarak teslim edilir. Tarih ve fiyat bilgisi için bize WhatsApp'tan ulaşın — çekim takvimimiz sınırlıdır.",
    noteCta: "Çekim Planla →",
    cats: [
      {
        name: "Düğün & Nişan",
        desc: "Hazırlıktan ilk dansa kadar gününüzün her anını belgeliyoruz. Dış çekim, salon çekimi ve save-the-date videoları; retouch edilmiş dijital albüm teslimiyle.",
        tags: ["Dış Çekim", "Salon", "Video"],
      },
      {
        name: "Doğum Günü & Etkinlik",
        desc: "Doğum günleri, baby shower, sünnet ve aile kutlamaları. Doğal anları yakalayan sade bir çekim tarzı; aynı gün paylaşımlık kareler seçeneği.",
        tags: ["Doğum Günü", "Baby Shower", "Kutlama"],
      },
      {
        name: "Mezuniyet",
        desc: "Kep atma, tören ve arkadaş grubu çekimleri. Okul bahçesinde veya dilediğiniz lokasyonda, bireysel ve grup kareleriyle mezuniyetinizi ölümsüzleştirin.",
        tags: ["Kep Atma", "Bireysel", "Grup"],
      },
      {
        name: "Ürün & Menü",
        desc: "E-ticaret ve restoranlar için stüdyo kalitesinde ürün fotoğrafları. Beyaz fon, yaşam tarzı (lifestyle) ve menü çekimleri; satışa hazır, web'e optimize teslim.",
        tags: ["E-Ticaret", "Menü", "Stüdyo"],
      },
      {
        name: "Kurumsal & Portre",
        desc: "LinkedIn ve web siteniz için profesyonel portreler, ekip ve ofis çekimleri. Markanızın yüzünü güvenilir ve güncel gösterin.",
        tags: ["Portre", "Ekip", "Ofis"],
      },
      {
        name: "Mekan & Emlak",
        desc: "Otel, kafe, salon ve satılık/kiralık mülkler için geniş açı mekan çekimleri. İç mekan aydınlatması ve düzenlemesiyle alanınızı en iyi haliyle gösterir.",
        tags: ["Otel/Kafe", "Emlak", "Geniş Açı"],
      },
      {
        name: "Oyuncu & Manken",
        desc: "Oyuncu ve mankenler için ajans standartlarında headshot, portfolyo ve self-tape çekimleri. Cast ajanslarına gönderime hazır kareler, profesyonel ışık ve video kaydı; yönlendirme bizden.",
        tags: ["Headshot", "Self-Tape", "Portfolyo", "Cast"],
      },
    ],
  },
  webdesign: {
    label: "Web Site Tasarımı",
    t1: "Sektörünüze Özel",
    t2: "Web Siteleri",
    desc: "Her sektörün ihtiyacı farklı. İşletmenize özel tasarlanmış, randevu ve satış odaklı web siteleri kuruyoruz — hazır şablon değil, size özel.",
    demo: "Canlı Demo →",
    quote: "Teklif Al →",
    viewStyles: "Stilleri Gör →",
    items: [
      {
        name: "Güzellik Salonu",
        desc: "Hizmet menüsü, öncesi/sonrası galerisi ve WhatsApp'tan tek tıkla randevu. Mobil öncelikli, zarif tasarım.",
      },
      {
        name: "Kuaför & Berber",
        desc: "Fiyat listesi, çalışma saatleri, ekip tanıtımı ve Google Haritalar entegrasyonu. Müşteriniz sizi kolayca bulur.",
      },
      {
        name: "Restoran & Kafe",
        desc: "QR menü, masa rezervasyonu ve yerel SEO ile 'yakınımdaki restoran' aramalarında öne çıkın.",
      },
      {
        name: "Diş Klinikleri",
        desc: "Tedavi açıklamaları, hekim profilleri ve online randevu formu. Hasta güveni kazandıran kurumsal görünüm.",
      },
      {
        name: "Fitness & Spor Salonu",
        desc: "Üyelik paketleri, haftalık ders programı, eğitmen tanıtımları ve deneme dersi kayıt formu.",
      },
      {
        name: "Emlak & İnşaat",
        desc: "Filtrelenebilir portföy vitrini, proje sayfaları, harita ve iletişim formu. İlanlarınız kendi sitenizde.",
      },
      {
        name: "E-Ticaret",
        desc: "Sepet, ödeme altyapısı ve kargo entegrasyonlu online mağaza. Hız ve dönüşüm odaklı kurulum.",
      },
      {
        name: "Avukatlık & Danışmanlık",
        desc: "Çalışma alanları, makale/blog bölümü ve SSS. Prestijli, güven veren kurumsal kimlik.",
      },
      {
        name: "İşletme & KOBİ",
        desc: "Hizmet tanıtımı, iletişim, referanslar ve WhatsApp entegrasyonu. Küçük ve orta ölçekli işletmeler için hızlı kurulum.",
      },
      {
        name: "Dersane & Eğitim Merkezi",
        desc: "Kurs programları, öğretmen kadrosu, deneme sınavı kayıtları ve veli bilgi formu. Veliler sizi kolayca bulur.",
      },
      {
        name: "Özel Okul & Kolej",
        desc: "Akademik programlar, kampüs tanıtımı, kayıt süreci ve etkinlik takvimi. Prestijli ve güven veren kurumsal site.",
      },
      {
        name: "Kurumsal & Büyük İşletmeler",
        desc: "Çok dilli yapı, departman sayfaları, kariyer portalı ve güçlü SEO. Markanıza yakışır kurumsal dijital vitrin.",
      },
    ],
  },
  process: {
    label: "Süreç",
    t1: "Nasıl",
    t2: "Çalışıyoruz",
    steps: [
      {
        title: "Keşif & Analiz",
        desc: "İşletmenizi, hedef kitlenizi ve pazar konumunuzu detaylıca inceliyoruz. Workshop'larla vizyonunuzu netleştiriyoruz.",
      },
      {
        title: "Strateji & Planlama",
        desc: "Veriye dayalı dijital strateji, proje roadmap'i ve bütçe planlaması yapıyoruz.",
      },
      {
        title: "Üretim & Uygulama",
        desc: "Tasarım, geliştirme ve içerik üretimini agile metodolojiyle yürütüyoruz. Haftalık demolarla ilerliyoruz.",
      },
      {
        title: "Optimizasyon & Destek",
        desc: "Sonuçları ölçüyor, A/B testleriyle optimize ediyoruz. 7/24 teknik destek ve bakım sunuyoruz.",
      },
    ],
    quote:
      "“Kumbat Ajans, sadece bir teknoloji partneri değil — işimizi büyütmemizi sağlayan stratejik bir ortak.”",
    quoteBy: "Ahmet Yılmaz",
    quoteRole: "CEO, TechNova",
  },
  contact: {
    label: "İletişim",
    t1: "Projeye",
    t2: "Başlayalım",
    location: "Ankara, Türkiye / Remote",
    formName: "Ad Soyad",
    formEmail: "E-Posta",
    formMsg: "Projeniz hakkında...",
    send: "WhatsApp ile Gönder →",
    sent: "İletildi ✓",
  },
  footer: {
    cta1: "Aklında bir proje mi var?",
    cta2: "Hayata geçirelim.",
    ctaBtn: "Konuşalım →",
    brandDesc: "Digital-first ajans. 2024'ten beri markaları geleceğe taşıyoruz.",
    colSite: "Site",
    colSocial: "Sosyal",
    rights: "© 2024–2026 Kumbat Ajans. Tüm hakları saklıdır.",
    location: "Ankara — Remote",
  },
  servicePage: {
    breadcrumb: "Hizmet",
    detailBtn: "Detayları Gör →",
    whatIncludes: "Neler Dahil",
    howWeWork: "Nasıl Çalışıyoruz",
    faqTitle: "Sık Sorulan Sorular",
    galleryTitle: "Örnek Çalışmalar",
    ctaTitle: "Bu hizmete mi ihtiyacınız var?",
    ctaBtn: "Teklif Alın →",
    liveDemo: "Canlı Demo →",
    allServices: "Tüm Hizmetler",
    next: "Sıradaki Hizmet",
  },
  styleHub: {
    back: "← Web Tasarım",
    title: "Stil Seçin",
    desc: "{sector} için 10 farklı tasarım stili. Birini seçin — boş şablon açılır, içeriği sonra Vercel'den bağlarsınız.",
    viewTemplate: "Şablonu Gör →",
    emptyShell: "Boş şablon",
    liveDemoMeta: "Canlı demo",
  },
  templateShell: {
    logo: "Logo",
    menu: "Menü",
    heroArea: "Hero alanı",
    card1: "Kart 1",
    card2: "Kart 2",
    card3: "Kart 3",
    visualArea: "Görsel alanı",
    ctaArea: "CTA alanı",
    footerArea: "Footer alanı",
  },
  about: {
    metaTitle: "Hakkımızda | Kumbat Ajans®",
    metaDesc:
      "Kumbat Ajans: 2024'ten beri Ankara merkezli digital-first ajans. Kod, yapay zeka, otomasyon ve prodüksiyon tek çatı altında.",
    label: "Hakkımızda",
    h1a: "Biz",
    h1b: "Kumbat",
    h1c: "Ajansız",
    p1: "2024'te Ankara'da kurulduk. Kod, yapay zeka, otomasyon ve prodüksiyonu tek çatı altında toplayan digital-first bir ajansız. Küçük ama üretken bir ekiple, her projeye özel yaklaşımla çalışıyoruz.",
    p2: "Web sitelerinden mobil uygulamalara, Playwright otomasyonlarından 4K tanıtım filmlerine, sosyal medya yönetiminden dijital stratejiye — markanızın dijitaldeki tüm ihtiyaçları için tek muhatapsınız.",
    p3prefix: "Güncel işlerimizi",
    p3suffix: "Instagram hesabımızda paylaşıyoruz.",
    valuesLabel: "Değerlerimiz",
    valuesTitle: "Bizi Farklı Kılan",
    values: [
      {
        num: "01",
        title: "İnsan Odaklı",
        desc: "Tasarım ve kod sadece araç. Bizi farklı kılan, her projeye insan gözüyle bakmamız.",
      },
      {
        num: "02",
        title: "Sonuç Odaklı",
        desc: "Güzel görünen değil, çalışan işler üretiriz. Her proje ölçülebilir hedeflerle başlar.",
      },
      {
        num: "03",
        title: "Şeffaf Süreç",
        desc: "Haftalık demolar, açık iletişim, net takvim. Ne aldığınızı her adımda bilirsiniz.",
      },
      {
        num: "04",
        title: "Teknoloji Tutkusu",
        desc: "Yapay zekadan otomasyona, en güncel araçları işinize değer katacak şekilde kullanırız.",
      },
    ],
    ctaTitle1: "Birlikte",
    ctaTitle2: "Üretelim",
    ctaBtn: "Projeye Başlayalım →",
    teamAlt: "Kumbat Ajans ekibi",
  },
  whatsapp: {
    ariaLabel: "WhatsApp ile ulaşın",
    defaultMsg: "Merhaba, projem hakkında bilgi almak istiyorum.",
  },
  styles: {
    premium: "Premium",
    klasik: "Klasik",
    elit: "Elit",
    standart: "Standart",
    dark: "Dark",
    eglenceli: "Eğlenceli",
    minimal: "Minimal",
    modern: "Modern",
    cesur: "Cesur",
    luks: "Lüks",
  },
};

type Dict = typeof TR;
export type { Dict };

const EN: Dict = {
  nav: {
    work: "Work",
    services: "Services",
    social: "Social Media",
    programs: "Software Sales",
    photo: "Photography",
    web: "Web Design",
    about: "About",
    contact: "Contact",
  },
  hero: {
    line3: "Agency",
    desc: "Code, AI, automation and production. Digital-first experiences crafted for your brand — strategy, design and development under one roof.",
    cta: "Start Your Project",
    explore: "Explore",
    copyright: "©2024–2026 — Ankara",
  },
  marquee: [
    "Code",
    "AI",
    "Automation",
    "Production",
    "Social Media",
    "Strategy",
    "UI/UX",
  ],
  fw: { label: "Our Services", t1: "All Our", t2: "Services" },
  statement: {
    label: "Manifesto",
    text: "Design and code are only means of expression. People are what set us apart. Since 2024 we've been crafting meaningful, innovative and results-driven digital experiences for brands.",
    sub: "At Kumbat Agency we bring innovation and creativity together to help businesses stand out in the digital world. Not just an agency — your digital transformation partner. For our latest work",
  },
  showcase: {
    label: "Our Work",
    t1: "Web, Photo,",
    t2: "Production",
    t3: "Under One Roof",
    desc: "From websites to product photography, promo films to social media content — every piece we craft pushes your brand one step ahead.",
    hint: "Keep scrolling →",
    big: "Our Work — Kumbat® — Our Work",
    panels: [
      { label: "Web Design", title: "Booking-first salon websites" },
      { label: "Photography", title: "Product & venue shoots" },
      { label: "Production", title: "4K promo films" },
      { label: "E-Commerce", title: "Conversion-driven stores" },
      { label: "Social Media", title: "Growth-focused content" },
    ],
  },
  services: {
    label: "Services",
    t1: "What",
    t2: "We Do",
    desc: "From strategy to launch and maintenance — your digital one-stop shop. With you at every step.",
    items: [
      {
        title: "Web & Mobile Development",
        desc: "We build corporate websites, e-commerce platforms and mobile apps with React, Next.js and Node.js. SEO-friendly, fast and mobile-first — with maintenance and updates after launch.",
        tags: ["Full-Stack", "iOS/Android", "E-Commerce", "SEO"],
      },
      {
        title: "Social Media Management",
        desc: "We manage your Instagram, TikTok, YouTube and Facebook accounts end to end: monthly content plans, design and copywriting, Reels/Shorts production, consistent posting, comment/DM handling. Our goal isn't follower counts — it's real engagement and customers. Sample work: @codetech_kumbat",
        tags: ["Instagram", "TikTok", "YouTube", "Facebook"],
      },
      {
        title: "Software & Program Sales",
        desc: "Ready-made software tailored to your business: appointment tracking, inventory and POS systems, courier and order tracking. Installation, staff training and after-sales support included. If nothing fits, we build custom.",
        tags: ["Appointments", "Inventory", "POS", "Setup & Support"],
      },
      {
        title: "AI & Automation",
        desc: "We automate repetitive workflows with Playwright: form filling, data collection, report generation, stock tracking. We also build custom chatbots and AI-assisted content pipelines.",
        tags: ["Playwright", "Chatbot", "Data Scraping", "RPA"],
      },
      {
        title: "Photography",
        desc: "Weddings, engagements, birthdays, graduations and special events; product, venue and menu photography for businesses; headshots, portfolio and self-tape shoots for actors and models. Professional gear, retouching included, digital delivery.",
        tags: ["Wedding", "Graduation", "Headshot", "Self-Tape"],
      },
      {
        title: "Professional Production",
        desc: "Promo films, product videos and vertical content for social media. 4K shooting, editing, color grading and sound mixing included — you receive publish-ready files.",
        tags: ["Promo Film", "4K Shoot", "Editing", "Color Grading"],
      },
      {
        title: "Test Automation & QA",
        desc: "We write end-to-end test scenarios with Playwright, Cypress and Selenium and integrate them into your CI/CD. Every release is tested automatically; bugs are caught before they reach users.",
        tags: ["Playwright", "E2E", "Performance", "CI/CD"],
      },
      {
        title: "Digital Strategy & SEO",
        desc: "Technical SEO, keyword research and content strategy for visibility on Google. With analytics in place, we measure which channel brings customers and direct your budget wisely.",
        tags: ["SEO", "Google Ads", "Analytics", "Content"],
      },
      {
        title: "Brand Identity & UI/UX",
        desc: "Logo, color palette, typography and brand book; user experience design for apps and websites. Your brand speaks one language everywhere.",
        tags: ["Logo", "UI/UX", "Design System"],
      },
      {
        title: "Custom Business Music",
        desc: "We produce custom background music, jingles and sonic identity for cafés, restaurants, stores and corporate spaces. Licensed tracks tailored to your brand atmosphere — with daily playlist management.",
        tags: ["Jingle", "Ambient", "Brand Sound", "Licensed"],
      },
    ],
  },
  photo: {
    label: "Photography",
    t1: "Every Moment",
    t2: "Deserves the Frame",
    desc: "From weddings to graduations, product shoots to corporate portraits — we shoot in and around Ankara with professional gear and an experienced eye.",
    note: "In every shoot, photos are professionally curated, color and light corrected (retouched) and delivered digitally. Reach us on WhatsApp for dates and pricing — our shooting calendar is limited.",
    noteCta: "Book a Shoot →",
    cats: [
      {
        name: "Wedding & Engagement",
        desc: "We document every moment of your day, from getting ready to the first dance. Outdoor and venue shoots plus save-the-date videos; retouched digital album delivery.",
        tags: ["Outdoor", "Venue", "Video"],
      },
      {
        name: "Birthday & Events",
        desc: "Birthdays, baby showers and family celebrations. A natural, candid shooting style; same-day social-ready shots available.",
        tags: ["Birthday", "Baby Shower", "Celebration"],
      },
      {
        name: "Graduation",
        desc: "Cap toss, ceremony and friend-group shoots. On campus or at a location of your choice — individual and group frames to immortalize your graduation.",
        tags: ["Cap Toss", "Individual", "Group"],
      },
      {
        name: "Product & Menu",
        desc: "Studio-grade product photos for e-commerce and restaurants. White background, lifestyle and menu shoots; delivered sales-ready and web-optimized.",
        tags: ["E-Commerce", "Menu", "Studio"],
      },
      {
        name: "Corporate & Portrait",
        desc: "Professional portraits for LinkedIn and your website, team and office shoots. Show your brand's face as trustworthy and current.",
        tags: ["Portrait", "Team", "Office"],
      },
      {
        name: "Venue & Real Estate",
        desc: "Wide-angle shoots for hotels, cafés, salons and properties for sale/rent. Interior lighting and staging show your space at its best.",
        tags: ["Hotel/Café", "Real Estate", "Wide Angle"],
      },
      {
        name: "Actor & Model",
        desc: "Agency-standard headshots, portfolio and self-tape shoots for actors and models. Casting-ready frames with professional lighting and video recording — direction included.",
        tags: ["Headshot", "Self-Tape", "Portfolio", "Casting"],
      },
    ],
  },
  webdesign: {
    label: "Website Design",
    t1: "Industry-Specific",
    t2: "Websites",
    desc: "Every industry has different needs. We build booking- and sales-focused websites tailored to your business — no templates, custom for you.",
    demo: "Live Demo →",
    quote: "Get a Quote →",
    viewStyles: "View Styles →",
    items: [
      {
        name: "Beauty Salon",
        desc: "Service menu, before/after gallery and one-tap WhatsApp booking. Mobile-first, elegant design.",
      },
      {
        name: "Hair & Barber",
        desc: "Price list, opening hours, team intro and Google Maps integration. Customers find you easily.",
      },
      {
        name: "Restaurant & Café",
        desc: "QR menu, table reservations and local SEO to rank for 'restaurants near me' searches.",
      },
      {
        name: "Dental Clinics",
        desc: "Treatment descriptions, doctor profiles and online booking form. A corporate look that builds patient trust.",
      },
      {
        name: "Fitness & Gym",
        desc: "Membership packages, weekly class schedule, trainer profiles and trial-class signup form.",
      },
      {
        name: "Real Estate & Construction",
        desc: "Filterable portfolio showcase, project pages, maps and contact form. Your listings on your own site.",
      },
      {
        name: "E-Commerce",
        desc: "Online store with cart, payment and shipping integrations. Built for speed and conversion.",
      },
      {
        name: "Law & Consulting",
        desc: "Practice areas, articles/blog and FAQ. A prestigious, trust-building corporate identity.",
      },
      {
        name: "Business & SME",
        desc: "Service showcase, contact, references and WhatsApp integration. Fast setup for small and medium businesses.",
      },
      {
        name: "Tutoring & Prep School",
        desc: "Course programs, teacher profiles, mock exam signups and parent inquiry forms. Parents find you easily.",
      },
      {
        name: "Private School & College",
        desc: "Academic programs, campus tour, enrollment process and event calendar. A prestigious, trust-building school site.",
      },
      {
        name: "Corporate & Enterprise",
        desc: "Multilingual structure, department pages, careers portal and strong SEO. A corporate digital presence that fits your brand.",
      },
    ],
  },
  process: {
    label: "Process",
    t1: "How",
    t2: "We Work",
    steps: [
      {
        title: "Discovery & Analysis",
        desc: "We study your business, audience and market position in depth. Workshops sharpen your vision.",
      },
      {
        title: "Strategy & Planning",
        desc: "Data-driven digital strategy, project roadmap and budget planning.",
      },
      {
        title: "Production & Delivery",
        desc: "Design, development and content production run on agile methodology. We progress with weekly demos.",
      },
      {
        title: "Optimization & Support",
        desc: "We measure results and optimize with A/B tests. 24/7 technical support and maintenance.",
      },
    ],
    quote:
      "“Kumbat Agency isn't just a tech partner — they're a strategic ally that helped us grow our business.”",
    quoteBy: "Ahmet Yılmaz",
    quoteRole: "CEO, TechNova",
  },
  contact: {
    label: "Contact",
    t1: "Let's Start",
    t2: "Your Project",
    location: "Ankara, Türkiye / Remote",
    formName: "Full Name",
    formEmail: "E-Mail",
    formMsg: "About your project...",
    send: "Send via WhatsApp →",
    sent: "Sent ✓",
  },
  footer: {
    cta1: "Got a project in mind?",
    cta2: "Let's make it real.",
    ctaBtn: "Let's Talk →",
    brandDesc: "Digital-first agency. Taking brands into the future since 2024.",
    colSite: "Site",
    colSocial: "Social",
    rights: "© 2024–2026 Kumbat Agency. All rights reserved.",
    location: "Ankara — Remote",
  },
  servicePage: {
    breadcrumb: "Service",
    detailBtn: "View Details →",
    whatIncludes: "What's Included",
    howWeWork: "How We Work",
    faqTitle: "Frequently Asked Questions",
    galleryTitle: "Sample Work",
    ctaTitle: "Need this service?",
    ctaBtn: "Get a Quote →",
    liveDemo: "Live Demo →",
    allServices: "All Services",
    next: "Next Service",
  },
  styleHub: {
    back: "← Web Design",
    title: "Choose a Style",
    desc: "10 different design styles for {sector}. Pick one — an empty template opens; connect content from Vercel later.",
    viewTemplate: "View Template →",
    emptyShell: "Empty template",
    liveDemoMeta: "Live demo",
  },
  templateShell: {
    logo: "Logo",
    menu: "Menu",
    heroArea: "Hero area",
    card1: "Card 1",
    card2: "Card 2",
    card3: "Card 3",
    visualArea: "Visual area",
    ctaArea: "CTA area",
    footerArea: "Footer area",
  },
  about: {
    metaTitle: "About | Kumbat Agency®",
    metaDesc:
      "Kumbat Agency: Ankara-based digital-first agency since 2024. Code, AI, automation and production under one roof.",
    label: "About",
    h1a: "We are",
    h1b: "Kumbat",
    h1c: "Agency",
    p1: "Founded in Ankara in 2024. We're a digital-first agency bringing code, AI, automation and production under one roof. A small, productive team with a bespoke approach to every project.",
    p2: "From websites to mobile apps, Playwright automation to 4K promo films, social media management to digital strategy — we're your single point of contact for all your brand's digital needs.",
    p3prefix: "We share our latest work on",
    p3suffix: "on our Instagram account.",
    valuesLabel: "Our Values",
    valuesTitle: "What Sets Us Apart",
    values: [
      {
        num: "01",
        title: "People First",
        desc: "Design and code are only tools. What sets us apart is the human eye we bring to every project.",
      },
      {
        num: "02",
        title: "Results Driven",
        desc: "We deliver work that works, not just work that looks good. Every project starts with measurable goals.",
      },
      {
        num: "03",
        title: "Transparent Process",
        desc: "Weekly demos, open communication, clear timelines. You know what you're getting at every step.",
      },
      {
        num: "04",
        title: "Tech Passion",
        desc: "From AI to automation, we use the latest tools to add real value to your business.",
      },
    ],
    ctaTitle1: "Let's",
    ctaTitle2: "Create Together",
    ctaBtn: "Start a Project →",
    teamAlt: "Kumbat Agency team",
  },
  whatsapp: {
    ariaLabel: "Contact via WhatsApp",
    defaultMsg: "Hello, I'd like to get information about my project.",
  },
  styles: {
    premium: "Premium",
    klasik: "Classic",
    elit: "Elite",
    standart: "Standard",
    dark: "Dark",
    eglenceli: "Playful",
    minimal: "Minimal",
    modern: "Modern",
    cesur: "Bold",
    luks: "Luxury",
  },
};

export const dictionaries = { TR, EN, DE, ES, FR, AR, ZH, RU };
export type Lang = keyof typeof dictionaries;

export const languages: { code: Lang; label: string }[] = [
  { code: "TR", label: "Türkçe" },
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
  { code: "AR", label: "العربية" },
  { code: "ZH", label: "中文" },
  { code: "RU", label: "Русский" },
];

/* ------------------------------------------------------------------ */

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  d: Dict;
}>({ lang: "TR", setLang: () => {}, d: TR });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("TR");

  useEffect(() => {
    const saved = localStorage.getItem("kumbat-lang");
    if (saved && saved in dictionaries) setLangState(saved as Lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("kumbat-lang", l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, d: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
