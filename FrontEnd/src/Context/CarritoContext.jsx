import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './LogInContext';

const CarritoContext = createContext();

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe ser usado dentro de CarritoProvider');
    }
    return context;
};

export const CarritoProvider = ({ children }) => {
    const { usuario, isAuthenticated } = useAuth();
    const [carrito, setCarrito] = useState(null);
    const [cantidadItems, setCantidadItems] = useState(0);
    const [loading, setLoading] = useState(false);

    // Obtener el ID del usuario autenticado
    const idUsuario = usuario?.id_usuario;

    // Cargar carrito cuando el usuario cambie
    useEffect(() => {
        if (isAuthenticated && idUsuario) {
            cargarCarrito();
        } else {
            // Si no está autenticado, limpiar el carrito
            setCarrito(null);
            setCantidadItems(0);
        }
    }, [isAuthenticated, idUsuario]);

    const cargarCarrito = async () => {
        try {
            setLoading(true);
            console.log('Cargando carrito para usuario:', idUsuario);
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/carrito/usuario/${idUsuario}`
            );
            const data = await response.json();
            console.log('Carrito cargado:', data);

            if (data.success) {
                setCarrito(data.data);
                setCantidadItems(data.data.cantidadItems || 0);
                console.log('Estado del carrito actualizado:', {
                    id_carrito: data.data.id_carrito,
                    cantidadItems: data.data.cantidadItems
                });
            }
        } catch (error) {
            console.error('Error al cargar carrito:', error);
        } finally {
            setLoading(false);
        }
    };

    const agregarAlCarrito = async (producto, cantidad = 1) => {
        try {
            // Verificar si el usuario está autenticado
            if (!isAuthenticated) {
                return {
                    success: false,
                    message: 'Debes iniciar sesión para agregar productos al carrito',
                    requireAuth: true
                };
            }

            if (!carrito) {
                console.error('Carrito no disponible');
                return { success: false, message: 'Carrito no disponible' };
            }

            console.log('Agregando al carrito:', {
                idCarrito: carrito.id_carrito,
                idProducto: producto.id_producto,
                cantidad: cantidad
            });

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/carrito/agregarproducto`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idCarrito: carrito.id_carrito,
                        idProducto: producto.id_producto,
                        cantidad: cantidad,
                    }),
                }
            );

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                // Recargar el carrito para obtener los datos actualizados
                await cargarCarrito();
                return { success: true, message: 'Producto agregado al carrito' };
            } else {
                console.error('Error del servidor:', data.message);
                return { success: false, message: data.message || 'Error al agregar producto' };
            }
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            return { success: false, message: 'Error al agregar al carrito' };
        }
    };

    const actualizarCantidad = async (idProducto, nuevaCantidad) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/carrito/actualizar`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idCarrito: carrito.id_carrito,
                        idProducto: idProducto,
                        cantidad: nuevaCantidad,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                await cargarCarrito();
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
            return { success: false };
        }
    };

    const eliminarDelCarrito = async (idProducto) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/carrito/eliminar`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idCarrito: carrito.id_carrito,
                        idProducto: idProducto,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                await cargarCarrito();
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error('Error al eliminar del carrito:', error);
            return { success: false };
        }
    };

    const value = {
        carrito,
        cantidadItems,
        loading,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        cargarCarrito,
    };

    return (
        <CarritoContext.Provider value={value}>
            {children}
        </CarritoContext.Provider>
    );
};
