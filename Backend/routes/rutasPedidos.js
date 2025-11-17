const express = require("express");
const {controllerCancelarPedido, controllerEditarEstadoPedido} = require("../Controllers/pedido.controller.js");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { successResponse, errorResponse } = require('../utils/responseHelper');

const prisma = new PrismaClient();

router.use(express.json());

//==================================================
// CREAR NUEVO PEDIDO
//==================================================

router.post("/crearpedido", async (req, res) => {
  try {
    const response = {
      success: true,
      message: "",
      data: {},
      error: null,
    };

    let { usuario_id, productos, metodoPago, estado, direccion, total } =
      req.body;

    // Si productos es un string, parsearlo a array
    if (typeof productos === "string") {
      try {
        productos = JSON.parse(productos);
      } catch (e) {
        return errorResponse(res, 400, "El formato de productos es inválido", "INVALID_FORMAT");
      }
    }

    if (
      !usuario_id ||
      !productos ||
      !metodoPago ||
      !estado ||
      !direccion ||
      !total
    ) {
      return errorResponse(res, 400, "Todos los campos son obligatorios", "MISSING_FIELDS");
    }

    const agregarNuevoPedido = await prisma.pedidos.create({
      data: {
        id_usuario: Number(usuario_id),
        metodo_pago: metodoPago,
        direccion_envio: direccion,
        estado: "Pendiente",
        total: total,
      },
    });

    for (let producto of productos) {
      await prisma.detalle_pedido.create({
        data: {
          cantidad: Number(producto.cantidad),
          id_pedido: agregarNuevoPedido.id_pedido,
          id_producto: Number(producto.productoId)
        },
      });
    }

    return successResponse(res, 201, "Pedido creado correctamente", {
      pedido: agregarNuevoPedido,
      productos: productos
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    return errorResponse(res, 500, "Error interno del servidor al crear pedido", "INTERNAL_ERROR");
  }
});


router.delete("/cancelarpedido", controllerCancelarPedido);

router.put("/editarestadopedido", controllerEditarEstadoPedido);

module.exports = router;


