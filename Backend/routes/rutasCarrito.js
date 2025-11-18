const express = require('express');
const router = express.Router();
const carritoController = require('../Controllers/carrito.controller');

// Middleware para que el router pueda leer JSON
router.use(express.json());

// GET - Obtener carrito por ID de usuario
// Parámetro URL: idUsuario (número)
// Ejemplo: GET /carrito/usuario/5
router.get('/usuario/:idUsuario', carritoController.obtenerCarritoPorUsuario);

// POST - Agregar producto al carrito
// Body JSON: { "idCarrito": 1, "idProducto": 10, "cantidad": 2 }
// Si el producto ya existe, suma la cantidad enviada a la existente
router.post('/agregarproducto', carritoController.agregarProductoAlCarrito);

// PUT - Actualizar cantidad de un producto específico
// Body JSON: { "idCarrito": 1, "idProducto": 10, "cantidad": 5 }
// Reemplaza la cantidad existente con la nueva cantidad enviada
router.put('/actualizar', carritoController.actualizarCantidadProducto);

// DELETE - Eliminar un producto específico del carrito
// Body JSON: { "idCarrito": 1, "idProducto": 10 }
router.delete('/eliminar', carritoController.eliminarProductoDelCarrito);

// DELETE - Vaciar carrito completo (elimina todos los productos)
// Parámetro URL: idCarrito (número)
// Ejemplo: DELETE /carrito/vaciar/1
router.delete('/vaciar/:idCarrito', carritoController.vaciarCarrito);

module.exports = router;



