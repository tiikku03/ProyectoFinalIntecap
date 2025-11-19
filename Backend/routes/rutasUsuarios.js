const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successResponse, errorResponse } = require('../utils/responseHelper');
const { obtenerUsuarios } = require('../Controllers/usuarios.controller');

router.use(express.json());

router.post("/crearusuario", async (req, res) => {
  try {
    //recibiendo informacion del nuevo usuario
    const { nombre, apellido, correo, contraseña } = req.body;

    if (!nombre || !apellido || !correo || !contraseña) {
      return errorResponse(res, 400, "Faltan datos obligatorios", "MISSING_FIELDS");
    }

    //validar si ya existe el correo
    let localizandoUsuario = await prisma.usuarios.findUnique({
      where: { email: correo },
    });
    console.log(localizandoUsuario);

    if (localizandoUsuario) {
      return errorResponse(res, 400, "El correo ya esta registrado", "EMAIL_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // creando el  nuevo usuario
    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        nombre: nombre,
        apellido: apellido,
        email: correo,
        contrase_a: hashedPassword,
        rol: "usuario",
      },
    });

    await prisma.carrito.create({
      data: {
        id_usuario: nuevoUsuario.id_usuario
      }
    });

    return successResponse(res, 201, "Usuario creado correctamente", {
      id_usuario: nuevoUsuario.id_usuario,
      nombre: nuevoUsuario.nombre,
      apellido: nuevoUsuario.apellido,
      correo: nuevoUsuario.email,
      rol: nuevoUsuario.rol
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return errorResponse(res, 500, "Error interno del servidor al crear el usuario", "INTERNAL_ERROR");
  }
});

// ===================================================================
// AUTORIZAR USUARIO
// ===================================================================

router.post("/autorizarusuario", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) {
      return errorResponse(res, 400, "Faltan datos obligatorios", "MISSING_FIELDS");
    }
    let usuario = await prisma.usuarios.findFirst({
      where: { email: correo },
    });
    if (!usuario) {
      return errorResponse(res, 404, "Usuario no encontrado", "USER_NOT_FOUND");
    }
    const isPasswordValid = await bcrypt.compare(
      contraseña,
      usuario.contrase_a
    );

    if (!isPasswordValid) {
      return errorResponse(res, 401, "Contraseña incorrecta", "INVALID_PASSWORD");
    }

    return successResponse(res, 200, "Usuario autenticado correctamente", {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.email,
      rol: usuario.rol
    });
  } catch (error) {
    console.error("Error al autorizar usuario:", error);
    return errorResponse(res, 500, "Error interno del servidor al autorizar el usuario", "INTERNAL_ERROR");
  }
});

// ===================================================================
// OBTENER TOTAL DE USUARIOS
// ===================================================================

router.get("/total", async (req, res) => {
  try {
    const totalUsuarios = await prisma.usuarios.count();
    
    return successResponse(res, 200, "Total de usuarios obtenido correctamente", {
      total: totalUsuarios
    });
  } catch (error) {
    console.error("Error al obtener total de usuarios:", error);
    return errorResponse(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
  }
});

// ===================================================================
// OBTENER ESTADÍSTICAS DE USUARIOS
// ===================================================================

router.get("/estadisticas", async (req, res) => {
  try {
    const [total, usuarios, admins] = await Promise.all([
      prisma.usuarios.count(),
      prisma.usuarios.count({
        where: { rol: 'usuario' }
      }),
      prisma.usuarios.count({
        where: { rol: 'admin' }
      })
    ]);

    return successResponse(res, 200, "Estadísticas obtenidas correctamente", {
      total: total,
      admins: admins,
      usuarios: usuarios
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return errorResponse(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
  }
});

// ===================================================================
// ELIMINAR USUARIO
// ===================================================================

router.delete("/eliminarusuario/:id", async (req, res) => {
  const idUsuario = parseInt(req.params.id);

  try {
    // Verificar que el usuario existe
    const usuario = await prisma.usuarios.findUnique({
      where: { id_usuario: idUsuario }
    });

    if (!usuario) {
      return errorResponse(res, 404, "Usuario no encontrado", "USER_NOT_FOUND");
    }

    // Eliminar en orden correcto para evitar errores de clave foránea
    
    // 1. Eliminar carrito del usuario
    await prisma.carito.deleteMany({
      where: { id_usuario: idUsuario }
    });


    await prisma.resenas.deleteMany({
      where: { id_usuario: idUsuario }
    });

    await prisma.wishlist.deleteMany({
      where: { id_usuario: idUsuario }
    });

    const pedidos = await prisma.pedidos.findMany({
      where: { id_usuario: idUsuario }
    });

    for (let pedido of pedidos) {
      await prisma.detalle_pedido.deleteMany({
        where: { id_pedido: pedido.id_pedido }
      });
    }


    await prisma.pedidos.deleteMany({
      where: { id_usuario: idUsuario }
    });

    await prisma.usuarios.delete({
      where: { id_usuario: idUsuario }
    });

    return successResponse(res, 200, `Usuario con ID ${idUsuario} eliminado correctamente`, null);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return errorResponse(res, 500, "Error interno del servidor al eliminar el usuario", "INTERNAL_ERROR");
  }
});

// ===================================================================
// OBTENER TODOS LOS USUARIOS
// ===================================================================
router.get('/', obtenerUsuarios);

module.exports = router;
