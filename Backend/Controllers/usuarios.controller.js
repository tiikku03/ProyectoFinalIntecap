const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { successResponse, errorResponse } = require('../utils/responseHelper');

// Obtener todos los usuarios
async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuarios.findMany({
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        email: true,
        telefono: true,
        fecha_registro: true,
        rol: true
      },
      orderBy: { id_usuario: 'asc' }
    });
    return successResponse(res, 200, 'Usuarios obtenidos correctamente', usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return errorResponse(res, 500, 'Error interno del servidor', 'INTERNAL_ERROR');
  }
}

module.exports = { obtenerUsuarios };
