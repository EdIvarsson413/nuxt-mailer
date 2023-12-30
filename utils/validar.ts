// Validacion de campos
export const validarCampos = (correo: String, mensaje: String) => {
    const errores = [];

    // Verificar si el campo está vacío
    if (correo.trim() === '') {
        errores.push({ error: true, msg: 'Campo obligatorio' });
    }

    // Verificar el formato del correo electrónico
    if (!/.+@.+\..+/.test(correo.toString())) {
        errores.push({ error: true, msg: 'Correo inválido' });
    }

    // Verificar si hay más de un "@" en el correo
    const contador = correo.split('').filter(caracter => caracter === '@').length;
    if (contador > 1) {
        errores.push({ error: true, msg: `Hay más de un correo, hay ${contador}` });
    }

    if( mensaje.toString().trim() === '' )
        errores.push({ error: true, msg: `Mensaje obligatorio` });

    // Verificar si hay algún error
    if (errores.length > 0) {
        return { error: true, msg: 'Campo incorrecto', detalles: errores };
    }
}