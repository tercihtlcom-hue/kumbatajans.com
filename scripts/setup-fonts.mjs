/**
 * Fontshare fontlarını (Clash Display + Satoshi) indirir ve kendi
 * sunucumuzdan sunar: public/fonts/fonts.css + woff2 dosyaları.
 * Üçüncü taraf çerezini ve dış font isteğini tamamen kaldırır.
 *
 *   npm run fonts:setup
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontsDir = path.join(root, "public", "fonts");
const logFile = path.join(root, "fonts-setup-log.txt");

const CSS_URL =
  "https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap";

// Modern tarayıcı UA'sı → Fontshare woff2 döndürür
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const lines = [];
const log = (m) => {
  console.log(m);
  lines.push(m);
};

async function main() {
  mkdirSync(fontsDir, { recursive: true });

  log("Fontshare CSS indiriliyor...");
  const cssRes = await fetch(CSS_URL, { headers: { "User-Agent": UA } });
  if (!cssRes.ok) throw new Error(`CSS indirilemedi: ${cssRes.status}`);
  let css = await cssRes.text();

  const urls = [...new Set(css.match(/url\((https:[^)]+)\)/g) ?? [])].map(
    (u) => u.slice(4, -1)
  );
  if (urls.length === 0) throw new Error("CSS içinde font URL'si bulunamadı");
  log(`${urls.length} font dosyası bulundu.`);

  let i = 0;
  for (const url of urls) {
    i++;
    const ext = url.includes(".woff2")
      ? "woff2"
      : url.includes(".woff")
        ? "woff"
        : "ttf";
    const name = `font-${String(i).padStart(2, "0")}.${ext}`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`Font indirilemedi: ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(path.join(fontsDir, name), buf);
    css = css.split(url).join(`/fonts/${name}`);
    log(`  ok: ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
  }

  writeFileSync(path.join(fontsDir, "fonts.css"), css);
  log("TAMAM: public/fonts/fonts.css hazır.");
  log("Şimdi: npm run build && npm run start ile tekrar test et.");
}

main()
  .then(() => writeFileSync(logFile, lines.join("\n")))
  .catch((e) => {
    log(`HATA: ${String(e?.message || e)}`);
    writeFileSync(logFile, lines.join("\n"));
    process.exit(1);
  });
