const express = require('express');
const {
    controllerCrearPedido,
    controllerCrearIntencionPagoStripe,
    controllerConfirmarPagoStripe,
    controllerCrearOrdenPayPal,
    controllerCapturarPagoPayPal,
} = require('../Controllers/pago.controller.js');

const router = express.Router();

router.use(express.json());

// ==================================================
// CREAR PEDIDO DESDE CARRITO
// ==================================================
router.post('/crear-pedido', (req, res, next) => {
    console.log('🔵 RUTA /pagos/crear-pedido LLAMADA');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
}, controllerCrearPedido);

// ==================================================
// STRIPE - Crear intención de pago
// ==================================================
router.post('/stripe/crear-intencion', controllerCrearIntencionPagoStripe);

// ==================================================
// STRIPE - Confirmar pago
// ==================================================
router.post('/stripe/confirmar-pago', controllerConfirmarPagoStripe);

// ==================================================
// PAYPAL - Crear orden
// ==================================================
router.post('/paypal/crear-orden', controllerCrearOrdenPayPal);

// ==================================================
// PAYPAL - Capturar pago
// ==================================================
router.post('/paypal/capturar-pago', controllerCapturarPagoPayPal);

module.exports = router;