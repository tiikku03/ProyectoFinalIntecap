const Brevo = require('@getbrevo/brevo');

const apiInstance = new Brevo.TransactionalEmailsApi();
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;


class EmailService {
    /**
     * Enviar correo de confirmación de registro
     * @param {string} email 
     * @param {string} nombre 
     */
    async enviarConfirmacionRegistro(email, nombre) {
        try {
            const sendSmtpEmail = new Brevo.SendSmtpEmail();

            sendSmtpEmail.sender = {
                name: "Tienda en Línea",
                email: process.env.BREVO_SENDER_EMAIL
            };

            sendSmtpEmail.to = [{
                email: email,
                name: nombre
            }];

            sendSmtpEmail.subject = "¡Bienvenido a nuestra Tienda en Línea!";

            sendSmtpEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; }
                        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                        .button { background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>¡Bienvenido ${nombre}!</h1>
                        </div>
                        <div class="content">
                            <h2>Tu cuenta ha sido creada exitosamente</h2>
                            <p>Gracias por registrarte en nuestra tienda en línea. Ahora puedes disfrutar de:</p>
                            <ul>
                                <li>Explorar nuestro catálogo de productos</li>
                                <li>Agregar productos a tu lista de deseos</li>
                                <li>Realizar compras de forma segura</li>
                                <li>Dejar reseñas y valoraciones</li>
                                <li>Hacer seguimiento a tus pedidos</li>
                            </ul>
                            <p>¡Esperamos que disfrutes tu experiencia de compra!</p>
                        </div>
                        <div class="footer">
                            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                            <p>&copy; 2025 Tienda en Línea. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('Correo de registro enviado:', result);
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Error al enviar correo de registro:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Enviar correo de confirmación de pedido
     * @param {string} email - Email del destinatario
     * @param {string} nombre - Nombre del usuario
     * @param {object} pedido - Datos del pedido
     */
    async enviarConfirmacionPedido(email, nombre, pedido) {
        try {
            const sendSmtpEmail = new Brevo.SendSmtpEmail();

            sendSmtpEmail.sender = {
                name: "Tienda en Línea",
                email: process.env.BREVO_SENDER_EMAIL
            };

            sendSmtpEmail.to = [{
                email: email,
                name: nombre
            }];

            sendSmtpEmail.subject = `Confirmación de Pedido #${pedido.id_pedido}`;

            // Generar HTML de productos
            const productosHTML = pedido.items.map(item => `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.nombre}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.cantidad}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${parseFloat(item.precio).toFixed(2)}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${(parseFloat(item.precio) * item.cantidad).toFixed(2)}</td>
                </tr>
            `).join('');

            sendSmtpEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; }
                        .order-info { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
                        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; padding: 15px; background-color: #f0f0f0; }
                        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>¡Pedido Confirmado!</h1>
                        </div>
                        <div class="content">
                            <p>Hola ${nombre},</p>
                            <p>Gracias por tu compra. Hemos recibido tu pedido y está siendo procesado.</p>

                            <div class="order-info">
                                <p><strong>Número de Pedido:</strong> #${pedido.id_pedido}</p>
                                <p><strong>Fecha:</strong> ${new Date(pedido.fecha_pedido).toLocaleDateString('es-ES')}</p>
                                <p><strong>Estado:</strong> ${pedido.estado}</p>
                            </div>

                            <h3>Detalles del Pedido:</h3>
                            <table class="table">
                                <thead>
                                    <tr style="background-color: #f0f0f0;">
                                        <th style="padding: 10px; text-align: left;">Producto</th>
                                        <th style="padding: 10px; text-align: center;">Cantidad</th>
                                        <th style="padding: 10px; text-align: right;">Precio Unit.</th>
                                        <th style="padding: 10px; text-align: right;">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${productosHTML}
                                </tbody>
                            </table>

                            <div class="total">
                                Total: $${parseFloat(pedido.total).toFixed(2)}
                            </div>

                            <p>Te enviaremos otra notificación cuando tu pedido sea enviado.</p>
                        </div>
                        <div class="footer">
                            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                            <p>&copy; 2025 Tienda en Línea. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('Correo de confirmación de pedido enviado:', result);
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Error al enviar correo de confirmación de pedido:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Enviar correo de actualización de estado de pedido
     * @param {string} email - Email del destinatario
     * @param {string} nombre - Nombre del usuario
     * @param {number} idPedido - ID del pedido
     * @param {string} nuevoEstado - Nuevo estado del pedido
     */
    async enviarActualizacionEstadoPedido(email, nombre, idPedido, nuevoEstado) {
        try {
            const sendSmtpEmail = new Brevo.SendSmtpEmail();

            sendSmtpEmail.sender = {
                name: "Tienda en Línea",
                email: process.env.BREVO_SENDER_EMAIL
            };

            sendSmtpEmail.to = [{
                email: email,
                name: nombre
            }];

            sendSmtpEmail.subject = `Actualización de Pedido #${idPedido}`;

            let estadoMensaje = '';
            let estadoColor = '#4F46E5';

            switch (nuevoEstado.toLowerCase()) {
                case 'pendiente':
                    estadoMensaje = 'Tu pedido está pendiente de confirmación.';
                    estadoColor = '#F59E0B';
                    break;
                case 'procesando':
                    estadoMensaje = 'Tu pedido está siendo procesado.';
                    estadoColor = '#3B82F6';
                    break;
                case 'enviado':
                    estadoMensaje = 'Tu pedido ha sido enviado y está en camino.';
                    estadoColor = '#8B5CF6';
                    break;
                case 'entregado':
                    estadoMensaje = '¡Tu pedido ha sido entregado! Esperamos que disfrutes tu compra.';
                    estadoColor = '#10B981';
                    break;
                case 'cancelado':
                    estadoMensaje = 'Tu pedido ha sido cancelado.';
                    estadoColor = '#EF4444';
                    break;
                default:
                    estadoMensaje = `El estado de tu pedido ha cambiado a: ${nuevoEstado}`;
            }

            sendSmtpEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: ${estadoColor}; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; }
                        .status-box { background-color: white; padding: 20px; margin: 20px 0; border-left: 4px solid ${estadoColor}; }
                        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Actualización de Pedido</h1>
                        </div>
                        <div class="content">
                            <p>Hola ${nombre},</p>
                            <p>Te informamos que el estado de tu pedido ha sido actualizado.</p>

                            <div class="status-box">
                                <p><strong>Número de Pedido:</strong> #${idPedido}</p>
                                <p><strong>Nuevo Estado:</strong> <span style="color: ${estadoColor}; font-weight: bold;">${nuevoEstado.toUpperCase()}</span></p>
                                <p>${estadoMensaje}</p>
                            </div>

                            ${nuevoEstado.toLowerCase() === 'entregado' ?
                                '<p>¡Esperamos que disfrutes tu compra! Si tienes algún problema, no dudes en contactarnos.</p>' :
                                '<p>Puedes revisar el estado de tu pedido en tu historial de pedidos.</p>'
                            }
                        </div>
                        <div class="footer">
                            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                            <p>&copy; 2025 Tienda en Línea. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('Correo de actualización de estado enviado:', result);
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Error al enviar correo de actualización de estado:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Enviar correo de recuperación de contraseña
     * @param {string} email - Email del destinatario
     * @param {string} nombre - Nombre del usuario
     * @param {string} tokenRecuperacion - Token de recuperación
     */
    async enviarRecuperacionContrasena(email, nombre, tokenRecuperacion) {
        try {
            const sendSmtpEmail = new Brevo.SendSmtpEmail();

            sendSmtpEmail.sender = {
                name: "Tienda en Línea",
                email: process.env.BREVO_SENDER_EMAIL
            };

            sendSmtpEmail.to = [{
                email: email,
                name: nombre
            }];

            sendSmtpEmail.subject = "Recuperación de Contraseña";

            const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${tokenRecuperacion}`;

            sendSmtpEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; }
                        .button { background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
                        .warning { background-color: #FEF3C7; padding: 15px; border-left: 4px solid #F59E0B; margin: 20px 0; }
                        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Recuperación de Contraseña</h1>
                        </div>
                        <div class="content">
                            <p>Hola ${nombre},</p>
                            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>

                            <p>Para crear una nueva contraseña, haz clic en el siguiente botón:</p>

                            <div style="text-align: center;">
                                <a href="${resetLink}" class="button">Restablecer Contraseña</a>
                            </div>

                            <div class="warning">
                                <p><strong>⚠️ Importante:</strong></p>
                                <ul>
                                    <li>Este enlace expirará en 1 hora</li>
                                    <li>Si no solicitaste este cambio, ignora este correo</li>
                                    <li>Tu contraseña no cambiará hasta que accedas al enlace y crees una nueva</li>
                                </ul>
                            </div>

                            <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                            <p style="word-break: break-all; color: #4F46E5;">${resetLink}</p>
                        </div>
                        <div class="footer">
                            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                            <p>&copy; 2025 Tienda en Línea. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('Correo de recuperación de contraseña enviado:', result);
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Error al enviar correo de recuperación de contraseña:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new EmailService();