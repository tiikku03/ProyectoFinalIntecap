const Stripe = require('stripe');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inicializar Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Crear una intención de pago con Stripe
 */
async function crearIntencionPagoStripe(datos) {
    const { idPedido, monto, moneda = 'usd' } = datos;

    try {
        // Crear la intención de pago
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(monto * 100), // Stripe maneja centavos
            currency: moneda,
            metadata: {
                idPedido: idPedido.toString(),
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        };
    } catch (error) {
        console.error('Error al crear intención de pago Stripe:', error);
        throw {
            status: 500,
            message: 'Error al procesar el pago con Stripe',
            code: 'STRIPE_ERROR',
        };
    }
}

/**
 * Confirmar pago de Stripe
 */
async function confirmarPagoStripe(datos) {
    const { paymentIntentId, idPedido } = datos;

    try {
        // Verificar el estado del pago
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Actualizar el estado del pedido en la base de datos
            await prisma.pedidos.update({
                where: { id_pedido: idPedido },
                data: {
                    estado: 'Confirmado',
                    id_transaccion: paymentIntentId,
                    metodo_pago: 'Stripe',
                },
            });

            return {
                success: true,
                message: 'Pago confirmado exitosamente',
                transactionId: paymentIntentId,
            };
        } else {
            throw {
                status: 400,
                message: 'El pago no fue exitoso',
                code: 'PAYMENT_NOT_SUCCESSFUL',
            };
        }
    } catch (error) {
        console.error('Error al confirmar pago Stripe:', error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error al confirmar el pago',
            code: error.code || 'STRIPE_CONFIRM_ERROR',
        };
    }
}

/**
 * Crear orden de PayPal
 */
async function crearOrdenPayPal(datos) {
    const { idPedido, monto, moneda = 'USD' } = datos;

    try {
        // Nota: Necesitarás configurar el SDK de PayPal según la nueva versión
        // Por ahora, retornamos una estructura básica
        // En producción, debes implementar la integración completa con PayPal

        return {
            orderId: `PAYPAL_ORDER_${Date.now()}`,
            approvalUrl: `https://www.sandbox.paypal.com/checkoutnow?token=PAYPAL_ORDER_${Date.now()}`,
            message: 'Orden de PayPal creada. Redirige al usuario a approvalUrl',
        };
    } catch (error) {
        console.error('Error al crear orden PayPal:', error);
        throw {
            status: 500,
            message: 'Error al procesar el pago con PayPal',
            code: 'PAYPAL_ERROR',
        };
    }
}

/**
 * Capturar pago de PayPal
 */
async function capturarPagoPayPal(datos) {
    const { orderId, idPedido } = datos;

    try {
        // Aquí implementarías la captura real del pago con PayPal
        // Por ahora, simulamos una respuesta exitosa

        // Actualizar el estado del pedido en la base de datos
        await prisma.pedidos.update({
            where: { id_pedido: idPedido },
            data: {
                estado: 'Confirmado',
                id_transaccion: orderId,
                metodo_pago: 'PayPal',
            },
        });

        return {
            success: true,
            message: 'Pago con PayPal confirmado exitosamente',
            transactionId: orderId,
        };
    } catch (error) {
        console.error('Error al capturar pago PayPal:', error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error al confirmar el pago con PayPal',
            code: error.code || 'PAYPAL_CAPTURE_ERROR',
        };
    }
}

/**
 * Crear pedido desde el carrito
 */
async function crearPedidoDesdeCarrito(datos) {
    const { idUsuario, datosEnvio, metodoPago, productos, total } = datos;

    try {
        // Validar que se enviaron productos
        if (!productos || productos.length === 0) {
            throw {
                status: 400,
                message: 'No se enviaron productos para el pedido',
                code: 'NO_PRODUCTS',
            };
        }

        // Crear el pedido
        const pedido = await prisma.pedidos.create({
            data: {
                id_usuario: idUsuario,
                total: total,
                estado: 'Pendiente',
                metodo_pago: metodoPago,
                direccion_envio: `${datosEnvio.direccion}, ${datosEnvio.departamento}, ${datosEnvio.codigoPostal}, ${datosEnvio.pais}`,
                detalle_pedido: {
                    create: productos.map(item => ({
                        id_producto: item.ProductoID,
                        cantidad: item.Cantidad,
                    })),
                },
            },
            include: {
                detalle_pedido: {
                    include: {
                        productos: true,
                    },
                },
            },
        });

        // Vaciar el carrito del usuario
        const carrito = await prisma.carrito.findFirst({
            where: { id_usuario: idUsuario },
        });

        if (carrito) {
            await prisma.detalle_carrito.deleteMany({
                where: { CarritoID: carrito.id_carrito },
            });
        }

        return pedido;
    } catch (error) {
        console.error('Error al crear pedido:', error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error al crear el pedido',
            code: error.code || 'CREATE_ORDER_ERROR',
        };
    }
}

module.exports = {
    crearIntencionPagoStripe,
    confirmarPagoStripe,
    crearOrdenPayPal,
    capturarPagoPayPal,
    crearPedidoDesdeCarrito,
};
