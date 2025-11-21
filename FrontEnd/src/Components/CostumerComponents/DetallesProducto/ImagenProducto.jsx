import React, { useState } from "react";

function ImagenProducto({ imagenes = [] }) {
    const [imagenActual, setImagenActual] = useState(0);
    const [errorImagen, setErrorImagen] = useState(false);

    // Si no hay imágenes o hay error, mostrar placeholder
    if (!imagenes || imagenes.length === 0 || errorImagen) {
        return (
            <div className="w-full lg:w-1/2">
                <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                    <div className="text-center">
                        <svg className="w-24 h-24 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-400 text-lg">
                            {errorImagen ? 'Imagen no disponible' : 'Sin imagen'}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full lg:w-1/2">
            {/* Imagen principal */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                <div className="aspect-square relative">
                    <img
                        src={imagenes[imagenActual]}
                        alt={`Producto imagen ${imagenActual + 1}`}
                        className="w-full h-full object-contain"
                        onError={() => setErrorImagen(true)}
                    />
                </div>
            </div>

            {/* Miniaturas */}
            {imagenes.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {imagenes.map((imagen, index) => (
                        <button
                            key={index}
                            onClick={() => setImagenActual(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                imagenActual === index
                                    ? "border-blue-600 ring-2 ring-blue-200"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <img
                                src={imagen}
                                alt={`Miniatura ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImagenProducto;
