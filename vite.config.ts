import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import Icons from "unplugin-icons/vite";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // `cloudflare:*` modules (e.g. `cloudflare:workers`, imported by src/db) are
  // provided by the Workers runtime, not bundled. They must stay external so
  // the SSR/server build can resolve them. (The @cloudflare/vite-plugin
  // registers them as builtins for its own environment; this is the belt-and-
  // suspenders that covers the TanStack Start server build path.)
  build: {
    rolldownOptions: { external: [/^cloudflare:/] },
  },
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    Icons({ compiler: "jsx", jsx: "react" }),
  ],
});

export default config;
