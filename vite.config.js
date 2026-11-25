import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages configuration
 * --------------------------
 * BASE_PATH  – where the site is served from.
 *              Default './' (relative) works for ANY repository name,
 *              e.g. https://<user>.github.io/<repo>/ — no change needed.
 *              Set BASE_PATH=/<repo>/ if you prefer absolute asset URLs.
 * SITE_URL   – full public URL (with trailing slash), used for the
 *              Open Graph image in WhatsApp / Instagram link previews,
 *              e.g. https://<user>.github.io/<repo>/
 *              The GitHub Actions workflow fills this in automatically.
 */
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const base = env.BASE_PATH || './';
  let siteUrl = env.SITE_URL || '';
  if (siteUrl && !siteUrl.endsWith('/')) siteUrl += '/';

  return {
    base,
    plugins: [
      react(),
      {
        name: 'inject-site-url',
        transformIndexHtml(html) {
          return html.replaceAll('__SITE_URL__', siteUrl || './');
        },
      },
    ],
    build: {
      target: 'es2019',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  };
});
