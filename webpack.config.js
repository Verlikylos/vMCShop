const Encore = require('@symfony/webpack-encore');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  // directory where compiled assets will be stored
  .setOutputPath('public/build/')
  // public path used by the web server to access the output path
  .setPublicPath('/build')
  // only needed for CDN's or sub-directory deploy
  // .setManifestKeyPrefix('build/')

  /*
   * ENTRY CONFIG
   *
   * Each entry will result in one JavaScript file (e.g. app.js)
   * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
   */
  .addEntry('app', './assets/js/app.js')
  .addEntry('admin', './assets/js/admin.js')
  .addEntry('antd', './assets/less/antd.less')

  // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
  // .enableStimulusBridge('./assets/controllers.json')

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  /*
   * FEATURE CONFIG
   *
   * Enable & configure other features below. For a full
   * list of features, see:
   * https://symfony.com/doc/current/frontend.html#adding-more-features
   */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  .configureBabel((config) => {
    config.plugins.push('@babel/plugin-proposal-class-properties');
  })

  // enables @babel/preset-env polyfills
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
  })

  // enables Sass/SCSS support
  // .enableSassLoader()
  .enableLessLoader((options) => {
    options.lessOptions = {
      javascriptEnabled: true,
    };
  })

  // uncomment if you use TypeScript
  // .enableTypeScriptLoader()

  // uncomment if you use React
  .enableReactPreset()

  // uncomment to get integrity="..." attributes on your script & link tags
  // requires WebpackEncoreBundle 1.4 or higher
  .enableIntegrityHashes(Encore.isProduction())

  // uncomment if you're having problems with a jQuery plugin
  // .autoProvidejQuery()

  .configureWatchOptions((config) => {
    config = { poll: true, ignored: /node_modules/ };
  })

  .addAliases({
    '@less': path.resolve('./assets/less'),
    '@utils': path.resolve('./assets/js/common/utils'),
    '@common': path.resolve('./assets/js/common'),
    '@admin': path.resolve('./assets/js/admin'),
    '@app': path.resolve('./assets/js/app'),
    '@images': path.resolve('./assets/images'),
    '@store': path.resolve('./assets/js/admin/store'),
  })

  .addPlugin(
    new BrowserSyncPlugin(
      {
        host: 'vmcshop.test',
        proxy: 'http://vmcshop.test',
        port: 8000,
        open: false,
        ui: false,
        files: [
          {
            match: ['public/build/**/*.js', 'public/build/**/*.css'],
            fn(event, file) {
              if (event === 'change') {
                const bs = require('browser-sync').get('bs-webpack-plugin');
                bs.reload();
              }
            },
          },
        ],
      },
      {
        reload: false, // this allow webpack server to take care of instead browser sync
        name: 'bs-webpack-plugin',
      }
    )
  );

module.exports = Encore.getWebpackConfig();
