import React from 'react';
import TarjetaWishlist from './TarjetaWishlist';
import { FiHeart } from 'react-icons/fi';

const ListaWishlist = ({ productos, onEliminar, onAgregarAlCarrito, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!productos || productos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="bg-gray-100 rounded-full p-8 mb-6">
                    <FiHeart className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                    Tu lista de deseos está vacía
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                    Comienza a agregar productos a tu lista de deseos haciendo clic en el ícono de corazón en los productos que te gusten
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {productos.map((producto) => (
                <TarjetaWishlist
                    key={producto.id_wishlist}
                    producto={producto}
                    onEliminar={onEliminar}
                    onAgregarAlCarrito={onAgregarAlCarrito}
                />
            ))}
        </div>
    );
};

export default ListaWishlist;