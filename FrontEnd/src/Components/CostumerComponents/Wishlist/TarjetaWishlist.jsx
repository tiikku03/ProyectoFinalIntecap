import React from 'react';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const TarjetaWishlist = ({ producto, onEliminar, onAgregarAlCarrito }) => {
    const {
        id_wishlist,
        productos: {
            id_producto,
            nombre,
            precio,
            precio_anterior,
            url_imagen,
            stock,
            categoria
        }
    } = producto;

    // Soportar ambos nombres de campo para la imagen
    const imagen_url = url_imagen;

    // Calcular el descuento si existe precio_anterior
    const descuento = precio_anterior
        ? Math.round(((precio_anterior - precio) / precio_anterior) * 100)
        : null;

    const handleEliminar = () => {
        onEliminar(id_wishlist);
    };

    const handleAgregarCarrito = () => {
        onAgregarAlCarrito({
            id_producto,
            nombre,
            precio,
            imagen_url,
            stock
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <div className="flex gap-4">
                {/* Imagen del producto */}
                <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    {imagen_url ? (
                        <img
                            src={imagen_url}
                            alt={nombre}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><span class="text-sm text-center px-2">Imagen no disponible</span></div>';
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="text-sm text-center px-2">Sin imagen</span>
                        </div>
                    )}
                </div>

                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                    <div className="mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {nombre}
                        </h3>
                        {categoria && (
                            <p className="text-sm text-gray-500">{categoria}</p>
                        )}
                    </div>

                    {/* Precios */}
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-blue-600">
                            Q{parseFloat(precio).toFixed(2)}
                        </span>
                        {precio_anterior && (
                            <>
                                <span className="text-lg text-gray-400 line-through">
                                    Q{parseFloat(precio_anterior).toFixed(2)}
                                </span>
                                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                    -{descuento}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Estado de stock */}
                    <div className="mb-3">
                        {stock > 0 ? (
                            <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                En Stock
                            </span>
                        ) : (
                            <span className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                                Agotado
                            </span>
                        )}
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col gap-2 justify-center">
                    <button
                        onClick={handleAgregarCarrito}
                        disabled={stock === 0}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            stock > 0
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <FiShoppingCart className="w-5 h-5" />
                        Mover al Carrito
                    </button>

                    <button
                        onClick={handleEliminar}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                    >
                        <FiTrash2 className="w-5 h-5" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TarjetaWishlist;