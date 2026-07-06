import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const localesSrc = path.join(root, "lib", "i18n", "locales");
const localesDst = path.join(root, "lib", "locales");

fs.mkdirSync(localesDst, { recursive: true });
for (const f of fs.readdirSync(localesSrc)) {
  fs.copyFileSync(path.join(localesSrc, f), path.join(localesDst, f));
}

const helpersSrc = path.join(root, "lib", "i18n", "helpers.ts");
const helpersDst = path.join(root, "lib", "i18n-helpers.ts");
fs.copyFileSync(helpersSrc, helpersDst);

const i18nFile = path.join(root, "lib", "i18n.tsx");
let i18n = fs.readFileSync(i18nFile, "utf8");
i18n = i18n.replaceAll("./i18n/locales/", "./locales/");
fs.writeFileSync(i18nFile, i18n);

console.log("Done: locales copied, i18n imports fixed");
