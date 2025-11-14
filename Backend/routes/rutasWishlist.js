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
// --- 1. READ (Leer los productos en la wishlist) ---
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


router.get('/leerwishlist/:id', async (req, res) => {
   const wishlistId = parseInt(req.params.id);
   
   try {
    const wishlist = await prisma.wishlist.findUnique({
        where: {
            id_wishlist: wishlistId
        },
    });

    if (!wishlist) {
        return res.status(400).json({ error: "Producto en la wishlist no encontrado."});
    }
   }catch(error){

   }
});

module.exports = router;  