const withOffline = moduleExists('next-offline') ? require('next-offline') : {};
const withManifest = moduleExists('next-manifest')
  ? require('next-manifest')
  : {};

const withPlugins = moduleExists('next-compose-plugins')
  ? require('next-compose-plugins')
  : {};

const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        },
      });
    }
    return config;
  },
};

module.exports =
  moduleExists('next-offline') && moduleExists('next-compose-plugins')
    ? withPlugins(
        [
          [
            withOffline,
            {
              workboxOpts: {
                swDest: 'static/service-worker.js',
                runtimeCaching: [
                  {
                    urlPattern: /^https?.*/,
                    handler: 'networkFirst',
                    options: {
                      cacheName: 'https-calls',
                      networkTimeoutSeconds: 15,
                      expiration: {
                        maxEntries: 150,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                      },
                      cacheableResponse: {
                        statuses: [0, 200],
                      },
                    },
                  },
                ],
              },
            },
          ],
        ],
        nextConfig,
      )
    : nextConfig;

function moduleExists(name) {
  try {
    return require.resolve(name);
  } catch (error) {
    return false;
  }
}
