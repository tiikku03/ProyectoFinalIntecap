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

// ===================================================================
// LEER PEDIDOS CON PAGINACIÓN
// ===================================================================

router.get("/leerpedidos", async (req, res) => {
  try {
    let page = parseInt(req.query.page, 10);

    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const limit = 10;
    const skip = (page - 1) * limit;

    const [pedidos, total] = await Promise.all([
      prisma.pedidos.findMany({
        skip,
        take: limit,
        orderBy: { fecha_pedido: "desc" },
        include: {
          usuarios: {
            select: {
              nombre: true,
              apellido: true,
              email: true
            }
          }
        }
      }),
      prisma.pedidos.count()
    ]);

    const totalPaginas = Math.ceil(total / limit);

    return successResponse(res, 200, "Pedidos obtenidos correctamente", {
      page,
      totalPaginas,
      totalPedidos: total,
      hasNextPage: page < totalPaginas,
      pedidos
    });

  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    return errorResponse(res, 500, "Error interno del servidor al obtener pedidos", "INTERNAL_ERROR");
  }
});

// ===================================================================
// OBTENER TOTAL DE PEDIDOS
// ===================================================================

router.get("/total", async (req, res) => {
  try {
    const totalPedidos = await prisma.pedidos.count();
    
    return successResponse(res, 200, "Total de pedidos obtenido correctamente", {
      total: totalPedidos
    });
  } catch (error) {
    console.error("Error al obtener total de pedidos:", error);
    return errorResponse(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
  }
});

module.exports = router;


