import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useWishlist } from '../../Context/WishlistContext';
import EncabezadoWishlist from '../../Components/CostumerComponents/Wishlist/EncabezadoWishlist';
import ListaWishlist from '../../Components/CostumerComponents/Wishlist/ListaWishlist';

const Wishlist = () => {
    const navigate = useNavigate();
    const { eliminarDeWishlist } = useWishlist();
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener el ID del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const idUsuario = usuario?.id_usuario;

    // Cargar productos de la wishlist al montar el componente
    useEffect(() => {
        if (!idUsuario) {
            navigate('/login');
            return;
        }

        cargarWishlist();
    }, [idUsuario, navigate]);

    const cargarWishlist = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/wishlist/usuario/${idUsuario}`);
            const data = await response.json();

            if (data.success) {
                setProductos(data.data || []);
            } else {
                setError(data.message);
                setProductos([]);
            }
        } catch (error) {
            console.error('Error al cargar wishlist:', error);
            setError('Error al cargar la lista de deseos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEliminarProducto = async (idWishlist) => {
        try {
            // Usar la función del contexto para eliminar
            const resultado = await eliminarDeWishlist(idWishlist);

            if (resultado.success) {
                // Actualizar la lista local eliminando el producto
                setProductos(productos.filter(p => p.id_wishlist !== idWishlist));

                // Mostrar notificación de éxito
                alert('Producto eliminado de la lista de deseos');
            } else {
                alert('Error al eliminar el producto: ' + resultado.message);
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Error al eliminar el producto de la lista de deseos');
        }
    };

    const handleAgregarAlCarrito = async (producto) => {
        try {
            // Obtener el carrito del usuario
            const responseCarrito = await fetch(`${import.meta.env.VITE_API_URL}/carrito/usuario/${idUsuario}`);
            const dataCarrito = await responseCarrito.json();

            if (!dataCarrito.success) {
                alert('Error al obtener el carrito');
                return;
            }

            const carritoId = dataCarrito.data.id_carrito;

            // Verificar si el producto ya está en el carrito
            const responseDetalles = await fetch(`${import.meta.env.VITE_API_URL}/carrito/detalle/${carritoId}`);
            const dataDetalles = await responseDetalles.json();

            let productoExistente = null;
            if (dataDetalles.success && dataDetalles.data.detalle_carrito) {
                productoExistente = dataDetalles.data.detalle_carrito.find(
                    item => item.ProductoID === producto.id_producto
                );
            }

            if (productoExistente) {
                // Actualizar cantidad
                const responseUpdate = await fetch(
                    `${import.meta.env.VITE_API_URL}/carrito/actualizar/${productoExistente.DetalleCarritoID}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            Cantidad: productoExistente.Cantidad + 1
                        })
                    }
                );

                const dataUpdate = await responseUpdate.json();

                if (dataUpdate.success) {
                    alert('Producto agregado al carrito');
                } else {
                    alert('Error al actualizar el carrito');
                }
            } else {
                // Agregar nuevo producto al carrito
                const responseAdd = await fetch(`${import.meta.env.VITE_API_URL}/carrito/agregar`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        CarritoID: carritoId,
                        ProductoID: producto.id_producto,
                        Cantidad: 1
                    })
                });

                const dataAdd = await responseAdd.json();

                if (dataAdd.success) {
                    alert('Producto agregado al carrito');
                } else {
                    alert('Error al agregar al carrito');
                }
            }
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            alert('Error al agregar el producto al carrito');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <EncabezadoWishlist cantidadProductos={productos.length} />

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <ListaWishlist
                    productos={productos}
                    onEliminar={handleEliminarProducto}
                    onAgregarAlCarrito={handleAgregarAlCarrito}
                    isLoading={isLoading}
                />

                {/* Botón para continuar comprando */}
                <div className="mt-8 flex justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Continuar Comprando
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;