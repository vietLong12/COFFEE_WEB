import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  server: {
    host: "0.0.0.0", // Lắng nghe trên tất cả các địa chỉ IP
  },
  define: {
    global: {},
  },
});
