<template>
    <div class="text-center mt-5">
        <h1 class="text-h2">Enviar Correos</h1>
        <br>
        <!-- Llamar a la variable de entorno publica -->
        <p>Correo remitente actual: <b>{{ config.public.CORREO }}</b> </p>
    </div>
</template>

<script setup>
const config = useRuntimeConfig()
</script>