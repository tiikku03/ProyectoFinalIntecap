const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

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
        return res.status(400).send({
          ...response,
          success: false,
          message: "El formato de productos es inválido"
        });
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
      return res
        .status(401)
        .send({ ...response, message: "todos los campos son obligatorios" });
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

    res
      .status(200)
      .send({
      ...response,
      message: "agrecados correctamente",
      data: productos,
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});


router.delete("/canclarpedido", (req, res) => {});

module.exports = router;


