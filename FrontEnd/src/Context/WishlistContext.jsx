import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './LogInContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist debe ser usado dentro de WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const { usuario, isAuthenticated } = useAuth();
    const [wishlist, setWishlist] = useState([]);
    const [cantidadItems, setCantidadItems] = useState(0);
    const [loading, setLoading] = useState(false);

    // Obtener el ID del usuario autenticado
    const idUsuario = usuario?.id_usuario;

    // Cargar wishlist cuando el usuario cambie
    useEffect(() => {
        if (isAuthenticated && idUsuario) {
            cargarWishlist();
        } else {
            // Si no está autenticado, limpiar la wishlist
            setWishlist([]);
            setCantidadItems(0);
        }
    }, [isAuthenticated, idUsuario]);

    const cargarWishlist = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/wishlist/usuario/${idUsuario}`
            );
            const data = await response.json();

            if (data.success) {
                setWishlist(data.data || []);
                setCantidadItems(data.data?.length || 0);
            } else {
                setWishlist([]);
                setCantidadItems(0);
            }
        } catch (error) {
            console.error('Error al cargar wishlist:', error);
            setWishlist([]);
            setCantidadItems(0);
        } finally {
            setLoading(false);
        }
    };

    const agregarAWishlist = async (idProducto) => {
        try {
            // Verificar si el usuario está autenticado
            if (!isAuthenticated) {
                return {
                    success: false,
                    message: 'Debes iniciar sesión para agregar productos a la lista de deseos',
                    requireAuth: true
                };
            }

            // Verificar si el producto ya está en la wishlist
            const productoExiste = wishlist.some(
                item => item.id_producto === idProducto
            );

            if (productoExiste) {
                return {
                    success: false,
                    message: 'Este producto ya está en tu lista de deseos'
                };
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/wishlist/crearwishlist`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_usuario: idUsuario,
                        id_producto: idProducto,
                        fecha_agregado: new Date().toISOString(),
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                // Recargar la wishlist para obtener los datos actualizados
                await cargarWishlist();
                return { success: true, message: 'Producto agregado a la lista de deseos' };
            } else {
                return { success: false, message: data.message || 'Error al agregar producto' };
            }
        } catch (error) {
            console.error('Error al agregar a wishlist:', error);
            return { success: false, message: 'Error al agregar a la lista de deseos' };
        }
    };

    const eliminarDeWishlist = async (idWishlist) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/wishlist/eliminarwishlist/${idWishlist}`,
                {
                    method: 'DELETE',
                }
            );

            const data = await response.json();

            if (data.success) {
                // Recargar la wishlist
                await cargarWishlist();
                return { success: true, message: 'Producto eliminado de la lista de deseos' };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error('Error al eliminar de wishlist:', error);
            return { success: false, message: 'Error al eliminar de la lista de deseos' };
        }
    };

    const verificarEnWishlist = (idProducto) => {
        return wishlist.some(item => item.id_producto === idProducto);
    };

    const obtenerIdWishlist = (idProducto) => {
        const item = wishlist.find(item => item.id_producto === idProducto);
        return item?.id_wishlist;
    };

    const value = {
        wishlist,
        cantidadItems,
        loading,
        agregarAWishlist,
        eliminarDeWishlist,
        verificarEnWishlist,
        obtenerIdWishlist,
        cargarWishlist,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};