import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const log = [];

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
  log.push({ cmd: [cmd, ...args].join(" "), code: r.status, out: (r.stdout || "") + (r.stderr || "") });
  return r.status === 0;
}

run("node", ["scripts/setup-local-media.mjs"]);
run("powershell", ["-Command", "Get-ChildItem -Recurse public\\media -File | ForEach-Object { $_.FullName + ' ' + $_.Length }"]);

writeFileSync(path.join(root, "setup-result.json"), JSON.stringify(log, null, 2), "utf8");
