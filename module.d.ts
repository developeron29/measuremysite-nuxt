import type { NuxtModule } from "@nuxt/schema";

export interface ModuleOptions {
  /** The site's public key (pk_...), from the dashboard's Setup tab. Defaults to NUXT_PUBLIC_MEASUREMYSITE_KEY. Safe to commit. */
  key?: string;
  /** Tracker host, for self-hosted installs. Defaults to https://a.measuremy.site. */
  host?: string;
  /** Also track pages served by `nuxt dev`. Off by default, so local visits don't count. */
  dev?: boolean;
}

declare const module: NuxtModule<ModuleOptions>;
export default module;

declare module "@nuxt/schema" {
  interface NuxtConfig {
    measuremysite?: ModuleOptions;
  }
  interface PublicRuntimeConfig {
    measuremysite: { key: string; host: string };
  }
}
