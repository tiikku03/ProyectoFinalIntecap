/*
Responsabilidad: Toda la lógica de negocio. Aquí van consultas DB,
-> validaciones, cálculos, integraciones, JWT, etc.
-> Lógica de negocio
-> Consultas a base de datos
-> Creación de tokens
-> Validaciones internas
-> Manejo de errores con


import { db } from "../db/connection.js"; // Prisma / Mongoose / MySQL
import { createToken } from "../utils/jwt.js";

export const accion = async (data) => {
  const registro = await db.modelo.findUnique({
    where: { id: data.id },
  });

  if (!registro) {
    throw {
      status: 404,
      message: "Registro no encontrado",
      code: "NOT_FOUND",
    };
  }

  // Lógica de negocio
  const token = createToken({ id: registro.id });

  return { registro, token };
};
*/

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function cancelarPedido(data) {
  const { idPedido } = data;
  const pedido = await prisma.pedidos.findUnique({
    where: { id_pedido: Number(idPedido) },
  });
  if (!pedido) {
     throw {
      status: 400,
      message: "No se ha encontrado el pedido",
      code: "CANNOT_CANCEL",
    };
  }
  if (pedido.esstado === "Cancelado") {
    throw new Error("El pedido ya está cancelado");
  }
  if (pedido.estado === "Enviado" || pedido.estado === "Entregado") {
    throw new Error("No se puede cancelar un pedido que ya ha sido enviado o entregado");
  }
  const pedidoCancelado = await prisma.pedidos.update({
    where: { id_pedido: Number(idPedido) },
    data: { estado: "Cancelado" },
  })

  return pedidoCancelado;

}

const editarEstadoPedido = async (data) => {
  const { idPedido, nuevoEstado } = data;
  const pedido = await prisma.pedidos.findUnique({
    where: { id_pedido: Number(idPedido) }
  })

  if (!pedido) {
    throw{
      status: 400,
      message: "pedido no encontrado",
      code: "ORDER_NOT_FOUND",
    }
  }

  const pedidoActualizado = await prisma.pedidos.update({
    where: { id_pedido: Number(idPedido) },
    data: { estado: nuevoEstado }
  })
  return pedidoActualizado;
}


const agregarProductosPedido = async (data) => {
  const { idPedido, productos } = data;

  const pedido = await prisma.pedidos.findUnique({
    where: { id_pedido: Number(idPedido) }
  })

  if (!pedido) {
    throw{
      status: 400,
      message: "pedido no encontrado",
      code: "ORDER_NOT_FOUND",
    }
  }

  if(pedido.estado !== "Pendiente" && pedido.estado !== "Procesando") {
    throw{
      status: 400,
      message: "No se pueden agregar productos a un pedido que no está pendiente",
      code: "CANNOT_ADD_PRODUCTS",
    }
  }
}



export { cancelarPedido, editarEstadoPedido };
