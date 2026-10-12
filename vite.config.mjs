import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    // Kept as `build` so the Netlify publish directory and the /build line in
    // .gitignore stay as they were under Create React App — no deploy change.
    outDir: "build",
    emptyOutDir: true,
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.js"],

    server: {
      deps: {
        /* react-parallax-tilt's ESM build imports the bare specifier
           "react/jsx-runtime", but React 17's package.json has no "exports" map
           — and Node's native ESM loader won't guess the ".js" extension.
           Vitest externalises node_modules by default, so it hits that loader;
           inlining this one package routes it through Vite's resolver instead,
           which adds the extension. The production build was never affected. */
        inline: ["react-parallax-tilt"],
      },
    },
  },
});
