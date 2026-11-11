// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zadonembark.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi'],
    prefixDefaultLocale: false,
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', hi: 'hi' },
      },
      filter: (page) =>
        !page.includes('/thank-you/') && !page.includes('/eligibility-check/'),
    }),
  ],
});
