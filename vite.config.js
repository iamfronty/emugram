import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        IconsResolver(),
        PrimeVueResolver()
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
