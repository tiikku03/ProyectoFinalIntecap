import React from 'react';
import { FiHeart } from 'react-icons/fi';

const EncabezadoWishlist = ({ cantidadProductos }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-pink-100 rounded-full p-3">
                        <FiHeart className="w-8 h-8 text-pink-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Mi Lista de Deseos
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {cantidadProductos} {cantidadProductos === 1 ? 'producto guardado' : 'productos guardados'}
                        </p>
                    </div>
                </div>

                {cantidadProductos > 0 && (
                    <div className="bg-blue-100 rounded-full px-6 py-3">
                        <span className="text-2xl font-bold text-blue-600">
                            {cantidadProductos}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EncabezadoWishlist;