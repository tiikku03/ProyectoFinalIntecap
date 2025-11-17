const { cancelarPedido, editarEstadoPedido } = require("../Services/pedidos.service.js");
const { successResponse, errorResponse } = require('../utils/responseHelper');

async function controllerCancelarPedido(req, res){
    try{
        const resultado = await cancelarPedido(req.body);
        return successResponse(res, 200, "Pedido cancelado correctamente", resultado);
    }catch(error){
        return errorResponse(res, error.status || 500, error.message || "Error interno del servidor", error.code || "INTERNAL_ERROR");
    }
}


async function controllerEditarEstadoPedido(req, res){
    try {
        const resultado = await editarEstadoPedido(req.body);
        return successResponse(res, 200, "Estado del pedido actualizado correctamente", resultado);
    } catch (error) {
        return errorResponse(res, error.status || 500, error.message || "Error interno del servidor", error.code || "INTERNAL_ERROR");
    }
}


module.exports = {controllerCancelarPedido, controllerEditarEstadoPedido};