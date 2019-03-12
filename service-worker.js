self.__precacheManifest = [
  {
    url: '/_next/static/wYaoHPI9RbIQ78Y1xfmjK/pages/teams.js',
  },
  {
    url: '/_next/static/wYaoHPI9RbIQ78Y1xfmjK/pages/index.js',
  },
  {
    url: '/_next/static/wYaoHPI9RbIQ78Y1xfmjK/pages/game.js',
  },
  {
    url: '/_next/static/wYaoHPI9RbIQ78Y1xfmjK/pages/_error.js',
  },
  {
    url: '/_next/static/wYaoHPI9RbIQ78Y1xfmjK/pages/_app.js',
  },
  {
    url: '/_next/static/runtime/webpack-2ef50c24cc8d478adafc.js',
  },
  {
    url: '/_next/static/runtime/main-f9f856d8d7840a3a2119.js',
  },
  {
    url: '/_next/static/chunks/commons.3e796a7f6eeaf3e38ef7.js',
  },
];

/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js',
);

importScripts();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /^https?.*/,
  workbox.strategies.networkFirst({
    cacheName: 'https-calls',
    networkTimeoutSeconds: 15,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 150,
        maxAgeSeconds: 2592000,
        purgeOnQuotaError: false,
      }),
      new workbox.backgroundSync.Plugin('hoopify-sync-queue', {
        maxRetentionTime: 1440,
      }),
      new workbox.cacheableResponse.Plugin({ statuses: [0, 200] }),
    ],
  }),
  'GET',
);
