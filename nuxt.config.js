module.exports = {
  mode: 'spa',
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    title: 'Decred on-chain',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'On-chain analyses of Decred blockchain',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/_reset.scss',
    '@/assets/_fonts.scss',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/_global.scss',
  ],
  /*
   ** Style resources
   */
  styleResources: {
    scss: ['./assets/_colors.scss'],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '@/plugins/filters'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
  ],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Load SVG files as components
      // https://vue-svg-loader.js.org/

      // Replace all existing rules which include SVG files
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      // Create new rule for SVG loading
      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: ['babel-loader', 'vue-svg-loader'],
          },
          {
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      })
    },
  },
}
