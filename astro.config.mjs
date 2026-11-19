// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// GitHub Pages serves this repo (monasteriewatches/monasteriewatches.github.io)
// at the root of https://monasteriewatches.github.io/
// If you later add a custom domain (e.g. monasterie.com), set `site` to that
// domain and remove `base`.
export default defineConfig({
  site: 'https://monasteriewatches.github.io',
  // Put the (small) CSS straight into each page so the first paint doesn't
  // wait on a separate file
  build: { inlineStylesheets: 'always' },
  integrations: [
    // sitemap-index.xml for Google Search Console; the hidden style guide stays out
    sitemap({ filter: (page) => !page.includes('/styleguide') }),
  ],
});