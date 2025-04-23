import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { ghPages } from "vite-plugin-gh-pages";

export default defineConfig({
   plugins: [react(), svgr(), ghPages()],
   base: "/products-app/",
   build: {
      outDir: "build",
   },
});
