const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();

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
            return res.status(400).json({ error: "Los IDs y calificación deben ser números válidos." });
        }

        // Verificar que el usuario existe
        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: usuarioId }
        });

        if (!usuario) {
            return res.status(404).json({ error: `No existe el usuario con ID ${usuarioId}` });
        }

        // Verificar que el producto existe
        const producto = await prisma.productos.findUnique({
            where: { id_producto: productoId }
        });

        if (!producto) {
            return res.status(404).json({ error: `No existe el producto con ID ${productoId}` });
        }

        // Validación: verificar si ya existe una reseña
        const localizandoResena = await prisma.resenas.findFirst({
            where: { 
                id_usuario: usuarioId,
                id_producto: productoId
            }
        });

        if (localizandoResena) {
            return res.status(400).json({ error: "Ya existe una reseña de este usuario para este producto." });
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

        res.status(201).json({ 
            message: "Reseña creada correctamente",
            data: nuevaresena 
        });

    } catch (error) {
        console.error("Error al crear reseña:", error);
        res.status(500).json({ 
            error: "Error interno del servidor al crear la reseña.", 
            detalle: error.message 
        });
    }
});

// ===================================================================
// --- 2. READ (Leer/Obtener reseñas) ---
// ===================================================================

// a. Obtener todas las reseñas
router.get('/leerresena', async (req, res) => {
    try {
        const resenas = await prisma.resenas.findMany();
        res.status(200).json(resenas);
    } catch (error) {
        console.error("Error al obtener todas las reseñas:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener las reseñas." });
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
            return res.status(404).json({ error: "Reseña no encontrada." });
        }

        res.status(200).json(resena);
    } catch (error) {
        console.error("Error al obtener la reseña por ID:", error);
        res.status(500).json({ error: "Error interno del servidor." });
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
            return res.status(400).json({ error: "La calificación debe ser un número válido." });
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

        res.status(200).json({
            message: "Reseña actualizada correctamente",
            data: resenaActualizada
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "No se encontró la reseña para actualizar." });
        }
        console.error("Error al actualizar la reseña:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar." });
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

        res.status(200).json({ message: `Reseña con ID ${idResena} eliminada correctamente.` });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "No se encontró la reseña para eliminar." });
        }
        console.error("Error al eliminar la reseña:", error);
        res.status(500).json({ error: "Error interno del servidor al eliminar." });
    }
});

module.exports = router;