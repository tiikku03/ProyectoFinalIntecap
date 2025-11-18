const carritoService = require('../Services/carrito.service');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// Obtener carrito por ID de usuario
async function obtenerCarritoPorUsuario(req, res) {
    try {
        const { idUsuario } = req.params;
        const carrito = await carritoService.obtenerCarritoPorUsuario(idUsuario);
        
        if (!carrito) {
            return errorResponse(res, 404, 'Carrito no encontrado');
        }
        
        return successResponse(res, 200, 'Carrito obtenido exitosamente', carrito);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
}

// Agregar producto al carrito
async function agregarProductoAlCarrito(req, res) {
    try {
        const { idCarrito, idProducto, cantidad } = req.body;
        
        if (!idCarrito || !idProducto || !cantidad) {
            return errorResponse(res, 400, 'Faltan datos requeridos');
        }
        
        const item = await carritoService.agregarProductoAlCarrito({
            idCarrito,
            idProducto,
            cantidad
        });
        
        return successResponse(res, 200, 'Producto agregado al carrito', item);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
}

// Actualizar cantidad de un producto
async function actualizarCantidadProducto(req, res) {
    try {
        const { idCarrito, idProducto, cantidad } = req.body;
        
        if (!idCarrito || !idProducto || cantidad === undefined) {
            return errorResponse(res, 400, 'Faltan datos requeridos');
        }
        
        const item = await carritoService.actualizarCantidadProducto({
            idCarrito,
            idProducto,
            cantidad
        });
        
        return successResponse(res, 200, 'Cantidad actualizada', item);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
}

// Eliminar producto del carrito
async function eliminarProductoDelCarrito(req, res) {
    try {
        const { idCarrito, idProducto } = req.body;
        
        if (!idCarrito || !idProducto) {
            return errorResponse(res, 400, 'Faltan datos requeridos');
        }
        
        await carritoService.eliminarProductoDelCarrito({
            idCarrito,
            idProducto
        });
        
        return successResponse(res, 200, 'Producto eliminado del carrito');
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
}

// Vaciar carrito completo
async function vaciarCarrito(req, res) {
    try {
        const { idCarrito } = req.params;
        
        await carritoService.vaciarCarrito(idCarrito);
        
        return successResponse(res, 200, 'Carrito vaciado exitosamente');
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
}

module.exports = {
    obtenerCarritoPorUsuario,
    agregarProductoAlCarrito,
    actualizarCantidadProducto,
    eliminarProductoDelCarrito,
    vaciarCarrito
};
