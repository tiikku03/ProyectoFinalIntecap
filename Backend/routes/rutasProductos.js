const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware para que el router pueda leer JSON
router.use(express.json());

// ===================================================================
// --- 1. CREATE 
// ===================================================================

router.post('/crearproducto', async (req, res) => {
    try {
        //recibiendo informacion del nuevo producto
        const { nombre, descripcion, precio, stock, categoria, subcategoria, url_imagen, fecha_agregado } = req.body;
        
        if (!nombre || !precio || !stock) {
            return res.status(400).json({ error: "Faltan datos obligatorios (nombre, precio, stock)" });
        }

        //Validar si ya existe el producto
        let localizandoProducto = await prisma.productos.findFirst({
            where: { nombre: nombre },
        });

        if (localizandoProducto) {
            return res.status(400).json({ error: "El producto ya está registrado" });
        }

        const nuevoProducto = await prisma.productos.create({
            data: {
                nombre: nombre,
                descripcion: descripcion || null,
                precio: parseFloat(precio),
                stock: parseInt(stock),
                categoria: categoria || null,
                subcategoria: subcategoria || null,
                url_imagen: url_imagen || null,
                fecha_agregado: fecha_agregado ? new Date(fecha_agregado) : new Date()
            },
        });
        
        res.status(201).json({
            message: "Producto creado correctamente.",
            producto: nuevoProducto
        });
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({
            error: "Error interno del servidor.",
            detalle: error.message
        });
    }
});

// ===================================================================
// --- 2. READ (Obtener todos los productos) ---
// ===================================================================

router.get('/leerproductos', async (req, res) => {
    try {
        const productos = await prisma.productos.findMany(); 
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({
            error: "Error interno del servidor al obtener productos."
        });
    }
});

// b.Obtener un producto por su id
router.get('/leerproducto/:id', async (req, res) => {
    const idProducto = parseInt(req.params.id);
    try {
        const producto = await prisma.productos.findUnique({
            where: {
                id_producto: idProducto
            },
        });

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado."});
        }

        res.status(200).json(producto);
    } catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});


// ===================================================================
// --- 3. UPDATE (actualizar un producto) ---
router.put('/actualizarproducto/:id', async (req, res) => {
    const productoId = parseInt(req.params.id);
    const { nombre, descripcion, precio, stock, categoria, subcategoria, url_imagen, fecha_agregado } = req.body;

    try {
        const productoActualizado = await prisma.productos.update({
            where: {
                 id_producto: productoId 
                },
            data: {
                nombre: nombre,
                descripcion: descripcion,
                precio: parseFloat(precio),
                stock: parseInt(stock),
                categoria: categoria,
                subcategoria: subcategoria,
                url_imagen: url_imagen,
                fecha_agregado: fecha_agregado ? new Date(fecha_agregado) : undefined
            },
        });
        res.status(200).json({
            message: "Producto actualizado correctamente.",
            producto: productoActualizado
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(400).json({ error: "Producto no encontrado." });
        }
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});

// ===================================================================
// --- 4. DELETE (Eliminar un producto) ---
// ===================================================================

router.delete('/eliminarProducto/:id', async ( req, res) => {
    const productoId = parseInt(req.params.id); 

    try {
        await prisma.productos.delete({
            where: {
                id_producto: productoId
            },
        });
        res.status(200).json({
            message: `Producto con ID ${productoId} eliminado correctamente.`
        });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ 
            error: "Error interno del servidor al eliminar el producto." 
        });
    }
})
module.exports = router;