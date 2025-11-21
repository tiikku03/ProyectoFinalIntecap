import React, { useState } from "react";
import ReseñasProducto from "./ReseñasProducto";

function TabsDescripcionReseñas({ descripcion, idProducto }) {
    const [tabActiva, setTabActiva] = useState('descripcion');

    return (
        <div className="w-full">
            {/* Tabs Header */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                    <button
                        onClick={() => setTabActiva('descripcion')}
                        className={`pb-4 px-2 font-medium transition-colors relative ${
                            tabActiva === 'descripcion'
                                ? 'text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Descripción
                        {tabActiva === 'descripcion' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                        )}
                    </button>

                    <button
                        onClick={() => setTabActiva('reseñas')}
                        className={`pb-4 px-2 font-medium transition-colors relative ${
                            tabActiva === 'reseñas'
                                ? 'text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Reseñas
                        {tabActiva === 'reseñas' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                        )}
                    </button>
                </div>
            </div>

            {/* Tabs Content */}
            <div className="min-h-[200px]">
                {tabActiva === 'descripcion' && (
                    <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Descripción del Producto
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {descripcion || 'Sin descripción disponible'}
                        </p>
                    </div>
                )}

                {tabActiva === 'reseñas' && (
                    <ReseñasProducto idProducto={idProducto} />
                )}
            </div>
        </div>
    );
}

export default TabsDescripcionReseñas;
