import { defineConfig } from "vitest/config";

// Unit tests run in plain Node — they must NOT load the Cloudflare Vite plugin
// (it sets resolve.external on the SSR environment, which vitest rejects).
// Vite picks up vite.config.ts for dev/build; vitest picks up this file.
// `src/lib/scoring.test.ts` is a standalone tsx verifier (run via `tsx`),
// so it is excluded here.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/dist/**", "src/lib/scoring.test.ts"],
  },
});
