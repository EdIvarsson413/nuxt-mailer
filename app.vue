<template>
  <!-- <head>
    <link rel="shortcut icon" href="./public/favicon.ico" type="image/x-icon">
  </head> -->
  <v-app style="background-color: #424242; color: white">
    <!-- Layout -->
    <Layout/>

    <v-main class="mt-7">
      <v-container>
        <!-- Formulario -->
        <v-card
          class="w-50 mx-auto mb-5"
          color="grey-darken-4"
          elevation="6"
        >
          <v-form class="pa-5" @keyup.enter="enviarCorreo">
            <v-card-title class="text-center mb-3 text-h4">Llena los campos y escribe tu mensaje</v-card-title>
            <v-card-title v-if="envio.enviado"  class="text-center mb-5 bg-green-lighten-2 rounded text-white font-weight-bold">{{ envio.msg }}</v-card-title>
            
            <!-- Destinatario -->
            <v-text-field
              label="Para"
              color="purple-lighten-4"
              variant="outlined"
              placeholder="Ej. correo@ejemplo.com"
              prepend-inner-icon="mdi-account"
              v-model="cuerpo.correo"
              class="mb-5"
            />

              <!-- Asunto -->
            <v-text-field
              label="Asunto"
              color="purple-lighten-4"
              variant="outlined"
              placeholder="Asunto importante"
              prepend-inner-icon="mdi-cursor-text"
              v-model="cuerpo.asunto"
              class="mb-5"
            />

              <!-- Mensaje -->
            <v-textarea
              rows="5" 
              color="purple-lighten-4" 
              variant="outlined"
              label="Mensaje"
              prepend-inner-icon="mdi-comment-text-multiple-outline"
              v-model="cuerpo.mensajetxt"
              class="mb-5"
            />

            <v-btn 
              class="w-100"
              text="Enviar Mensaje"
              variant="outlined"
              color="purple-lighten-4"
              append-icon="mdi-comment-text-outline"
              @click="enviarCorreo"
              :disabled="enviando"
              size="large"
            />
            <v-btn 
              class="w-100 mt-2"
              text="Reiniciar"
              variant="outlined"
              color="red-lighten-3"
              append-icon="mdi-restart"
              @click="reiniciar"
              :disabled="enviando"
              size="large"
            />
          </v-form>
        </v-card>

        <!-- En caso de que haya errores en los campos -->
        <v-card 
          v-if="error"
          v-for="error in errores" :key="error.msg.toString()"
          class="w-50 mx-auto mt-3"
          color="red-lighten-2"
          elevation="10"
        >
          <v-card-title class="text-center font-weight-bold">{{ error.msg }}</v-card-title>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts"> 
import type { Respuesta, Error } from '~/types/tipos'

// Variables
const cuerpo = reactive({
  correo: '',
  asunto: '',
  mensajetxt: ''
})
const envio = reactive <Respuesta> ({
  enviado: false,
  msg: ''
})
const error = ref <Boolean | undefined> (false);
const errores = ref <Error[] | undefined> ([]);
const enviando = ref(false);

// Enviar correo
const enviarCorreo = async () => {
  // Validar  los campos de correo y mensaje
  const resultadoValidacion = validarCampos( cuerpo.correo, cuerpo.mensajetxt );

  // Si hay errores se extraen los errores encontrados para mostrarlos
  if (resultadoValidacion?.error) {
    error.value = resultadoValidacion.error;
    errores.value = resultadoValidacion.detalles;
    reiniciar( 'error' )
    return;
  }

  // Si no hay errores, se desactivan los botones
  enviando.value = true;

  // Se manda el correo
  const data = await $fetch <Respuesta> ('/api/enviar', {
    headers: { "client-platform": "browser" },
    method: 'post',
    body: {
      para: cuerpo.correo,
      asunto: cuerpo.asunto,
      mensaje: cuerpo.mensajetxt
    }
  })

  // Al terminar el envio se avisa al usuario
  envio.enviado = data.enviado;
  envio.msg = data.msg;
  
  // Se vuelve al estado normal 
  reiniciar( 'enviado' )
}

// Reiniciar variables dependiendo de si hay errores o se envio correo
const reiniciar = ( tipo: String ) => {
  if( tipo === 'error' ){
    setTimeout(() => {
      error.value = false;
      errores.value = []
    }, 2000);
  }

  if( tipo === 'enviado' ) {
    setTimeout(() => {
    enviando.value = false;
    envio.enviado = false;
    envio.msg = '';
    reiniciarCuerpo();
  }, 1500);
  }
}

// Reinicio de campos
const reiniciarCuerpo = () => {
  cuerpo.correo = '';
  cuerpo.asunto = '';
  cuerpo.mensajetxt = '';
}

// Modificar el titulo de la pagina
onMounted(() => {
  const titulo = 'Nuxt Mailer - Envia Correos'
  useHead({
    title: titulo,
    // titleTemplate: 'Nuxt Mailer',
    meta: [{ name: 'description', content: 'Enviar correos sencillos con NuxtJs' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }]
  })
})

/**
 * 
 *const mail = useMail()
 *const config = useRuntimeConfig()
 *
 * Usando nuxt-mail (destinatario estático)
 *function enviarMail() {
 *  config.public.DESTINATARIO = 'laloramirez.vengeance@gmail.com'
 *  mail.send({
 *    from: 'Lalo',
 *    subject: 'Prueba cvariable entorno',
 *    text: 'This is an incredible test message',
 *   })
 * }
*/
</script>