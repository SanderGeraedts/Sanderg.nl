import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://sanderg.nl",
  integrations: [mdx(), sitemap()],
  redirects: {
    '/md': {
      status: 301,
      destination: '/posts/diy-keyboard'
    }
  }
});
