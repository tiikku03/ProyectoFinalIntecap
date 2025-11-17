const { cancelarPedido, editarEstadoPedido } = require("../Services/pedidos.service.js");

async function controllerCancelarPedido(req, res){
    try{
        const resultado = await cancelarPedido(req.body);
        res.status(200).json(resultado);
    }catch(error){
        res.status(error.status || 500).json({
            success: false,
            message: error.message,
        });
    }
}


async function controllerEditarEstadoPedido(req, res){
    try {
        const resultado = await editarEstadoPedido(req.body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message,
        });
    }
}


module.exports = {controllerCancelarPedido, controllerEditarEstadoPedido};