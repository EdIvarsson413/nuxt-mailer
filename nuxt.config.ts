// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [ './assets/main.css' ],
  app: {
    head:{
      link: [{ rel: 'shortcut icon', type: 'image/x-icon', href: './public/favicon.ico' }]
    }
  },
  runtimeConfig: {
    /**
     * Variables de entorno privadas
     * Aunque se pueden usar en el frontend, el contenido no saldrá
     */
    hola: 'mundo',

    // Variables de entorno publicas
    public: {
      CORREO: process.env.CORREO,
      CONTRASENA: process.env.CONTRASENA,
      NOMBRE: process.env.NOMBRE
    }
  },
  modules: [
    // ['nuxt-mail', {
    //   message: {
    //     to: 'paraalguien@gmail.com',
    //   },
    //   smtp: {
    //     service: 'gmail',
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //       user: process.env.CORREO,
    //       pass: process.env.CONTRASENA,
    //     },
    //   },
    // }],
    'nuxt-mailer',
    'vuetify-nuxt-module'
  ],
  vuetify: {
    moduleOptions: {

    },
    vuetifyOptions: {
      
    }
  }
})
