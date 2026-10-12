import { defineNuxtPlugin, useHead, useRuntimeConfig } from "#imports";

export default defineNuxtPlugin(() => {
  const { key, host } = useRuntimeConfig().public.measuremysite || {};
  if (!key) return;
  useHead({ script: [{ key: "measuremysite", src: `${host}/t.js`, defer: true, "data-key": key }] });
});
