import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: { plugins: [nodePolyfills()] },
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: { global: "globalThis" },
  server: { open: true, port: 3000 },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
