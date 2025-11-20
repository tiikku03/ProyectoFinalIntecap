const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getProductosPorCategoria(categoria){
    const categoriaFormateada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    try {
        const productos = await prisma.productos.findMany({
            where: { categoria: categoriaFormateada }
        });
        return productos;
    } catch (error) {
        console.error("Error al obtener productos por categoría:", error);
        throw error;
    }
}

module.exports = {
    getProductosPorCategoria
}