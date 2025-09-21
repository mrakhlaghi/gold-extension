import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  vite: (env) => ({
    css: {
      postcss: {
        plugins: [require("@tailwindcss/postcss"), require("autoprefixer")],
      },
    },
  }),
  manifest: {
    name: "TGJU Gold Price Extension",
    description: "Live gold prices from TGJU with beautiful Persian UI",
    version: "1.0.0",
    permissions: ["storage", "activeTab"],
    host_permissions: ["https://call4.tgju.org/*"],
  },
});
