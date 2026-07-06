import type { Lang } from "./i18n";

export type ServiceContent = {
  title: string;
  tagline: string;
  intro: string[];
  features: { title: string; desc: string }[];
  steps: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
};

export type Service = {
  slug: string;
  navId?: string; // ana sayfadaki hizmet satırının id'si
  hero: string;
  gallery: string[];
  tags: string[];
  liveUrl?: string;
  tr: ServiceContent;
  en: ServiceContent;
};

export const services: Service[] = [
  {
    slug: "web-gelistirme",
    hero: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=85",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=85",
    ],
    tags: ["Next.js", "React", "Node.js", "iOS/Android", "SEO"],
    tr: {
      title: "Web & Mobil Geliştirme",
      tagline: "Hızlı, ölçeklenebilir ve satış odaklı dijital ürünler.",
      intro: [
        "Kurumsal siteler, e-ticaret altyapıları ve mobil uygulamaları React, Next.js ve Node.js ile geliştiriyoruz. Her proje mobil öncelikli tasarlanır, SEO uyumlu kodlanır ve saniyeler içinde açılır.",
        "Şablon kullanmıyoruz — işinize özel, büyümeye hazır bir mimari kuruyoruz. Yayına aldıktan sonra da bakım, güncelleme ve performans takibiyle yanınızdayız.",
      ],
      features: [
        { title: "Kurumsal Web Siteleri", desc: "Markanızı yansıtan, hızlı ve yönetilebilir siteler." },
        { title: "E-Ticaret", desc: "Sepet, ödeme ve kargo entegrasyonlu online mağazalar." },
        { title: "Mobil Uygulamalar", desc: "React Native ile iOS ve Android tek kod tabanında." },
        { title: "Web Uygulamaları", desc: "Panel, rezervasyon, üyelik sistemleri gibi özel çözümler." },
        { title: "SEO & Performans", desc: "Google'da öne çıkaran teknik altyapı ve hız optimizasyonu." },
        { title: "Bakım & Destek", desc: "Yayın sonrası güncelleme, izleme ve teknik destek." },
      ],
      steps: [
        { title: "Keşif", desc: "İhtiyaç ve hedefleri belirliyor, kapsamı netleştiriyoruz." },
        { title: "Tasarım", desc: "Mobil öncelikli arayüz ve kullanıcı akışını tasarlıyoruz." },
        { title: "Geliştirme", desc: "Temiz kod, haftalık demolar ve test süreçleriyle üretim." },
        { title: "Yayın & Destek", desc: "Canlıya alma, ölçüm ve sürekli iyileştirme." },
      ],
      faq: [
        { q: "Bir web sitesi ne kadar sürede biter?", a: "Kapsamına göre değişir; kurumsal bir site genellikle 2-4 hafta, e-ticaret ve uygulamalar 4-8 hafta arasında tamamlanır." },
        { q: "Hazır tema mı kullanıyorsunuz?", a: "Hayır. Her proje size özel tasarlanır ve kodlanır; bu hem hız hem de özgünlük kazandırır." },
        { q: "Yayından sonra destek veriyor musunuz?", a: "Evet, aylık bakım ve destek paketleriyle güncelleme, yedekleme ve izleme hizmeti sunuyoruz." },
      ],
    },
    en: {
      title: "Web & Mobile Development",
      tagline: "Fast, scalable and sales-focused digital products.",
      intro: [
        "We build corporate sites, e-commerce platforms and mobile apps with React, Next.js and Node.js. Every project is mobile-first, SEO-friendly and loads in seconds.",
        "No templates — we craft a custom, growth-ready architecture for your business. After launch we stay with you for maintenance, updates and performance monitoring.",
      ],
      features: [
        { title: "Corporate Websites", desc: "Fast, manageable sites that reflect your brand." },
        { title: "E-Commerce", desc: "Online stores with cart, payment and shipping integrations." },
        { title: "Mobile Apps", desc: "iOS and Android on a single codebase with React Native." },
        { title: "Web Applications", desc: "Custom dashboards, booking and membership systems." },
        { title: "SEO & Performance", desc: "Technical foundation and speed optimization for Google." },
        { title: "Maintenance & Support", desc: "Post-launch updates, monitoring and technical support." },
      ],
      steps: [
        { title: "Discovery", desc: "We define needs and goals and clarify the scope." },
        { title: "Design", desc: "We design a mobile-first interface and user flow." },
        { title: "Development", desc: "Clean code, weekly demos and testing." },
        { title: "Launch & Support", desc: "Go-live, measurement and continuous improvement." },
      ],
      faq: [
        { q: "How long does a website take?", a: "Depends on scope; a corporate site usually takes 2-4 weeks, e-commerce and apps 4-8 weeks." },
        { q: "Do you use ready-made themes?", a: "No. Every project is custom designed and coded, for both speed and originality." },
        { q: "Do you provide support after launch?", a: "Yes, with monthly maintenance packages covering updates, backups and monitoring." },
      ],
    },
  },
  {
    slug: "sosyal-medya",
    navId: "sosyal-medya",
    hero: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1567443024551-f3e3cc2be870?w=1200&q=80",
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80",
      "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=1200&q=80",
    ],
    tags: ["Instagram", "TikTok", "YouTube", "Facebook", "Reels"],
    tr: {
      title: "Sosyal Medya Yönetimi",
      tagline: "Takipçi değil, gerçek müşteri kazandıran içerik.",
      intro: [
        "Instagram, TikTok, YouTube ve Facebook hesaplarınızı uçtan uca yönetiyoruz. Aylık içerik planı, tasarım, metin yazımı, Reels/Shorts üretimi ve düzenli paylaşımla markanızı canlı tutuyoruz.",
        "Hedefimiz boş takipçi sayısı değil; etkileşim, bilinirlik ve satış. Örnek işlerimizi @codetech_kumbat hesabında görebilirsiniz.",
      ],
      features: [
        { title: "İçerik Planlama", desc: "Aylık takvim, konu ve kampanya planı." },
        { title: "Tasarım & Metin", desc: "Marka diline uygun görsel ve yazı üretimi." },
        { title: "Reels & Shorts", desc: "Dikey video çekim, kurgu ve trend takibi." },
        { title: "Topluluk Yönetimi", desc: "Yorum ve DM takibi, kullanıcı etkileşimi." },
        { title: "Reklam Yönetimi", desc: "Meta ve TikTok reklamlarıyla hedefli büyüme." },
        { title: "Raporlama", desc: "Aylık performans raporu ve strateji güncellemesi." },
      ],
      steps: [
        { title: "Analiz", desc: "Hesabınızı, rakipleri ve hedef kitleyi inceliyoruz." },
        { title: "Strateji", desc: "İçerik yönü, ton ve paylaşım takvimi belirleniyor." },
        { title: "Üretim", desc: "Tasarım, video ve metinleri hazırlayıp paylaşıyoruz." },
        { title: "Ölçüm", desc: "Sonuçları raporluyor, stratejiyi optimize ediyoruz." },
      ],
      faq: [
        { q: "Kaç paylaşım yapıyorsunuz?", a: "Pakete göre haftalık 3-5 gönderi ve düzenli hikaye/Reels üretimi tipik bir başlangıçtır." },
        { q: "İçerikleri siz mi çekiyorsunuz?", a: "Evet, gerektiğinde çekim ve prodüksiyon da bizden; ürün/mekan görselleri için sahaya geliyoruz." },
        { q: "Reklam bütçesi dahil mi?", a: "Reklam bütçesi ayrıdır; biz kampanyayı kurar, yönetir ve optimize ederiz." },
      ],
    },
    en: {
      title: "Social Media Management",
      tagline: "Content that wins real customers, not empty follows.",
      intro: [
        "We manage your Instagram, TikTok, YouTube and Facebook accounts end to end. Monthly content plans, design, copywriting, Reels/Shorts production and consistent posting keep your brand alive.",
        "Our goal isn't vanity follower counts — it's engagement, awareness and sales. See sample work on @codetech_kumbat.",
      ],
      features: [
        { title: "Content Planning", desc: "Monthly calendar, topics and campaign plan." },
        { title: "Design & Copy", desc: "Visuals and copy that match your brand voice." },
        { title: "Reels & Shorts", desc: "Vertical video shooting, editing and trend tracking." },
        { title: "Community", desc: "Comment and DM handling, user engagement." },
        { title: "Ad Management", desc: "Targeted growth via Meta and TikTok ads." },
        { title: "Reporting", desc: "Monthly performance report and strategy update." },
      ],
      steps: [
        { title: "Analysis", desc: "We study your account, competitors and audience." },
        { title: "Strategy", desc: "We set content direction, tone and posting calendar." },
        { title: "Production", desc: "We create and publish design, video and copy." },
        { title: "Measurement", desc: "We report results and optimize the strategy." },
      ],
      faq: [
        { q: "How often do you post?", a: "Depending on the package, 3-5 posts a week plus regular stories/Reels is a typical start." },
        { q: "Do you shoot the content?", a: "Yes, we handle shooting and production when needed and come on-site for product/venue visuals." },
        { q: "Is ad budget included?", a: "Ad budget is separate; we set up, manage and optimize the campaigns." },
      ],
    },
  },
  {
    slug: "program-satis",
    navId: "program-satis",
    hero: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80",
    ],
    tags: ["Randevu", "Stok/Adisyon", "POS", "Kurye Takip"],
    tr: {
      title: "Program & Yazılım Satışı",
      tagline: "İşletmenizi kolaylaştıran hazır ve özel yazılımlar.",
      intro: [
        "İşletmenizin ihtiyacına uygun hazır yazılım çözümleri sunuyoruz: randevu takip, stok ve adisyon programları, kasa/POS entegrasyonları, kurye ve sipariş takip sistemleri.",
        "Kurulum, personel eğitimi ve satış sonrası destek dahildir. İhtiyacınıza tam uyan hazır bir çözüm yoksa size özel geliştiriyoruz.",
      ],
      features: [
        { title: "Randevu Sistemleri", desc: "Salon, klinik ve hizmet işletmeleri için randevu takibi." },
        { title: "Stok & Adisyon", desc: "Restoran ve kafeler için adisyon, stok ve masa yönetimi." },
        { title: "POS & Kasa", desc: "Ödeme terminali ve kasa entegrasyonları." },
        { title: "Sipariş & Kurye", desc: "Sipariş alma ve kurye/teslimat takibi." },
        { title: "Kurulum & Eğitim", desc: "Sistem kurulumu ve personel eğitimi." },
        { title: "Özel Yazılım", desc: "İhtiyacınıza özel geliştirme seçeneği." },
      ],
      steps: [
        { title: "İhtiyaç Analizi", desc: "İşleyişinizi dinliyor, doğru çözümü belirliyoruz." },
        { title: "Kurulum", desc: "Yazılımı kuruyor, verilerinizi aktarıyoruz." },
        { title: "Eğitim", desc: "Ekibinize kullanımını uygulamalı anlatıyoruz." },
        { title: "Destek", desc: "Sorularınız ve güncellemeler için yanınızdayız." },
      ],
      faq: [
        { q: "Kendi programımı kurabilir misiniz?", a: "Evet, kullandığınız sistemi entegre edebilir veya sıfırdan size özel çözüm geliştirebiliriz." },
        { q: "Eğitim veriyor musunuz?", a: "Kesinlikle. Kurulum sonrası personelinize uygulamalı eğitim ve kullanım dökümanı sağlıyoruz." },
        { q: "Destek ne kadar sürüyor?", a: "Satış sonrası destek pakete dahildir; ihtiyaç halinde uzatılabilir bakım anlaşması yapıyoruz." },
      ],
    },
    en: {
      title: "Software & Program Sales",
      tagline: "Ready-made and custom software that simplifies your business.",
      intro: [
        "We offer ready-made software tailored to your business: appointment tracking, inventory and order systems, POS integrations, courier and order tracking.",
        "Installation, staff training and after-sales support are included. If nothing fits perfectly, we build custom for you.",
      ],
      features: [
        { title: "Appointment Systems", desc: "Booking for salons, clinics and service businesses." },
        { title: "Inventory & Orders", desc: "Order, stock and table management for restaurants and cafés." },
        { title: "POS & Checkout", desc: "Payment terminal and cash register integrations." },
        { title: "Orders & Courier", desc: "Order intake and courier/delivery tracking." },
        { title: "Setup & Training", desc: "System installation and staff training." },
        { title: "Custom Software", desc: "Bespoke development option for your needs." },
      ],
      steps: [
        { title: "Needs Analysis", desc: "We listen to your workflow and pick the right solution." },
        { title: "Setup", desc: "We install the software and migrate your data." },
        { title: "Training", desc: "We give your team hands-on training." },
        { title: "Support", desc: "We're here for questions and updates." },
      ],
      faq: [
        { q: "Can you set up my own program?", a: "Yes, we can integrate your existing system or build a custom solution from scratch." },
        { q: "Do you provide training?", a: "Absolutely. We provide hands-on staff training and usage docs after setup." },
        { q: "How long does support last?", a: "After-sales support is included in the package; extendable maintenance agreements are available." },
      ],
    },
  },
  {
    slug: "yapay-zeka",
    hero: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80",
    ],
    tags: ["Playwright", "Chatbot", "RPA", "AI"],
    tr: {
      title: "Yapay Zeka & Otomasyon",
      tagline: "Tekrarlayan işleri robota devredin, zaman kazanın.",
      intro: [
        "Playwright ile tekrarlayan iş süreçlerini otomatikleştiriyoruz: form doldurma, veri toplama, rapor çekme, stok takibi gibi işleri robota devrediyoruz.",
        "Ayrıca işletmenize özel chatbot ve yapay zeka destekli içerik üretim akışları kuruyoruz — 7/24 çalışan, hata yapmayan dijital asistanlar.",
      ],
      features: [
        { title: "Süreç Otomasyonu", desc: "Form, rapor ve veri işlerini otomatikleştirme." },
        { title: "Veri Toplama", desc: "Web'den düzenli, yapılandırılmış veri çekme." },
        { title: "Chatbot", desc: "Müşteri sorularını yanıtlayan akıllı asistanlar." },
        { title: "AI İçerik", desc: "Metin ve görsel üretiminde yapay zeka akışları." },
        { title: "Entegrasyon", desc: "Mevcut sistemlerinizle otomatik veri akışı." },
        { title: "Raporlama Botları", desc: "Otomatik periyodik rapor ve bildirimler." },
      ],
      steps: [
        { title: "Süreç Tespiti", desc: "Otomatikleştirilecek tekrarlayan işleri belirliyoruz." },
        { title: "Tasarım", desc: "Otomasyon akışını ve kuralları planlıyoruz." },
        { title: "Geliştirme", desc: "Botları kuruyor, test ediyoruz." },
        { title: "İzleme", desc: "Çalışmayı izliyor, gerektiğinde iyileştiriyoruz." },
      ],
      faq: [
        { q: "Hangi işler otomatikleştirilebilir?", a: "Kural bazlı, tekrarlayan her iş: veri girişi, rapor çekme, fiyat takibi, form doldurma ve daha fazlası." },
        { q: "Mevcut sistemimle çalışır mı?", a: "Genellikle evet; web tabanlı veya API'si olan çoğu sistemle entegre olabiliyoruz." },
        { q: "Bot bozulursa ne olur?", a: "İzleme ve bakım hizmetiyle hataları hızlı yakalayıp düzeltiyoruz." },
      ],
    },
    en: {
      title: "AI & Automation",
      tagline: "Hand repetitive work to robots, save time.",
      intro: [
        "We automate repetitive workflows with Playwright: form filling, data collection, report generation and stock tracking are handed to robots.",
        "We also build custom chatbots and AI-assisted content pipelines — digital assistants that work 24/7 without mistakes.",
      ],
      features: [
        { title: "Process Automation", desc: "Automating forms, reports and data tasks." },
        { title: "Data Scraping", desc: "Regular, structured data collection from the web." },
        { title: "Chatbot", desc: "Smart assistants that answer customer questions." },
        { title: "AI Content", desc: "AI pipelines for text and image generation." },
        { title: "Integration", desc: "Automated data flow with your existing systems." },
        { title: "Reporting Bots", desc: "Automatic periodic reports and alerts." },
      ],
      steps: [
        { title: "Process Mapping", desc: "We identify repetitive tasks to automate." },
        { title: "Design", desc: "We plan the automation flow and rules." },
        { title: "Development", desc: "We build and test the bots." },
        { title: "Monitoring", desc: "We monitor and improve as needed." },
      ],
      faq: [
        { q: "What can be automated?", a: "Any rule-based, repetitive task: data entry, report pulling, price tracking, form filling and more." },
        { q: "Does it work with my system?", a: "Usually yes; we integrate with most web-based or API-enabled systems." },
        { q: "What if the bot breaks?", a: "With monitoring and maintenance we catch and fix issues quickly." },
      ],
    },
  },
  {
    slug: "fotografcilik",
    navId: undefined,
    hero: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    ],
    tags: ["Düğün", "Headshot", "Self-Tape", "Ürün"],
    tr: {
      title: "Fotoğrafçılık",
      tagline: "Her anı ve her ürünü en iyi haliyle kadraja alıyoruz.",
      intro: [
        "Düğün, nişan, doğum günü, mezuniyet ve özel gün çekimleri; işletmeler için ürün, mekan ve menü fotoğrafçılığı; oyuncu ve mankenler için headshot, portfolyo ve self-tape çekimleri yapıyoruz.",
        "Profesyonel ekipman, deneyimli bakış açısı ve retouch dahil dijital teslim. Ankara ve çevresinde çekim yapıyoruz.",
      ],
      features: [
        { title: "Düğün & Nişan", desc: "Hazırlıktan ilk dansa kadar gününüzün her anı." },
        { title: "Doğum Günü & Etkinlik", desc: "Doğal, samimi anları yakalayan çekimler." },
        { title: "Mezuniyet", desc: "Bireysel ve grup kareleri, kep atma çekimi." },
        { title: "Ürün & Menü", desc: "E-ticaret ve restoranlar için stüdyo çekimleri." },
        { title: "Oyuncu & Manken", desc: "Ajans standardında headshot, portfolyo ve self-tape." },
        { title: "Kurumsal & Mekan", desc: "Portre, ekip, ofis ve mekan çekimleri." },
      ],
      steps: [
        { title: "Planlama", desc: "Konsept, lokasyon ve tarih belirleniyor." },
        { title: "Çekim", desc: "Profesyonel ekipman ve yönlendirmeyle çekim." },
        { title: "Seçim & Retouch", desc: "En iyi kareler seçilip renk/ışık düzenleniyor." },
        { title: "Teslim", desc: "Yüksek çözünürlüklü dijital teslim." },
      ],
      faq: [
        { q: "Çekim nerede yapılıyor?", a: "Stüdyoda, dilediğiniz lokasyonda veya işletmenizde; ihtiyaca göre planlıyoruz." },
        { q: "Fotoğraflar ne zaman teslim edilir?", a: "Çekim türüne göre birkaç gün ile bir hafta arasında retouch edilmiş şekilde teslim ediyoruz." },
        { q: "Self-tape nedir?", a: "Oyuncuların casting başvuruları için kaydedilen, profesyonel ışık ve ses ile çekilen video denemeleridir." },
      ],
    },
    en: {
      title: "Photography",
      tagline: "We frame every moment and every product at its best.",
      intro: [
        "We shoot weddings, engagements, birthdays, graduations and special events; product, venue and menu photography for businesses; and headshots, portfolio and self-tape shoots for actors and models.",
        "Professional gear, an experienced eye and retouching included with digital delivery. We shoot in and around Ankara.",
      ],
      features: [
        { title: "Wedding & Engagement", desc: "Every moment from getting ready to the first dance." },
        { title: "Birthday & Events", desc: "Natural, candid shots of your celebrations." },
        { title: "Graduation", desc: "Individual and group frames, cap-toss shots." },
        { title: "Product & Menu", desc: "Studio shoots for e-commerce and restaurants." },
        { title: "Actor & Model", desc: "Agency-standard headshots, portfolio and self-tape." },
        { title: "Corporate & Venue", desc: "Portraits, team, office and venue shoots." },
      ],
      steps: [
        { title: "Planning", desc: "We set the concept, location and date." },
        { title: "Shoot", desc: "Shooting with professional gear and direction." },
        { title: "Selection & Retouch", desc: "Best frames selected and color/light corrected." },
        { title: "Delivery", desc: "High-resolution digital delivery." },
      ],
      faq: [
        { q: "Where do shoots take place?", a: "In the studio, at a location of your choice or your business; we plan around your needs." },
        { q: "When are photos delivered?", a: "Depending on the shoot, we deliver retouched images within a few days to a week." },
        { q: "What is a self-tape?", a: "Professional video auditions for actors' casting applications, shot with proper lighting and sound." },
      ],
    },
  },
  {
    slug: "produksiyon",
    hero: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
      "https://images.unsplash.com/photo-1500210600161-1e5e5f6cf5e1?w=1200&q=80",
    ],
    tags: ["Tanıtım Filmi", "4K", "Kurgu", "Color Grading"],
    tr: {
      title: "Profesyonel Prodüksiyon",
      tagline: "Markanızı ekranda premium gösteren video prodüksiyon.",
      intro: [
        "İşletme tanıtım filmleri, ürün videoları ve sosyal medya için dikey video içerikler üretiyoruz. 4K çekim, kurgu, renk düzenleme ve ses miksajı dahil.",
        "Senaryodan yayına uçtan uca yürütüyoruz; teslimde yayına hazır, platforma optimize dosyalar alırsınız.",
      ],
      features: [
        { title: "Tanıtım Filmi", desc: "Kurumsal ve marka tanıtım filmleri." },
        { title: "Ürün Videosu", desc: "Ürünlerinizi öne çıkaran çekimler." },
        { title: "Sosyal Medya Videosu", desc: "Reels/Shorts için dikey içerikler." },
        { title: "Kurgu & Montaj", desc: "Profesyonel kurgu ve ritim." },
        { title: "Color Grading", desc: "Sinematik renk düzenlemesi." },
        { title: "Ses & Müzik", desc: "Ses miksajı ve müzik seçimi." },
      ],
      steps: [
        { title: "Senaryo", desc: "Hikaye ve çekim planını hazırlıyoruz." },
        { title: "Çekim", desc: "Profesyonel ekip ve ekipmanla çekim." },
        { title: "Post-Prodüksiyon", desc: "Kurgu, renk, ses ve grafik." },
        { title: "Teslim", desc: "Platforma optimize final dosyalar." },
      ],
      faq: [
        { q: "Drone çekimi yapıyor musunuz?", a: "Evet, ihtiyaç halinde drone ve özel ekipmanla havadan çekimler de yapıyoruz." },
        { q: "Senaryoyu siz mi yazıyorsunuz?", a: "İsterseniz komple senaryo ve storyboard'u biz hazırlıyoruz." },
        { q: "Teslim formatı nedir?", a: "Kullanacağınız platforma göre (Instagram, YouTube, TV) optimize edilmiş formatlarda teslim ediyoruz." },
      ],
    },
    en: {
      title: "Professional Production",
      tagline: "Video production that makes your brand look premium.",
      intro: [
        "We produce promo films, product videos and vertical content for social media. 4K shooting, editing, color grading and sound mixing included.",
        "We run it end to end from script to publish; you receive publish-ready, platform-optimized files.",
      ],
      features: [
        { title: "Promo Film", desc: "Corporate and brand promo films." },
        { title: "Product Video", desc: "Shoots that highlight your products." },
        { title: "Social Media Video", desc: "Vertical content for Reels/Shorts." },
        { title: "Editing", desc: "Professional editing and rhythm." },
        { title: "Color Grading", desc: "Cinematic color grading." },
        { title: "Sound & Music", desc: "Sound mixing and music selection." },
      ],
      steps: [
        { title: "Script", desc: "We prepare the story and shot plan." },
        { title: "Shoot", desc: "Shooting with a professional crew and gear." },
        { title: "Post-Production", desc: "Editing, color, sound and graphics." },
        { title: "Delivery", desc: "Platform-optimized final files." },
      ],
      faq: [
        { q: "Do you do drone shots?", a: "Yes, we do aerial shots with drones and special gear when needed." },
        { q: "Do you write the script?", a: "If you like, we prepare the full script and storyboard." },
        { q: "What's the delivery format?", a: "We deliver in formats optimized for your platform (Instagram, YouTube, TV)." },
      ],
    },
  },
  {
    slug: "test-otomasyonu",
    hero: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&q=80",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80",
    ],
    tags: ["Playwright", "Cypress", "E2E", "CI/CD"],
    tr: {
      title: "Test Otomasyonu & QA",
      tagline: "Hatalar kullanıcıya ulaşmadan yakalansın.",
      intro: [
        "Playwright, Cypress ve Selenium ile uçtan uca test senaryoları yazıyor, CI/CD hattınıza entegre ediyoruz. Her sürümde siteniz otomatik test edilir.",
        "Böylece hatalar kullanıcıya ulaşmadan yakalanır; güncellemeler güvenle yayına alınır.",
      ],
      features: [
        { title: "E2E Testler", desc: "Kullanıcı akışlarını uçtan uca test etme." },
        { title: "Regresyon Testi", desc: "Yeni sürümlerde eski özelliklerin korunması." },
        { title: "Performans Testi", desc: "Hız ve yük altında davranış ölçümü." },
        { title: "CI/CD Entegrasyonu", desc: "Her deploy'da otomatik test çalıştırma." },
        { title: "Görsel Test", desc: "Arayüzdeki beklenmedik değişiklikleri yakalama." },
        { title: "Raporlama", desc: "Net, anlaşılır test raporları." },
      ],
      steps: [
        { title: "Kapsam", desc: "Kritik akışları ve test hedeflerini belirliyoruz." },
        { title: "Senaryo Yazımı", desc: "Otomatik test senaryolarını kodluyoruz." },
        { title: "Entegrasyon", desc: "CI/CD hattına test adımlarını ekliyoruz." },
        { title: "Bakım", desc: "Testleri güncel tutuyor, raporluyoruz." },
      ],
      faq: [
        { q: "Mevcut projeme entegre olur mu?", a: "Evet, çoğu modern web ve mobil projeye test otomasyonu ekleyebiliyoruz." },
        { q: "Hangi araçları kullanıyorsunuz?", a: "Ağırlıklı Playwright ve Cypress; ihtiyaca göre Selenium ve özel framework'ler." },
        { q: "Manuel test de yapıyor musunuz?", a: "Evet, otomasyonun yanında keşif ve manuel QA hizmeti de sunuyoruz." },
      ],
    },
    en: {
      title: "Test Automation & QA",
      tagline: "Catch bugs before they reach users.",
      intro: [
        "We write end-to-end test scenarios with Playwright, Cypress and Selenium and integrate them into your CI/CD. Every release is tested automatically.",
        "So bugs are caught before reaching users; updates go live with confidence.",
      ],
      features: [
        { title: "E2E Tests", desc: "Testing user flows end to end." },
        { title: "Regression", desc: "Preserving old features in new releases." },
        { title: "Performance Test", desc: "Behavior measurement under speed and load." },
        { title: "CI/CD Integration", desc: "Running tests automatically on every deploy." },
        { title: "Visual Testing", desc: "Catching unexpected UI changes." },
        { title: "Reporting", desc: "Clear, understandable test reports." },
      ],
      steps: [
        { title: "Scope", desc: "We define critical flows and test goals." },
        { title: "Scenario Writing", desc: "We code automated test scenarios." },
        { title: "Integration", desc: "We add test steps to the CI/CD pipeline." },
        { title: "Maintenance", desc: "We keep tests up to date and report." },
      ],
      faq: [
        { q: "Does it fit my existing project?", a: "Yes, we can add test automation to most modern web and mobile projects." },
        { q: "Which tools do you use?", a: "Mostly Playwright and Cypress; Selenium and custom frameworks as needed." },
        { q: "Do you do manual testing too?", a: "Yes, we offer exploratory and manual QA alongside automation." },
      ],
    },
  },
  {
    slug: "dijital-strateji",
    hero: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
    ],
    tags: ["SEO", "Google Ads", "Analitik", "İçerik"],
    tr: {
      title: "Dijital Strateji & SEO",
      tagline: "Doğru kitleye, doğru kanaldan ulaşın.",
      intro: [
        "Google'da bulunabilirlik için teknik SEO, anahtar kelime çalışması ve içerik stratejisi kuruyoruz. Analitik kurulumuyla hangi kanaldan müşteri geldiğini ölçüyoruz.",
        "Bütçenizi tahmine değil veriye göre yönlendiriyor, sürekli ölçüp iyileştiriyoruz.",
      ],
      features: [
        { title: "Teknik SEO", desc: "Site hızı, yapı ve indekslenme optimizasyonu." },
        { title: "Anahtar Kelime", desc: "Hedef kitlenizin aradığı kelimeleri bulma." },
        { title: "İçerik Stratejisi", desc: "Arama niyetine uygun içerik planı." },
        { title: "Google Ads", desc: "Hedefli reklam kampanyaları." },
        { title: "Analitik", desc: "GA4 kurulumu ve dönüşüm takibi." },
        { title: "Raporlama", desc: "Anlaşılır aylık performans raporları." },
      ],
      steps: [
        { title: "Denetim", desc: "Mevcut durumu ve rakipleri analiz ediyoruz." },
        { title: "Strateji", desc: "Anahtar kelime ve içerik planını kuruyoruz." },
        { title: "Uygulama", desc: "SEO ve reklam çalışmalarını hayata geçiriyoruz." },
        { title: "Ölçüm", desc: "Sonuçları izleyip optimize ediyoruz." },
      ],
      faq: [
        { q: "SEO sonuçları ne zaman görülür?", a: "SEO orta-uzun vadeli bir yatırımdır; genellikle 3-6 ayda belirgin sonuç alınır." },
        { q: "Reklam mı SEO mu?", a: "İkisi birlikte en iyi sonucu verir: reklam hızlı, SEO kalıcı trafik sağlar." },
        { q: "Rapor veriyor musunuz?", a: "Evet, aylık net raporlarla hangi kelimede yükseldiğinizi ve dönüşümleri paylaşıyoruz." },
      ],
    },
    en: {
      title: "Digital Strategy & SEO",
      tagline: "Reach the right audience through the right channel.",
      intro: [
        "We set up technical SEO, keyword research and content strategy for visibility on Google. With analytics in place we measure which channel brings customers.",
        "We direct your budget by data, not guesses, and measure and improve continuously.",
      ],
      features: [
        { title: "Technical SEO", desc: "Site speed, structure and indexing optimization." },
        { title: "Keywords", desc: "Finding the terms your audience searches for." },
        { title: "Content Strategy", desc: "Content plan aligned with search intent." },
        { title: "Google Ads", desc: "Targeted ad campaigns." },
        { title: "Analytics", desc: "GA4 setup and conversion tracking." },
        { title: "Reporting", desc: "Clear monthly performance reports." },
      ],
      steps: [
        { title: "Audit", desc: "We analyze the current state and competitors." },
        { title: "Strategy", desc: "We build the keyword and content plan." },
        { title: "Execution", desc: "We roll out SEO and ad work." },
        { title: "Measurement", desc: "We track results and optimize." },
      ],
      faq: [
        { q: "When do SEO results show?", a: "SEO is a mid-to-long term investment; clear results typically come in 3-6 months." },
        { q: "Ads or SEO?", a: "Both work best together: ads bring fast traffic, SEO brings lasting traffic." },
        { q: "Do you report?", a: "Yes, with clear monthly reports on rankings and conversions." },
      ],
    },
  },
  {
    slug: "marka-kimligi",
    hero: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
    ],
    tags: ["Logo", "UI/UX", "Design System"],
    tr: {
      title: "Marka Kimliği & UI/UX",
      tagline: "Markanız her kanalda aynı dili konuşsun.",
      intro: [
        "Logo, renk paleti, tipografi ve marka kitapçığı hazırlıyoruz; uygulama ve siteler için kullanıcı deneyimi tasarlıyoruz.",
        "Tutarlı bir görsel kimlikle markanız her yerde profesyonel ve tanınabilir görünür.",
      ],
      features: [
        { title: "Logo Tasarımı", desc: "Özgün, akılda kalıcı logo ve varyasyonları." },
        { title: "Marka Kitapçığı", desc: "Renk, tipografi ve kullanım kuralları." },
        { title: "UI Tasarımı", desc: "Modern, kullanışlı arayüz tasarımı." },
        { title: "UX Akışı", desc: "Kullanıcı yolculuğu ve deneyim tasarımı." },
        { title: "Design System", desc: "Yeniden kullanılabilir bileşen kütüphanesi." },
        { title: "Sosyal Medya Kiti", desc: "Şablonlar ve görsel dil rehberi." },
      ],
      steps: [
        { title: "Keşif", desc: "Marka değerlerini ve hedef kitleyi anlıyoruz." },
        { title: "Konsept", desc: "Görsel yön ve alternatifleri sunuyoruz." },
        { title: "Tasarım", desc: "Seçilen yönü detaylandırıp uyguluyoruz." },
        { title: "Teslim", desc: "Tüm dosyalar ve marka rehberi ile teslim." },
      ],
      faq: [
        { q: "Sadece logo yaptırabilir miyim?", a: "Elbette; sadece logo veya komple marka kimliği paketi seçebilirsiniz." },
        { q: "Kaç revizyon hakkım var?", a: "Paketlere göre değişir; genelde her aşamada birkaç revizyon turu dahildir." },
        { q: "Dosyaları hangi formatta alırım?", a: "Baskı ve dijital için tüm formatlarda (vektörel dahil) teslim ediyoruz." },
      ],
    },
    en: {
      title: "Brand Identity & UI/UX",
      tagline: "Let your brand speak one language everywhere.",
      intro: [
        "We create logos, color palettes, typography and brand books; and design user experiences for apps and websites.",
        "With a consistent visual identity your brand looks professional and recognizable everywhere.",
      ],
      features: [
        { title: "Logo Design", desc: "Original, memorable logo and its variations." },
        { title: "Brand Book", desc: "Color, typography and usage guidelines." },
        { title: "UI Design", desc: "Modern, usable interface design." },
        { title: "UX Flow", desc: "User journey and experience design." },
        { title: "Design System", desc: "Reusable component library." },
        { title: "Social Media Kit", desc: "Templates and visual language guide." },
      ],
      steps: [
        { title: "Discovery", desc: "We understand brand values and audience." },
        { title: "Concept", desc: "We present a visual direction and alternatives." },
        { title: "Design", desc: "We refine and apply the chosen direction." },
        { title: "Delivery", desc: "Delivered with all files and a brand guide." },
      ],
      faq: [
        { q: "Can I get just a logo?", a: "Of course; you can choose just a logo or a full brand identity package." },
        { q: "How many revisions do I get?", a: "Depends on the package; usually a few revision rounds are included at each stage." },
        { q: "What file formats do I get?", a: "We deliver in all formats for print and digital, including vector files." },
      ],
    },
  },
  {
    slug: "isletmeye-ozel-muzik",
    hero: "https://images.unsplash.com/photo-1511379934373-07a1bf625cc6?w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1598483396730-6172c5fa29aa?w=1200&q=85",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=85",
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=85",
    ],
    tags: ["Jingle", "Ambient", "Marka Sesi", "Lisanslı"],
    tr: {
      title: "İşletmeye Özel Müzik",
      tagline: "Mekanınızın sesi markanız kadar özgün olsun.",
      intro: [
        "Kafe, restoran, mağaza, otel ve kurumsal mekanlar için markanıza özel arka plan müziği, jingle ve ses kimliği üretiyoruz. Hazır listeler yerine işletmenizin ruhuna uygun, telif sorunu yaşamayacağınız lisanslı müzikler sunuyoruz.",
        "Günlük veya haftalık playlist yönetimi, mevsimsel güncellemeler ve özel günler için özel setler — mekan atmosferinizi müzikle tamamlıyoruz.",
      ],
      features: [
        { title: "Özel Jingle", desc: "Markanızı akılda tutan kısa tanıtım melodileri." },
        { title: "Ambient & Arka Plan", desc: "Mekan tipine uygun, rahatsız etmeyen fon müzikleri." },
        { title: "Ses Kimliği", desc: "Tutarlı marka sesi: açılış, bekleme, kapanış müzikleri." },
        { title: "Playlist Yönetimi", desc: "Günlük/haftalık çalma listesi hazırlama ve güncelleme." },
        { title: "Lisanslı Teslim", desc: "Ticari kullanım için tam lisanslı dosyalar." },
        { title: "Mekan Kurulumu", desc: "Hoparlör sistemine uygun format ve ses seviyesi ayarı." },
      ],
      steps: [
        { title: "Keşif", desc: "Mekanınızı, müşteri profilinizi ve marka tonunuzu dinliyoruz." },
        { title: "Konsept", desc: "Müzik tarzı, tempo ve referans örnekleri belirleniyor." },
        { title: "Üretim", desc: "Özel beste, düzenleme ve miksaj süreci." },
        { title: "Teslim & Yayın", desc: "Lisanslı dosyalar ve playlist ile mekana kurulum." },
      ],
      faq: [
        { q: "Hazır Spotify listesi yerine neden özel müzik?", a: "Özel müzik markanızı ayırt eder; telif riski olmadan sadece size ait bir atmosfer yaratırsınız." },
        { q: "Sadece jingle yaptırabilir miyim?", a: "Evet; sadece jingle, sadece ambient veya komple ses kimliği paketi seçebilirsiniz." },
        { q: "Mekanda nasıl çalıyoruz?", a: "USB, Bluetooth veya mevcut ses sisteminize uygun formatlarda teslim ediyoruz; kurulum desteği veriyoruz." },
      ],
    },
    en: {
      title: "Custom Business Music",
      tagline: "Your venue's sound should be as unique as your brand.",
      intro: [
        "We produce custom background music, jingles and sonic identity for cafés, restaurants, stores, hotels and corporate spaces. Instead of generic playlists, we deliver licensed tracks tailored to your brand — with no copyright headaches.",
        "Daily or weekly playlist management, seasonal updates and special-day sets — we complete your venue atmosphere with music.",
      ],
      features: [
        { title: "Custom Jingle", desc: "Short promo melodies that keep your brand memorable." },
        { title: "Ambient & Background", desc: "Non-intrusive background music suited to your venue type." },
        { title: "Sonic Identity", desc: "Consistent brand sound: opening, waiting and closing tracks." },
        { title: "Playlist Management", desc: "Daily/weekly playlist creation and updates." },
        { title: "Licensed Delivery", desc: "Fully licensed files for commercial use." },
        { title: "Venue Setup", desc: "Format and volume levels matched to your speaker system." },
      ],
      steps: [
        { title: "Discovery", desc: "We learn your venue, customer profile and brand tone." },
        { title: "Concept", desc: "Music style, tempo and reference samples are defined." },
        { title: "Production", desc: "Custom composition, arrangement and mixing." },
        { title: "Delivery & Launch", desc: "Licensed files and playlists set up in your venue." },
      ],
      faq: [
        { q: "Why custom music instead of a Spotify playlist?", a: "Custom music differentiates your brand and creates an atmosphere that's yours alone, without copyright risk." },
        { q: "Can I get just a jingle?", a: "Yes; you can choose jingle only, ambient only or a full sonic identity package." },
        { q: "How do we play it in the venue?", a: "We deliver in formats suited to USB, Bluetooth or your existing sound system, with setup support." },
      ],
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function serviceContent(s: Service, lang: Lang): ServiceContent {
  return lang === "TR" ? s.tr : s.en;
}
