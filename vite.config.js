import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// Vite plugin to rewrite dynamic and clean routes
function customRoutesPlugin() {
  return {
    name: 'custom-routes-rewrite',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();

        // Rewrite /property/* to /property.html
        if (req.url.match(/^\/property\/[a-z0-9-]+/)) {
          req.url = '/property.html';
        }
        // Rewrite clean URL routes
        else if (req.url === '/investment' || req.url === '/investment/') {
          req.url = '/investment.html';
        }
        else if (req.url === '/about' || req.url === '/about/') {
          req.url = '/about.html';
        }
        else if (req.url === '/contact' || req.url === '/contact/') {
          req.url = '/contact.html';
        }
        else if (req.url === '/listings' || req.url === '/listings/') {
          req.url = '/listings.html';
        }
        else if (req.url === '/privacy' || req.url === '/privacy/') {
          req.url = '/privacy.html';
        }
        else if (req.url === '/terms' || req.url === '/terms/') {
          req.url = '/terms.html';
        }
        // Rewrite /locations/dubai to /locations/dubai.html
        else if (req.url.startsWith('/locations/dubai') && !req.url.endsWith('.html')) {
          req.url = '/locations/dubai.html';
        }
        // Rewrite /locations/abu-dhabi to /locations/abu-dhabi.html
        else if (req.url.startsWith('/locations/abu-dhabi') && !req.url.endsWith('.html')) {
          req.url = '/locations/abu-dhabi.html';
        }
        // Rewrite /locations/doha to /locations/doha.html
        else if (req.url.startsWith('/locations/doha') && !req.url.endsWith('.html')) {
          req.url = '/locations/doha.html';
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [customRoutesPlugin()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        listings: fileURLToPath(new URL('./listings.html', import.meta.url)),
        property: fileURLToPath(new URL('./property.html', import.meta.url)),
        investment: fileURLToPath(new URL('./investment.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        contact: fileURLToPath(new URL('./contact.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy.html', import.meta.url)),
        terms: fileURLToPath(new URL('./terms.html', import.meta.url)),
        dubai: fileURLToPath(new URL('./locations/dubai.html', import.meta.url)),
        abuDhabi: fileURLToPath(new URL('./locations/abu-dhabi.html', import.meta.url)),
        doha: fileURLToPath(new URL('./locations/doha.html', import.meta.url)),
        notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
      },
    },
  },
});
