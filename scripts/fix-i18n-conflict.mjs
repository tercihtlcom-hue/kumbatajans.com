import { copyFileSync, existsSync, unlinkSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "lib", "i18n.tsx");
const dest = join(root, "lib", "i18n-core.tsx");
const index = join(root, "lib", "i18n", "index.tsx");

if (!existsSync(src)) {
  console.error("lib/i18n.tsx not found — already migrated?");
  process.exit(existsSync(dest) ? 0 : 1);
}

copyFileSync(src, dest);
writeFileSync(index, 'export * from "../i18n-core";\n', "utf8");
unlinkSync(src);
console.log("OK: i18n.tsx -> i18n-core.tsx, index.tsx updated");
