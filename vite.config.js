import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

function discoverHtmlEntries(absoluteDir) {
  const entries = {};

  const walk = (dir) => {
    if (!existsSync(dir)) {
      return;
    }

    const children = readdirSync(dir).filter((entry) => entry !== ".DS_Store").sort();

    for (const entry of children) {
      const absolutePath = resolve(dir, entry);
      const stats = statSync(absolutePath);

      if (stats.isDirectory()) {
        walk(absolutePath);
        continue;
      }

      if (!absolutePath.endsWith(".html")) {
        continue;
      }

      // Keep output paths stable: "agentos/faq/index.html" -> "agentos/faq/index".
      const rel = relative(rootDir, absolutePath).replace(/\\/g, "/");
      const name = rel.replace(/\.html$/i, "");
      entries[name] = absolutePath;
    }
  };

  walk(absoluteDir);
  return entries;
}

function copyRouteAssets(routes) {
  const copyRecursive = (sourceDir, targetDir) => {
    if (!existsSync(sourceDir)) {
      return;
    }

    mkdirSync(targetDir, { recursive: true });

    for (const entry of readdirSync(sourceDir)) {
      if (entry === ".DS_Store") {
        continue;
      }

      const sourcePath = resolve(sourceDir, entry);
      const targetPath = resolve(targetDir, entry);
      const stats = statSync(sourcePath);

      if (stats.isDirectory()) {
        copyRecursive(sourcePath, targetPath);
        continue;
      }

      if (sourcePath.endsWith(".html")) {
        continue;
      }

      cpSync(sourcePath, targetPath);
    }
  };

  return {
    name: "copy-route-assets",
    closeBundle() {
      for (const route of routes) {
        copyRecursive(resolve(rootDir, route), resolve(rootDir, "dist", route));
      }
    },
  };
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(rootDir, "index.html"),
        ...discoverHtmlEntries(resolve(rootDir, "agentos")),
      },
    },
  },
  plugins: [copyRouteAssets(["agentos"])],
});
