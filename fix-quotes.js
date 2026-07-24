const fs = require("fs");
const path = require("path");

const files = ["de.ts", "es.ts", "fr.ts", "ar.ts", "zh.ts", "ru.ts"];
const dir = path.join(process.cwd(), "lib", "i18n", "locales");

files.forEach((file) => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log("❌ Bulunamadı:", filePath);
    return;
  }

  let content = fs.readFileSync(filePath, "utf-8");

  // Eski yapıyı (quote + quoteBy + quoteRole) yeni yapıya (quotes array) çevir
  // Regex: quote: "...",
    quoteBy: "...",
    quoteRole: "...",  -> quotes: [{ text: "...", quoteBy: "...", quoteRole: "..." }],

  const oldPattern = /quote:\s*"([^"]*)"\s*,\s*
\s*quoteBy:\s*"([^"]*)"\s*,\s*
\s*quoteRole:\s*"([^"]*)"\s*,?/g;

  content = content.replace(oldPattern, (match, text, by, role) => {
    return `quotes: [{\n      text: "${text}",\n      quoteBy: "${by}",\n      quoteRole: "${role}"\n    }],`;
  });

  fs.writeFileSync(filePath, content, "utf-8");
  console.log("✅ Düzeltildi:", file);
});

console.log("\n🎉 Hepsi tamam! Şimdi 'npm run build' dene.");
