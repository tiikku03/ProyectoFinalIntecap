
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function cancelarPedido(data) {
  const { idPedido } = data;
  const pedido = await prisma.pedidos.findUnique({
    where: { id_pedido: Number(idPedido) },
  });
  if (!pedido) {
    throw {
      status: 404,
      message: "No se ha encontrado el pedido",
      code: "ORDER_NOT_FOUND",
    };
  }
  if (pedido.estado === "Cancelado") {
    throw {
      status: 400,
      message: "El pedido ya está cancelado",
      code: "ALREADY_CANCELLED",
    };
  }
  if (pedido.estado === "Enviado" || pedido.estado === "Entregado") {
    throw {
      status: 400,
      message: "No se puede cancelar un pedido que ya ha sido enviado o entregado",
      code: "CANNOT_CANCEL",
    };
  }
  const pedidoCancelado = await prisma.pedidos.update({
    where: { id_pedido: Number(idPedido) },
    data: { estado: "Cancelado" },
  });

  return pedidoCancelado;

}



const editarEstadoPedido = async (data) => {
  const { idPedido, nuevoEstado } = data;
  const pedido = await prisma.pedidos.findUnique({
    where: { id_pedido: Number(idPedido) }
  });

  if (!pedido) {
    throw {
      status: 404,
      message: "Pedido no encontrado",
      code: "ORDER_NOT_FOUND",
    };
  }
  if (pedido.estado === "Cancelado") {
    throw {
        status: 400,
        message: "No se puede cambiar el estado de un pedido cancelado",
        code: "CANNOT_CHANGE_CANCELLED_ORDER",
    };
  }

  const pedidoActualizado = await prisma.pedidos.update({
    where: { id_pedido: Number(idPedido) },
    data: { estado: nuevoEstado }
  });
  return pedidoActualizado;
}



module.exports = { cancelarPedido, editarEstadoPedido };
