const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { successResponse, errorResponse } = require('../utils/responseHelper');

//middleware para que el router pueda leer JSON
router.use(express.json());

// ===================================================================
// --- 1. CREATE (Crear un nuevo prod a la wishlist) ---
// ===================================================================

router.post('/crearwishlist', async (req, res) => {
    const { id_usuario, id_producto, fecha_agregado } = req.body;

    try {
        //convertir a numeros enteros
        const usuarioId = parseInt(id_usuario);
        const productoId = parseInt(id_producto);

        //verificar que los ids sean validos
        if (isNaN(usuarioId) || isNaN(productoId)) {
            return errorResponse(res, 400, "Los IDs deben ser numeros validos", "INVALID_IDS");
        }
        //verificar que el usuario existe
        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: usuarioId}
        });
        if (!usuario) {
            return errorResponse(res, 404, "Usuario no encontrado", "USER_NOT_FOUND");
        }

        //verificar que el producto existe
        const producto = await prisma.productos.findUnique({
            where: { id_producto: productoId}
        });
        if (!producto) {
            return errorResponse(res, 404, "Producto no encontrado", "PRODUCT_NOT_FOUND");
        }

        //Validacion verificar si ya existe en la wishlist
        const locationandoWishlist = await prisma.wishlist.findFirst({
            where: {
                id_usuario: usuarioId,
                id_producto: productoId
            }
        });

        if (locationandoWishlist) {
            return errorResponse(res, 400, "El producto ya esta en la wishlist del usuario", "PRODUCT_IN_WISHLIST");
        }

        // crear un nuevo prdocucto en la wishlist
        const nuevoProdwishlist = await prisma.wishlist.create({
            data: {
                id_usuario: usuarioId,
                id_producto: productoId,
                fecha_agregado: new Date(fecha_agregado)
            }
        });
        
        return successResponse(res, 201, "Producto agregado a la wishlist correctamente", nuevoProdwishlist);

    } catch (error) {
        console.error("Error al agregar producto a la Wishlist:", error);
        return errorResponse(res, 500, "Error interno del servidor al agregar el producto a la wishlist", "INTERNAL_ERROR");
    }

});

// ===================================================================
// --- 2. READ (Leer los productos en la wishlist) ---
// ===================================================================
router.get('/leerwishlist', async (req, res) => {
    try {
        const wishlists = await prisma.wishlist.findMany();
        return successResponse(res, 200, "Wishlists obtenidas correctamente", wishlists);
    } catch (error) {
        console.error("Error al obtener los producto de la wishlist:", error);
        return errorResponse(res, 500, "Error interno del servidor al obtener los productos de la wishlist", "INTERNAL_ERROR");
    }  
});


router.get('/leerwishlist/:id', async (req, res) => {
   const wishlistId = parseInt(req.params.id);

   try {
    const wishlist = await prisma.wishlist.findUnique({
        where: {
            id_wishlist: wishlistId
        },
    });

    if (!wishlist) {
        return errorResponse(res, 404, "Producto en la wishlist no encontrado", "WISHLIST_NOT_FOUND");
    }
    
    return successResponse(res, 200, "Producto en wishlist obtenido correctamente", wishlist);
   } catch (error) {
    console.error("Error al obtener el producto en la wishlist por ID:", error);
    return errorResponse(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
   }
});

// Obtener todos los productos en la wishlist de un usuario
router.get('/usuario/:id_usuario', async (req, res) => {
    const usuarioId = parseInt(req.params.id_usuario);

    try {
        const wishlistUsuario = await prisma.wishlist.findMany({
            where: {
                id_usuario: usuarioId
            },
            include: {
                productos: true  // incluye los datos completos del producto
            }
        });

        // Devolver array vacío con success si no hay productos (no es un error)
        return successResponse(res, 200, "Wishlist del usuario obtenida correctamente", wishlistUsuario);
    } catch (error) {
        console.error("Error al obtener wishlist del usuario:", error);
        return errorResponse(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
    }
});

// ===================================================================
// --- 3. UPDATE (Actualizar una un producto en la wishlist) ---
// ===================================================================

router.put('/actualizarwishlist/:id', async (req, res) =>{
    const wishlistId = parseInt(req.params.id);
    const { id_usuario, id_producto, fecha_agregado } = req.body;
    
    try {
        const wishlistActualizado = await prisma.wishlist.update({
        where: {
            id_wishlist: wishlistId
        },
        data: {
            id_usuario: parseInt(id_usuario),
            id_producto: parseInt(id_producto),
            fecha_agregado: new Date(fecha_agregado)
        },
    });
    return successResponse(res, 200, "Producto en la wishlist actualizado correctamente", wishlistActualizado);
    } catch (error) {
        if (error.code === 'P2025'){
            return errorResponse(res, 404, "Producto en la wishlist no encontrado", "WISHLIST_NOT_FOUND");
        }
        console.error("Error al actualizar el producto en la wishlist:", error);
        return errorResponse(res, 500, "Error interno del servidor al actualizar el producto en la wishlist", "INTERNAL_ERROR");
    }
});

// ===================================================================
// --- 4. DELETE (Eliminar un producto en la wishlist) ---
// ===================================================================
router.delete('/eliminarwishlist/:id', async (req, res) => {
    const wishlistId = parseInt(req.params.id);

    try {
         await prisma.wishlist.delete({
            where: {
                id_wishlist: wishlistId
            },
         });
         return successResponse(res, 200, "Producto en la wishlist eliminado correctamente", null);
    } catch (error) {
        if (error.code === 'P2025') {
            return errorResponse(res, 404, "Producto en la wishlist no encontrado", "WISHLIST_NOT_FOUND");
        }
        console.error("Error al eliminar el producto en la wishlist:", error);
        return errorResponse(res, 500, "Error interno del servidor al eliminar el producto en la wishlist", "INTERNAL_ERROR");
    }
});

module.exports = router;  