// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// GitHub Pages serves this repo (monasteriewatches/monasteriewatches.github.io)
// at the custom domain https://www.monasteriewatches.com/ (set in the repo's
// Settings → Pages; public/CNAME holds the same name). The old github.io
// address redirects here automatically.
export default defineConfig({
  site: 'https://www.monasteriewatches.com',
  integrations: [
    // sitemap-index.xml for Google Search Console; the hidden style guide stays out
    sitemap({ filter: (page) => !page.includes('/styleguide') }),
  ],
});