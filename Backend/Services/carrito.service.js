
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function totalCarrito(idCarrito){
    try {
        const carrito = await prisma.detalle_carrito.findMany({
            where: { CarritoID: parseInt(idCarrito)},
            include: {
                productos: true
            }
        })

        if (!carrito || carrito.length === 0) {
            return 0;
        }

        let total = 0;
        carrito.forEach(item =>{
            total += parseFloat(item.productos.precio) * item.Cantidad;
        })

        return parseFloat(total.toFixed(2));
    }
    catch(error){
        throw new Error('Error al calcular total del carrito: ' + error.message);
    }
}


// Obtener carrito por ID de usuario
async function obtenerCarritoPorUsuario(idUsuario) {
    try {
        const carrito = await prisma.carrito.findFirst({
            where: { id_usuario: parseInt(idUsuario) },
            include: {
                detalle_carrito: {
                    include: {
                        productos: true
                    }
                }
            }
        });

        if (!carrito) {
            return null;
        }

        // Calcular el total del carrito
        let total = 0;
        const itemsConSubtotal = carrito.detalle_carrito.map(item => {
            const subtotal = parseFloat(item.productos.precio) * item.Cantidad;
            total += subtotal;
            return {
                ...item,
                subtotal: subtotal.toFixed(2)
            };
        });

        // Retornar carrito con items modificados y total
        return {
            ...carrito,
            detalle_carrito: itemsConSubtotal,
            total: total.toFixed(2),
            cantidadItems: carrito.detalle_carrito.length
        };
    } catch (error) {
        throw new Error('Error al obtener el carrito: ' + error.message);
    }
}

// Agregar producto al carrito
async function agregarProductoAlCarrito(data) {
    const { idCarrito, idProducto, cantidad } = data;
    try {
        // Verificar si el producto ya existe en el carrito
        const itemExistente = await prisma.detalle_carrito.findUnique({
            where: {
                CarritoID_ProductoID: {
                    CarritoID: parseInt(idCarrito),
                    ProductoID: parseInt(idProducto)
                }
            }
        });

        if (itemExistente) {
            // Si existe, actualizar la cantidad sumando la nueva cantidad
            const itemActualizado = await prisma.detalle_carrito.update({
                where: {
                    CarritoID_ProductoID: {
                        CarritoID: parseInt(idCarrito),
                        ProductoID: parseInt(idProducto)
                    }
                },
                data: {
                    Cantidad: itemExistente.Cantidad + parseInt(cantidad)
                },
                include: {
                    productos: true
                }
            });
            return itemActualizado;
        } else {
            // Si no existe, crear nuevo item
            const nuevoItem = await prisma.detalle_carrito.create({
                data: {
                    CarritoID: parseInt(idCarrito),
                    ProductoID: parseInt(idProducto),
                    Cantidad: parseInt(cantidad)
                },
                include: {
                    productos: true
                }
            });
            return {...nuevoItem, total: await totalCarrito(idCarrito)};
        }
    } catch (error) {
        throw new Error('Error al agregar producto al carrito: ' + error.message);
    }
}

// Actualizar cantidad de un producto en el carrito
async function actualizarCantidadProducto(data) {
    const { idCarrito, idProducto, cantidad } = data;
    try {
        if (parseInt(cantidad) <= 0) {
            throw new Error('La cantidad debe ser mayor a 0');
        }

        const itemActualizado = await prisma.detalle_carrito.update({
            where: {
                CarritoID_ProductoID: {
                    CarritoID: parseInt(idCarrito),
                    ProductoID: parseInt(idProducto)
                }
            },
            data: {
                Cantidad: parseInt(cantidad)
            },
            include: {
                productos: true
            }
        });
        return itemActualizado;
    } catch (error) {
        throw new Error('Error al actualizar cantidad: ' + error.message);
    }
}


// Eliminar producto del carrito
async function eliminarProductoDelCarrito(data) {
    const { idCarrito, idProducto } = data;
    try {
        const itemEliminado = await prisma.detalle_carrito.delete({
            where: {
                CarritoID_ProductoID: {
                    CarritoID: parseInt(idCarrito),
                    ProductoID: parseInt(idProducto)
                }
            }
        });
        return itemEliminado;
    } catch (error) {
        throw new Error('Error al eliminar producto del carrito: ' + error.message);
    }
}

// Vaciar todo el carrito
async function vaciarCarrito(idCarrito) {
    try {
        const resultado = await prisma.detalle_carrito.deleteMany({
            where: {
                CarritoID: parseInt(idCarrito)
            }
        });
        return resultado;
    } catch (error) {
        throw new Error('Error al vaciar el carrito: ' + error.message);
    }
}

module.exports = {
    totalCarrito,
    obtenerCarritoPorUsuario,
    agregarProductoAlCarrito,
    actualizarCantidadProducto,
    eliminarProductoDelCarrito,
    vaciarCarrito
};