import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://atleastplaybaseball.com',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
