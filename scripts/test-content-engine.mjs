import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tempRoot = mkdtempSync(path.join(tmpdir(), "dca-content-engine-"));
const outDir = path.join(tempRoot, "out");
const configPath = path.join(tempRoot, "tsconfig.json");

writeFileSync(configPath, JSON.stringify({
  extends: path.join(root, "tsconfig.json"),
  compilerOptions: {
    noEmit: false,
    incremental: false,
    module: "commonjs",
    moduleResolution: "node",
    target: "ES2022",
    outDir,
    rootDir: root,
  },
  include: [
    path.join(root, "lib/comparisonContent/**/*.ts"),
    path.join(root, "lib/comparisonLibrary.ts"),
  ],
}, null, 2));

execFileSync(path.join(root, "node_modules/.bin/tsc"), ["--project", configPath], {
  cwd: root,
  stdio: "inherit",
});
if (process.argv.includes("--registry-json")) {
  const require = createRequire(import.meta.url);
  const { comparisonConfigRegistry } = require(
    path.join(outDir, "lib/comparisonContent/registry.js")
  );
  process.stdout.write(JSON.stringify(comparisonConfigRegistry));
  process.exit(0);
}
execFileSync(process.execPath, ["--test", path.join(root, "tests/content-engine/contracts.mjs")], {
  cwd: root,
  env: { ...process.env, CONTENT_ENGINE_OUT: outDir },
  stdio: "inherit",
});
