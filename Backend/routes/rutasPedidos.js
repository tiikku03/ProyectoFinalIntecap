const express = require("express");
const {controllerCancelarPedido, controllerEditarEstadoPedido} = require("../Controllers/pedido.controller.js");
const { obtenerPedidoPorId } = require("../Services/pedidos.service.js");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { successResponse, errorResponse } = require('../utils/responseHelper');
const emailService = require('../Services/emailService');

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

    let {
      usuario_id,
      productos,
      metodoPago,
      estado,
      direccion,
      total,
      datosEnvio // Nuevo: datos del formulario de envío
    } = req.body;

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

    // Crear detalles del pedido y obtener información de productos
    const detallesPedido = [];
    for (let producto of productos) {
      await prisma.detalle_pedido.create({
        data: {
          cantidad: Number(producto.cantidad),
          id_pedido: agregarNuevoPedido.id_pedido,
          id_producto: Number(producto.productoId)
        },
      });

      // Obtener información del producto para el correo
      const productoInfo = await prisma.productos.findUnique({
        where: { id_producto: Number(producto.productoId) }
      });

      detallesPedido.push({
        nombre: productoInfo.nombre,
        cantidad: Number(producto.cantidad),
        precio: productoInfo.precio
      });
    }

    // Determinar el email y nombre para el correo
    let emailDestino, nombreCompleto;

    if (datosEnvio && datosEnvio.email) {
      // Si se proporcionaron datos del formulario, usarlos
      emailDestino = datosEnvio.email;
      nombreCompleto = `${datosEnvio.nombre || ''} ${datosEnvio.apellido || ''}`.trim();
    } else {
      // Si no, obtener del usuario registrado
      const usuario = await prisma.usuarios.findUnique({
        where: { id_usuario: Number(usuario_id) }
      });

      if (usuario) {
        emailDestino = usuario.email;
        nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
      }
    }

    // Enviar correo de confirmación de pedido
    if (emailDestino) {
      try {
        await emailService.enviarConfirmacionPedido(
          emailDestino,
          nombreCompleto,
          {
            id_pedido: agregarNuevoPedido.id_pedido,
            fecha_pedido: agregarNuevoPedido.fecha_pedido,
            estado: agregarNuevoPedido.estado,
            total: agregarNuevoPedido.total,
            items: detallesPedido
          }
        );
        console.log(`Correo de confirmación enviado a: ${emailDestino}`);
      } catch (emailError) {
        console.error('Error al enviar correo de confirmación:', emailError);
        // No fallar la creación del pedido si el email falla
      }
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

// ===================================================================
// OBTENER PEDIDOS POR USUARIO
// ===================================================================
router.get("/usuario/:idUsuario", async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { estado } = req.query;

    if (!idUsuario) {
      return errorResponse(res, 400, "ID de usuario es requerido", "MISSING_USER_ID");
    }

    // Construir filtro dinámico
    const filtro = {
      id_usuario: Number(idUsuario)
    };

    // Si se especifica un estado, agregarlo al filtro
    if (estado && estado !== "todos") {
      filtro.estado = estado;
    }

    const pedidos = await prisma.pedidos.findMany({
      where: filtro,
      orderBy: { fecha_pedido: "desc" },
      include: {
        detalle_pedido: {
          include: {
            productos: {
              select: {
                nombre: true,
                precio: true,
                url_imagen: true
              }
            }
          }
        }
      }
    });

    return successResponse(res, 200, "Pedidos del usuario obtenidos correctamente", {
      pedidos,
      total: pedidos.length
    });
  } catch (error) {
    console.error("Error al obtener pedidos del usuario:", error);
    return errorResponse(res, 500, "Error interno del servidor al obtener pedidos", "INTERNAL_ERROR");
  }
});

// ===================================================================
// OBTENER PEDIDO POR ID (esta ruta debe ir al final)
// ===================================================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await obtenerPedidoPorId(id);

    return res.status(200).json(pedido);
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    return errorResponse(
      res,
      error.status || 500,
      error.message || "Error al obtener el pedido",
      error.code || "INTERNAL_ERROR"
    );
  }
});

module.exports = router;


