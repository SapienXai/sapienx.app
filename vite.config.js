import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

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
        main: resolve(rootDir, "index.html"),
        agentos: resolve(rootDir, "agentos/index.html"),
      },
    },
  },
  plugins: [copyRouteAssets(["agentos"])],
});
