const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
            return res.status(400).json({ error: "Los IDs deben ser numeros validos."});
        }
        //verificar que el usuario existe
        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: usuarioId}
        });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado."});
        }

        //verificar que el producto existe
        const producto = await prisma.productos.findUnique({
            where: { id_producto: productoId}
        });
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado."});
        }

        //Validacion verificar si ya existe en la wishlist
        const locationandoWishlist = await prisma.wishlist.findFirst({
            where: {
                id_usuario: usuarioId,
                id_producto: productoId
            }
        });

        if (locationandoWishlist) {
            return res.status(400).json({ error: "El producto ya esta en la wishlist del usuario."});
        }

        // crear un nuevo prdocucto en la wishlist
        const nuevoProdwishlist = await prisma.wishlist.create({
            data: {
                id_usuario: usuarioId,
                id_producto: productoId,
                fecha_agregado: new Date(fecha_agregado)
            }
        });
        
        res.status(201).json({
            message: "Producto agregado a la wishlist correctamente.",
            wishlist: nuevoProdwishlist
        });

    } catch (error) {
        console.error("Error al agregar producto a la Wishlist:", error);
        res.status(500).json({
            error: "Error interno del servidor al agregar el producto a la wishlist.",
            detalle: error.message
        })
    }

});

// ===================================================================
// --- 2. READ (Leer los productos en la wishlist) ---
// ===================================================================
router.get('/leerwishlist', async (req, res) => {
    try {
        const wishlists = await prisma.wishlist.findMany();
        res.status(200).json(wishlists);
    } catch (error) {
        console.error("Error al obtener los producto de la wishlist:", error);
        res.status(500).json({
            error : "Error interno del servidor al obtener los productos de la wishlist.",
            detalle: error.message
        })
    }  
});

// Obtener producto en la wishlist por su ID
router.get('/leerwishlist/:id', async (req, res) => {
   const wishlistId = parseInt(req.params.id);

   try {
    const wishlist = await prisma.wishlist.findUnique({
        where: {
            id_wishlist: wishlistId
        },
    });

    if (!wishlist) {
        return res.status(404).json({ error: "Producto en la wishlist no encontrado."});
    }
    
    res.status(200).json(wishlist);
   } catch (error) {
    console.error("Error al obtener el producto en la wishlist por ID:", error);
    res.status(500).json({
        error: "Error interno del servidor.",
        detalle: error.message
    });
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

        if (wishlistUsuario.length === 0) {
            return res.status(404).json({ message: "El usuario no tiene productos en su wishlist." });
        }

        res.status(200).json(wishlistUsuario);
    } catch (error) {
        console.error("Error al obtener wishlist del usuario:", error);
        res.status(500).json({
            error: "Error interno del servidor.",
            detalle: error.message
        });
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
    res.status(200).json({
        message: "Producto en la wishlist actualizado correctamente.",
        wishlist: wishlistActualizado
    });
    } catch (error) {
        if (error.code === 'P2025'){
            return res.status(400).json({ error: "Prouducto en la wishlist no encontrado."});
        }
        console.error("Error al actualizar el producto en la wishlist:", error);
        res.status(500).json({
            error: "Error interno del servidor al actualizar el producto en la wishlist."
        });
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
         res.status(200).json({ message: 'producto en la wishlist eliminado correctamente.'});
    } catch (error) {
        console.error("Error al eliminar el producto en la wishlist:", error);
        res.status(500).json({
            error: "Error interno del servidor al eliminar el producto en la wishlist."
        });
    }
});

module.exports = router;  