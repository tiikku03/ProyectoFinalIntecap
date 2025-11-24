const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { successResponse, errorResponse } = require('../utils/responseHelper');
const { obtnerProductosPorCategoria } = require('../Controllers/productos.controller');

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
            return errorResponse(res, 400, "Faltan datos obligatorios (nombre, precio, stock)", "MISSING_FIELDS");
        }

        //Validar si ya existe el producto
        let localizandoProducto = await prisma.productos.findFirst({
            where: { nombre: nombre },
        });

        if (localizandoProducto) {
            return errorResponse(res, 400, "El producto ya está registrado", "PRODUCT_EXISTS");
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
        
        return successResponse(res, 201, "Producto creado correctamente", nuevoProducto);
    } catch (error) {
        console.error("Error al crear producto:", error);
        return errorResponse(res, 500, "Error interno del servidor al crear producto", "INTERNAL_ERROR");
    }
});

// ===================================================================
// --- 2. READ (Obtener todos los productos) ---
// ===================================================================

/*
GET /api/productos?page=1
GET /api/productos?page=2
GET /api/productos?page=3
*/

router.get('/leerproductos', async (req, res) => {
  try {
    let page = parseInt(req.query.page, 10);

    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const limit = 10;
    const skip = (page - 1) * limit;

    const [productos, total] = await Promise.all([
      prisma.productos.findMany({
        skip,
        take: limit,
        orderBy: { id_producto: "asc" }, 
      }),
      prisma.productos.count(),
    ]);

    const totalPaginas = Math.ceil(total / limit);

    return successResponse(res, 200, "Productos obtenidos correctamente", {
      page,
      totalPaginas,
      totalProductos: total,
      hasNextPage: page < totalPaginas,
      productos,
    });

  } catch (error) {
    console.error("Error al obtener productos:", error);
    return errorResponse(res, 500, "Error interno del servidor al obtener productos", "INTERNAL_ERROR");
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
            return errorResponse(res, 404, "Producto no encontrado", "PRODUCT_NOT_FOUND");
        }

        return successResponse(res, 200, "Producto obtenido correctamente", producto);
    } catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        return errorResponse(res, 500, "Error interno del servidor al obtener producto", "INTERNAL_ERROR");
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
        return successResponse(res, 200, "Producto actualizado correctamente", productoActualizado);
    } catch (error) {
        if (error.code === 'P2025') {
            return errorResponse(res, 404, "Producto no encontrado", "PRODUCT_NOT_FOUND");
        }
        console.error("Error al actualizar el producto:", error);
        return errorResponse(res, 500, "Error interno del servidor al actualizar producto", "INTERNAL_ERROR");
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
        return successResponse(res, 200, `Producto con ID ${productoId} eliminado correctamente`, null);
    } catch (error) {
        if (error.code === 'P2025') {
            return errorResponse(res, 404, "Producto no encontrado", "PRODUCT_NOT_FOUND");
        }
        console.error("Error al eliminar el producto:", error);
        return errorResponse(res, 500, "Error interno del servidor al eliminar producto", "INTERNAL_ERROR");
    }
});


// ===================================================================
// -- PRODUCTOS POR CATEGORIA ---
// ===================================================================
router.get('/productosPorCategoria', obtnerProductosPorCategoria);

module.exports = router;




