import React from "react";
import { Link } from "react-router-dom";

function TarjetaProducto({ producto }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Imagen del producto */}
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                {producto.imagen_url ? (
                    <img 
                        src={producto.imagen_url} 
                        alt={producto.nombre}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">Sin imagen</span>
                )}
            </div>

            {/* Información del producto */}
            <div className="p-4">
                <Link 
                    to={`/producto/${producto.id_producto}`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 mb-2 block"
                >
                    {producto.nombre}
                </Link>

                <p className="text-blue-600 text-xl font-bold mb-4">
                    ${parseFloat(producto.precio).toFixed(2)}
                </p>

                <button className="w-full bg-white border-2 border-gray-800 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-800 hover:text-white transition-colors duration-300">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}

export default TarjetaProducto;
