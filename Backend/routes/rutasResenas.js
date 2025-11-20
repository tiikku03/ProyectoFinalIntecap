const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();
const { successResponse, errorResponse } = require('../utils/responseHelper');

// Middleware para que el router pueda leer JSON
router.use(express.json());


// ===================================================================
// --- 1. CREATE (Crear una nueva reseña) ---
// ===================================================================
router.post('/crearresena', async (req, res) => {
    const { id_usuario, id_producto, calificacion, comentario } = req.body;
    
    try {
        // Convertir a números enteros
        const usuarioId = parseInt(id_usuario);
        const productoId = parseInt(id_producto);
        const calif = parseInt(calificacion);

        // Verificar que los IDs sean válidos
        if (isNaN(usuarioId) || isNaN(productoId) || isNaN(calif)) {
            return errorResponse(res, 400, "Los IDs y calificación deben ser números válidos", "INVALID_IDS");
        }

        // Verificar que el usuario existe
        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: usuarioId }
        });

        if (!usuario) {
            return errorResponse(res, 404, `No existe el usuario con ID ${usuarioId}`, "USER_NOT_FOUND");
        }

        // Verificar que el producto existe
        const producto = await prisma.productos.findUnique({
            where: { id_producto: productoId }
        });

        if (!producto) {
            return errorResponse(res, 404, `No existe el producto con ID ${productoId}`, "PRODUCT_NOT_FOUND");
        }

        // Validación: verificar si ya existe una reseña
        const localizandoResena = await prisma.resenas.findFirst({
            where: { 
                id_usuario: usuarioId,
                id_producto: productoId
            }
        });

        if (localizandoResena) {
            return errorResponse(res, 400, "Ya existe una reseña de este usuario para este producto", "REVIEW_EXISTS");
        }

        // Crear la nueva reseña
        const nuevaresena = await prisma.resenas.create({
            data: {
                id_usuario: usuarioId,
                id_producto: productoId,
                calificacion: calif,
                comentario: comentario
            }
        });

        return successResponse(res, 201, "Reseña creada correctamente", nuevaresena);

    } catch (error) {
        console.error("Error al crear reseña:", error);
        return errorResponse(res, 500, "Error interno del servidor al crear la reseña", "INTERNAL_ERROR");
    }
});

// ===================================================================
// --- 2. READ (Leer/Obtener reseñas) ---
// ===================================================================

// a. Obtener todas las reseñas con información de usuario y producto
router.get('/leerresena', async (req, res) => {
    try {
        const resenas = await prisma.resenas.findMany({
            include: {
                usuarios: {
                    select: {
                        id_usuario: true,
                        nombre: true,
                        apellido: true,
                        email: true
                    }
                },
                productos: {
                    select: {
                        id_producto: true,
                        nombre: true,
                        url_imagen: true,
                        precio: true
                    }
                }
            },
            orderBy: {
                fecha_resena: 'desc'
            }
        });
        return successResponse(res, 200, "Reseñas obtenidas correctamente", resenas);
    } catch (error) {
        console.error("Error al obtener todas las reseñas:", error);
        return errorResponse(res, 500, "Error interno del servidor al obtener las reseñas", "INTERNAL_ERROR");
    }
});

// b. Obtener una reseña por su ID
router.get('/leerresena/:id', async (req, res) => {
    const idResena = parseInt(req.params.id);

    try {
        const resena = await prisma.resenas.findUnique({
            where: {
                id_resena: idResena 
            },
        });

        if (!resena) {
            return errorResponse(res, 404, "Reseña no encontrada", "REVIEW_NOT_FOUND");
        }

        return successResponse(res, 200, "Reseña obtenida correctamente", resena);
    } catch (error) {
        console.error("Error al obtener la reseña por ID:", error);
        return errorResponse(res, 500, "Error interno del servidor al obtener reseña", "INTERNAL_ERROR");
    }
});

// ===================================================================
// --- 3. UPDATE (Actualizar una reseña) 
// ===================================================================

router.put('/actualizarresena/:id', async (req, res) => {
    const idResena = parseInt(req.params.id);
    const { calificacion, comentario } = req.body;

    try {
        // Convertir calificación a número entero
        const calif = parseInt(calificacion);

        // Validar que calificación sea un número válido
        if (isNaN(calif)) {
            return errorResponse(res, 400, "La calificación debe ser un número válido", "INVALID_RATING");
        }

        const resenaActualizada = await prisma.resenas.update({
            where: {
                id_resena: idResena
            },
            data: {
                calificacion: calif,
                comentario: comentario
            },
        });

        return successResponse(res, 200, "Reseña actualizada correctamente", resenaActualizada);
    } catch (error) {
        if (error.code === 'P2025') {
            return errorResponse(res, 404, "No se encontró la reseña para actualizar", "REVIEW_NOT_FOUND");
        }
        console.error("Error al actualizar la reseña:", error);
        return errorResponse(res, 500, "Error interno del servidor al actualizar", "INTERNAL_ERROR");
    }
});

// ===================================================================
// --- 4. DELETE (Eliminar una reseña) ---
// ===================================================================

router.delete('/eliminarresena/:id', async (req, res) => {
    const idResena = parseInt(req.params.id);

    try {
        await prisma.resenas.delete({
            where: {
                id_resena: idResena
            },
        });

        return successResponse(res, 200, `Reseña con ID ${idResena} eliminada correctamente`, null);
    } catch (error) {
        if (error.code === 'P2025') {
            return errorResponse(res, 404, "No se encontró la reseña para eliminar", "REVIEW_NOT_FOUND");
        }
        console.error("Error al eliminar la reseña:", error);
        return errorResponse(res, 500, "Error interno del servidor al eliminar", "INTERNAL_ERROR");
    }
});

module.exports = router;