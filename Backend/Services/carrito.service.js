
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


// Crear carrito para un usuario
async function crearCarrito(idUsuario) {
    try {
        const nuevoCarrito = await prisma.carrito.create({
            data: {
                id_usuario: parseInt(idUsuario)
            },
            include: {
                detalle_carrito: {
                    include: {
                        productos: true
                    }
                }
            }
        });

        return {
            ...nuevoCarrito,
            detalle_carrito: [],
            total: "0.00",
            cantidadItems: 0
        };
    } catch (error) {
        throw new Error('Error al crear el carrito: ' + error.message);
    }
}

// Obtener carrito por ID de usuario (crea uno si no existe)
async function obtenerCarritoPorUsuario(idUsuario) {
    try {
        let carrito = await prisma.carrito.findFirst({
            where: { id_usuario: parseInt(idUsuario) },
            include: {
                detalle_carrito: {
                    include: {
                        productos: true
                    }
                }
            }
        });

        // Si no existe el carrito, crear uno nuevo
        if (!carrito) {
            return await crearCarrito(idUsuario);
        }

        // Si el carrito está vacío, retornar directamente
        if (!carrito.detalle_carrito || carrito.detalle_carrito.length === 0) {
            return {
                ...carrito,
                detalle_carrito: [],
                total: "0.00",
                cantidadItems: 0
            };
        }

        // Calcular el total del carrito y cantidad de productos diferentes
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
        // cantidadItems representa la cantidad de productos DIFERENTES (no la suma de cantidades)
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
        // Verificar stock del producto
        const producto = await prisma.productos.findUnique({
            where: { id_producto: parseInt(idProducto) }
        });

        if (!producto) {
            throw new Error('El producto no existe');
        }

        if (producto.stock <= 0) {
            throw new Error(`El producto "${producto.nombre}" está agotado`);
        }

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
            // Verificar si hay suficiente stock para la nueva cantidad total
            const nuevaCantidad = itemExistente.Cantidad + parseInt(cantidad);
            if (producto.stock < nuevaCantidad) {
                throw new Error(`Stock insuficiente para "${producto.nombre}". Stock disponible: ${producto.stock}, cantidad en carrito: ${itemExistente.Cantidad}`);
            }

            // Si existe, actualizar la cantidad sumando la nueva cantidad
            const itemActualizado = await prisma.detalle_carrito.update({
                where: {
                    CarritoID_ProductoID: {
                        CarritoID: parseInt(idCarrito),
                        ProductoID: parseInt(idProducto)
                    }
                },
                data: {
                    Cantidad: nuevaCantidad
                },
                include: {
                    productos: true
                }
            });
            return itemActualizado;
        } else {
            // Verificar stock para la cantidad inicial
            if (producto.stock < parseInt(cantidad)) {
                throw new Error(`Stock insuficiente para "${producto.nombre}". Stock disponible: ${producto.stock}, cantidad solicitada: ${cantidad}`);
            }

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

        // Verificar stock del producto
        const producto = await prisma.productos.findUnique({
            where: { id_producto: parseInt(idProducto) }
        });

        if (!producto) {
            throw new Error('El producto no existe');
        }

        if (producto.stock <= 0) {
            throw new Error(`El producto "${producto.nombre}" está agotado`);
        }

        if (producto.stock < parseInt(cantidad)) {
            throw new Error(`Stock insuficiente para "${producto.nombre}". Stock disponible: ${producto.stock}, cantidad solicitada: ${cantidad}`);
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
    crearCarrito,
    obtenerCarritoPorUsuario,
    agregarProductoAlCarrito,
    actualizarCantidadProducto,
    eliminarProductoDelCarrito,
    vaciarCarrito
};