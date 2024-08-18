import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  target: 'server',

  head: {
    titleTemplate: '%s - TTT News',
    title: 'TTT News',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/fonts.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'vue2-editor/nuxt',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:3001/',
  },

  auth: {
    // redirect: { login: "/" },
    cookie:{prefix:'auth.',options:{path:'/',}},
    strategies: {
      user: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: '/api/auth/userLogin',
            method: 'post',
            propertyName: 'user.token',
          },
          logout: false,
          user: {
            url: '/api/auth/getUserInfo',
            method: 'post',
            propertyName: 'user',
          },
        },
        // tokenName: "x-access-token"
      },
      // admin: {
      //   _scheme: "local",
      //   endpoints: {
      //     login: { url: '/api/auth/adminLogin', method: 'post', propertyName: "admin.token" },
      //     logout: false,
      //     user: { url: '/api/admins/getAdminInfo', method: 'post', propertyName: "admin" },
      //   },
      //   // tokenName: "x-access-token"
      // },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
