export default defineEventHandler( (event) => {
    const config = useRuntimeConfig(event)


    return {
        correo: config.public.CORREO,
        pass: config.public.CONTRASENA
    }
})