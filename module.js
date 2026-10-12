// Adds the measuremy.site script tag to every page. The tracker reads its key from its own <script> element and counts
// client-side navigation (vue-router) itself by listening to history.pushState, so the module only renders the tag.
import { addImports, addPlugin, createResolver, defineNuxtModule, useLogger } from "@nuxt/kit";

const DEFAULT_HOST = "https://a.measuremy.site";

export default defineNuxtModule({
  meta: { name: "nuxt-measuremysite", configKey: "measuremysite", compatibility: { nuxt: ">=3.0.0" } },
  defaults: { host: DEFAULT_HOST, dev: false },
  setup(options, nuxt) {
    const logger = useLogger("nuxt-measuremysite");
    const { resolve } = createResolver(import.meta.url);
    // Nuxt loads .env into process.env before modules run. NUXT_PUBLIC_MEASUREMYSITE_KEY also overrides the key at
    // runtime through runtimeConfig, so a key that's only set where the server runs works too.
    const key = options.key || process.env.NUXT_PUBLIC_MEASUREMYSITE_KEY || process.env.MEASUREMYSITE_KEY || "";
    if (key && !/^pk_[A-Za-z0-9_-]+$/.test(key)) throw new Error(`nuxt-measuremysite: "${key}" isn't a site key; it starts with pk_ (the public key from the dashboard's Setup tab).`);
    if (!key) logger.warn("No site key: set measuremysite: { key: \"pk_...\" } in nuxt.config or NUXT_PUBLIC_MEASUREMYSITE_KEY. Get one at https://measuremy.site/login.");

    nuxt.options.runtimeConfig.public.measuremysite = { key, host: (options.host || DEFAULT_HOST).replace(/\/+$/, "") };
    nuxt.options.build.transpile.push(resolve("./runtime"));
    addImports({ name: "useMeasuremysite", from: resolve("./runtime/composables") });
    // Dev-server visits would count as real traffic, so `nuxt dev` leaves the tracker out unless asked.
    if (nuxt.options.dev && !options.dev) return;
    addPlugin(resolve("./runtime/plugin"));
  },
});
