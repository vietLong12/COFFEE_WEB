import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  server: {
    host: "0.0.0.0", // Lắng nghe trên tất cả các địa chỉ IP
  },
});
