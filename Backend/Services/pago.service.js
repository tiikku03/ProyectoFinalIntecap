const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Crear una intención de pago con Stripe (SIMULADO - SIN API REAL)
 */
async function crearIntencionPagoStripe(datos) {
    const { idPedido, monto, moneda = 'usd' } = datos;

    try {
        const paymentIntentId = `pi_sim_${Date.now()}`;
        const clientSecret = `${paymentIntentId}_secret`;

        console.log(`[SIMULADO] Pago Stripe - Pedido: ${idPedido}, Monto: ${monto} ${moneda}`);

        return {
            clientSecret: clientSecret,
            paymentIntentId: paymentIntentId,
        };
    } catch (error) {
        console.error('Error al simular pago Stripe:', error);
        throw {
            status: 500,
            message: 'Error al procesar el pago',
            code: 'PAYMENT_ERROR',
        };
    }
}

/**
 * Confirmar pago de Stripe (SIMULADO - SIN API REAL)
 */
async function confirmarPagoStripe(datos) {
    const { paymentIntentId, idPedido } = datos;

    try {
        console.log(`[SIMULADO] Confirmando pago Stripe - Pedido: ${idPedido}`);

        // Actualizar el estado del pedido como confirmado
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
    } catch (error) {
        console.error('Error al confirmar pago:', error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error al confirmar el pago',
            code: error.code || 'PAYMENT_CONFIRM_ERROR',
        };
    }
}

/**
 * Crear orden de PayPal (SIMULADO - SIN API REAL)
 */
async function crearOrdenPayPal(datos) {
    const { idPedido, monto, moneda = 'USD' } = datos;

    try {
        const orderId = `PAYPAL_SIM_${Date.now()}`;

        console.log(`[SIMULADO] Orden PayPal - Pedido: ${idPedido}, Monto: ${monto} ${moneda}`);

        return {
            orderId: orderId,
            approvalUrl: '#',
            message: 'Orden de PayPal creada (simulada)',
        };
    } catch (error) {
        console.error('Error al simular orden PayPal:', error);
        throw {
            status: 500,
            message: 'Error al procesar el pago',
            code: 'PAYMENT_ERROR',
        };
    }
}

/**
 * Capturar pago de PayPal (SIMULADO - SIN API REAL)
 */
async function capturarPagoPayPal(datos) {
    const { orderId, idPedido } = datos;

    try {
        console.log(`[SIMULADO] Capturando pago PayPal - Pedido: ${idPedido}`);

        // Actualizar el estado del pedido
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
        console.error('Error al capturar pago:', error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error al confirmar el pago',
            code: error.code || 'PAYMENT_CAPTURE_ERROR',
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