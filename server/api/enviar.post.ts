import { useMailer } from '#mailer'

export default defineEventHandler( async (event) => {
    // Importaciones
    const { para, mensaje, asunto,  } = await readBody( event );
    const mailer = useMailer();
    const config = useRuntimeConfig( event );

    // Variables de respuesta a la peticion
    let msg : String = ''
    let enviado : Boolean = false;

    // Definir config de remitente y servidor de correos
    const transporter = mailer.customTransporter({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config.public.CORREO,
            pass: config.public.CONTRASENA
        }
    })

    // Envio de correo con la configuracion
    const enviar = await mailer.sendMail({
        transporter: transporter,
        requestId: 'id-unico',
        options: {
            fromEmail: config.public.CORREO,
            fromName: config.public.NOMBRE,
            to: para,
            subject: asunto,
            text: mensaje,
            html: ''
        }
    })
        .then( info => {
            msg = 'Correo enviado :D';
            enviado = true;
        })
        .catch( err => {
            console.log(err)
            msg = 'Erorr al enviar el mensaje';
            enviado = false;
        })

    return {
        msg: msg,
        enviado: enviado
    }
})