
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const emailService = require('./emailService');

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
    include: {
      usuarios: true
    }
  });

  // Enviar correo de notificación de cancelación
  try {
    await emailService.enviarActualizacionEstadoPedido(
      pedidoCancelado.usuarios.email,
      `${pedidoCancelado.usuarios.nombre} ${pedidoCancelado.usuarios.apellido}`,
      pedidoCancelado.id_pedido,
      "Cancelado"
    );
    console.log('Correo de cancelación de pedido enviado exitosamente');
  } catch (emailError) {
    console.error('Error al enviar correo de cancelación:', emailError);
    // No fallar la cancelación si el email falla
  }

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
    data: { estado: nuevoEstado },
    include: {
      usuarios: true
    }
  });

  // Enviar correo de notificación de cambio de estado
  try {
    await emailService.enviarActualizacionEstadoPedido(
      pedidoActualizado.usuarios.email,
      `${pedidoActualizado.usuarios.nombre} ${pedidoActualizado.usuarios.apellido}`,
      pedidoActualizado.id_pedido,
      nuevoEstado
    );
    console.log('Correo de actualización de estado enviado exitosamente');
  } catch (emailError) {
    console.error('Error al enviar correo de actualización:', emailError);
    // No fallar la actualización si el email falla
  }

  return pedidoActualizado;
}



async function obtenerPedidoPorId(idPedido) {
  try {
    const pedido = await prisma.pedidos.findUnique({
      where: { id_pedido: Number(idPedido) },
      include: {
        detalle_pedido: {
          include: {
            productos: true,
          },
        },
        usuarios: {
          select: {
            id_usuario: true,
            nombre: true,
            apellido: true,
            email: true,
          },
        },
      },
    });

    if (!pedido) {
      throw {
        status: 404,
        message: "Pedido no encontrado",
        code: "ORDER_NOT_FOUND",
      };
    }

    console.log('===== PEDIDO ENCONTRADO =====');
    console.log(JSON.stringify(pedido, null, 2));

    return pedido;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Error al obtener el pedido",
      code: error.code || "INTERNAL_ERROR",
    };
  }
}

module.exports = { cancelarPedido, editarEstadoPedido, obtenerPedidoPorId };
