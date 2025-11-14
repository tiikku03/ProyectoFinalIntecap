const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();

// Middleware para que el router pueda leer JSON
router.use(express.json());

// --- 1. CREATE (Crear una nueva reseña) ---
router.post('/crearresenia', async (req, res) => {
    const { id_usuario, id_producto, calificacion, comentario } = req.body;
    
    try {
        // Validación: se valida si ya existe una reseña del mismo usuario para el mismo producto
        let localizandoResena = await prisma.resenas.findFirst({
            where: { 
                id_usuario: Number(id_usuario),
                id_producto: Number(id_producto)
            }
        })

        if (localizandoResena) {
            return res.status(400).json({ error: "Ya existe una reseña de este usuario para este producto." });
        }

        // Creando la nueva reseña
        const nuevaResena = await prisma.resenas.create({
            data: {
                id_usuario: Number(id_usuario),
                id_producto: Number(id_producto),
                calificacion: Number(calificacion),
                comentario: comentario
            }
        });

        res.status(201).json({ 
            message: "Reseña creada correctamente",
            data: nuevaResena 
        });

    } catch (error) {
        console.error("Error al crear reseña:", error);
        res.status(500).json({ error: "Error interno del servidor al crear la reseña.", detalle: error.message });
    }
});


// --- 2. READ (Leer/Obtener reseñas) ---

// a. Obtener todas las reseñas
router.get('/resenas', async (req, res) => {
    try {
        const resenas = await prisma.resenas.findMany();
        res.status(200).json(resenas);
    } catch (error) {
        console.error("Error al obtener todas las reseñas:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener las reseñas." });
    }
});

// b. Obtener una reseña por su ID
router.get('/resenas/:id', async (req, res) => {
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

// --- 3. UPDATE (Actualizar una reseña) ---
router.put('/resenas/:id', async (req, res) => {
    const idResena = parseInt(req.params.id);
    const { calificacion, comentario } = req.body;

    try {
        const resenaActualizada = await prisma.resenas.update({
            where: {
                id_resena: idResena
            },
            data: {
                calificacion: calificacion,
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

// --- 4. DELETE (Eliminar una reseña) ---
router.delete('/resenas/:id', async (req, res) => {
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