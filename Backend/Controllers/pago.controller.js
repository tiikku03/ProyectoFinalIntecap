const {
    crearIntencionPagoStripe,
    confirmarPagoStripe,
    crearOrdenPayPal,
    capturarPagoPayPal,
    crearPedidoDesdeCarrito,
} = require('../Services/pago.service.js');
const { successResponse, errorResponse } = require('../utils/responseHelper');

/**
 * Crear un nuevo pedido desde el carrito
 */
async function controllerCrearPedido(req, res) {
    try {
        console.log('========== CREAR PEDIDO ENDPOINT LLAMADO ==========');
        console.log('Body recibido:', JSON.stringify(req.body, null, 2));

        const { idUsuario, datosEnvio, metodoPago, productos, total } = req.body;

        console.log('idUsuario:', idUsuario);
        console.log('datosEnvio:', datosEnvio);
        console.log('metodoPago:', metodoPago);

        if (!idUsuario || !datosEnvio || !metodoPago) {
            console.log('ERROR: Faltan datos requeridos');
            return errorResponse(
                res,
                400,
                'Faltan datos requeridos',
                'MISSING_REQUIRED_FIELDS'
            );
        }

        console.log('Llamando a crearPedidoDesdeCarrito...');
        const resultado = await crearPedidoDesdeCarrito({
            idUsuario,
            datosEnvio,
            metodoPago,
            productos,
            total,
        });
        console.log('Pedido creado exitosamente:', resultado.id_pedido);

        return successResponse(
            res,
            201,
            'Pedido creado exitosamente',
            { pedido: resultado }
        );
    } catch (error) {
        return errorResponse(
            res,
            error.status || 500,
            error.message || 'Error al crear el pedido',
            error.code || 'INTERNAL_ERROR'
        );
    }
}

/**
 * Crear intención de pago con Stripe
 */
async function controllerCrearIntencionPagoStripe(req, res) {
    try {
        const { idPedido, monto, moneda } = req.body;

        if (!idPedido || !monto) {
            return errorResponse(
                res,
                400,
                'Faltan datos requeridos (idPedido, monto)',
                'MISSING_REQUIRED_FIELDS'
            );
        }

        const resultado = await crearIntencionPagoStripe({
            idPedido,
            monto,
            moneda,
        });

        return successResponse(
            res,
            200,
            'Intención de pago creada exitosamente',
            resultado
        );
    } catch (error) {
        return errorResponse(
            res,
            error.status || 500,
            error.message || 'Error al crear intención de pago',
            error.code || 'INTERNAL_ERROR'
        );
    }
}

/**
 * Confirmar pago con Stripe
 */
async function controllerConfirmarPagoStripe(req, res) {
    try {
        const { paymentIntentId, idPedido } = req.body;

        if (!paymentIntentId || !idPedido) {
            return errorResponse(
                res,
                400,
                'Faltan datos requeridos (paymentIntentId, idPedido)',
                'MISSING_REQUIRED_FIELDS'
            );
        }

        const resultado = await confirmarPagoStripe({
            paymentIntentId,
            idPedido,
        });

        return successResponse(
            res,
            200,
            'Pago confirmado exitosamente',
            resultado
        );
    } catch (error) {
        return errorResponse(
            res,
            error.status || 500,
            error.message || 'Error al confirmar el pago',
            error.code || 'INTERNAL_ERROR'
        );
    }
}

/**
 * Crear orden con PayPal
 */
async function controllerCrearOrdenPayPal(req, res) {
    try {
        const { idPedido, monto, moneda } = req.body;

        if (!idPedido || !monto) {
            return errorResponse(
                res,
                400,
                'Faltan datos requeridos (idPedido, monto)',
                'MISSING_REQUIRED_FIELDS'
            );
        }

        const resultado = await crearOrdenPayPal({
            idPedido,
            monto,
            moneda,
        });

        return successResponse(
            res,
            200,
            'Orden de PayPal creada exitosamente',
            resultado
        );
    } catch (error) {
        return errorResponse(
            res,
            error.status || 500,
            error.message || 'Error al crear orden de PayPal',
            error.code || 'INTERNAL_ERROR'
        );
    }
}

/**
 * Capturar pago con PayPal
 */
async function controllerCapturarPagoPayPal(req, res) {
    try {
        const { orderId, idPedido } = req.body;

        if (!orderId || !idPedido) {
            return errorResponse(
                res,
                400,
                'Faltan datos requeridos (orderId, idPedido)',
                'MISSING_REQUIRED_FIELDS'
            );
        }

        const resultado = await capturarPagoPayPal({
            orderId,
            idPedido,
        });

        return successResponse(
            res,
            200,
            'Pago con PayPal capturado exitosamente',
            resultado
        );
    } catch (error) {
        return errorResponse(
            res,
            error.status || 500,
            error.message || 'Error al capturar pago de PayPal',
            error.code || 'INTERNAL_ERROR'
        );
    }
}

module.exports = {
    controllerCrearPedido,
    controllerCrearIntencionPagoStripe,
    controllerConfirmarPagoStripe,
    controllerCrearOrdenPayPal,
    controllerCapturarPagoPayPal,
};
