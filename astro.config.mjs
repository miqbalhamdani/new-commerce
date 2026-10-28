// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://belli.id',

  // Downloaded from Google at build time and served from belli.id, so the first paint doesn't wait on fonts.googleapis.com.
  fonts: [
    { provider: fontProviders.google(), name: 'Outfit', cssVariable: '--font-outfit', weights: [400, 500, 600, 700], subsets: ['latin'], fallbacks: ['system-ui', 'sans-serif'] },
    { provider: fontProviders.google(), name: 'Caveat', cssVariable: '--font-caveat', weights: [500, 600], subsets: ['latin'], fallbacks: ['cursive'] },
    { provider: fontProviders.google(), name: 'DM Mono', cssVariable: '--font-dm-mono', weights: [400], subsets: ['latin'], fallbacks: ['ui-monospace', 'monospace'] },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
