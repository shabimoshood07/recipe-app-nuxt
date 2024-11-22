// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  // To re-enable _all_ Nuxt v3 behavior, set the following options:
  // srcDir: ".",

  dir: {
    app: "app",
  },

  experimental: {
    scanPageMeta: "after-resolve",
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false,
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@primevue/nuxt-module",
  ],
  googleFonts: {
    families: {
      Montserrat: true,
    },
  },
  image: {
    domains: ["https://dummyjson.com"],
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
});
