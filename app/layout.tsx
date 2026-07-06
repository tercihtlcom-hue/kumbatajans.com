import fs from "node:fs";
import path from "node:path";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

// Fontlar yerelde varsa (npm run fonts:setup) onları kullan — çerez ve dış istek yok
const hasLocalFonts = fs.existsSync(
  path.join(process.cwd(), "public", "fonts", "fonts.css")
);

export const metadata: Metadata = {
  title: "Kumbat Ajans® | Digital-first Ajans — Kod + AI + Prodüksiyon",
  description:
    "Kumbat Ajans: Web geliştirme, yapay zeka otomasyonu, profesyonel prodüksiyon, sosyal medya yönetimi ve dijital strateji. Ankara merkezli digital-first ajans.",
  metadataBase: new URL("https://kumbatajans.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kumbat Ajans® | Digital-first Ajans",
    description: "Kod, AI ve Prodüksiyon — tek çatı altında.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f0e8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {hasLocalFonts ? (
          <link rel="stylesheet" href="/fonts/fonts.css" />
        ) : (
          <>
            <link rel="preconnect" href="https://api.fontshare.com" />
            <link
              id="fontshare-css"
              rel="stylesheet"
              href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap"
              media="print"
            />
            {/* Font CSS'i render-blocking olmadan yükle; yüklenince aktive et */}
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(){var l=document.getElementById('fontshare-css');if(!l)return;if(l.sheet){l.media='all';return;}l.addEventListener('load',function(){l.media='all';});})();`,
              }}
            />
            <noscript>
              <link
                rel="stylesheet"
                href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap"
              />
            </noscript>
          </>
        )}
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
