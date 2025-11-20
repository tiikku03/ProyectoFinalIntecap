const {getProductosPorCategoria} = require('../Services/productos.service');
const { successResponse, errorResponse } = require('../utils/responseHelper');


async function obtnerProductosPorCategoria(req, res) {
    const categoria = req.query.categoria;
    try {
        const productos = await getProductosPorCategoria(categoria);
        successResponse(res, 200, "Productos obtenidos exitosamente", productos);
    } catch (error) {
        errorResponse(res, 500, "Error al obtener productos");
    }
    
}

module.exports = {
    obtnerProductosPorCategoria
}