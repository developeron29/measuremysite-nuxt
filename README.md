# nuxt-measuremysite

[measuremy.site](https://measuremy.site) for Nuxt: cookieless web analytics your AI agent can read.

```sh
npx nuxi module add nuxt-measuremysite
```

Then pass your site's public key (the `pk_...` key from the dashboard's Setup tab; it's public and safe to commit):

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["nuxt-measuremysite"],
  measuremysite: { key: "pk_..." },
});
```

Or leave the key out and set `NUXT_PUBLIC_MEASUREMYSITE_KEY` in your environment (at build time or where the server runs).

The tracker is added to every page. `nuxt dev` leaves it out so local visits don't count (`dev: true` turns it on). Client-side navigation is counted as pageviews.

Options: `key`, `host` (a self-hosted tracker, default `https://a.measuremy.site`), `dev`.

## Custom events

```html
<button data-measuremysite-event="signup">Sign up</button>
```

or, after a successful action:

```vue
<script setup>
const { track } = useMeasuremysite();
track("signup", { plan: "pro" });
</script>
```

## Read your traffic from your coding agent

Connect the measuremy.site MCP server and ask Claude Code, Cursor or Codex about visits, sources and pages:

```sh
claude mcp add --transport http measuremysite https://a.measuremy.site/mcp
```

No key needed; it signs in with OAuth. More at [measuremy.site/docs/mcp](https://measuremy.site/docs/mcp).

MIT licensed.
