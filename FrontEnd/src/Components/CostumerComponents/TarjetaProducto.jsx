import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";

function TarjetaProducto({ producto }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    // Obtener la URL de la imagen (soporta tanto url_imagen como imagen_url)
    const imagenUrl = producto.url_imagen || producto.imagen_url;

    const handleVerMas = () => {
        navigate(`/producto/${producto.id_producto}`);
    };

    return (
        <div
            className={`bg-white rounded-lg shadow-md overflow-visible transition-all duration-300 ${
                isHovered ? 'scale-105 shadow-2xl z-10' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Imagen del producto con botón "Ver más" */}
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden relative group">
                {imagenUrl ? (
                    <>
                        <img
                            src={imagenUrl}
                            alt={producto.nombre}
                            className="w-full h-full object-cover transition-all duration-300"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm">Imagen no disponible</span>';
                            }}
                        />

                        {/* Botón "Ver más" solo sobre la imagen */}
                        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}>
                            <button
                                onClick={handleVerMas}
                                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                <FiEye className="w-5 h-5" />
                                Ver más
                            </button>
                        </div>
                    </>
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

                <p className="text-blue-600 text-xl font-bold mb-3">
                    ${parseFloat(producto.precio).toFixed(2)}
                </p>

                {/* Descripción que aparece al hacer hover */}
                <div className={`transition-all duration-300 overflow-hidden ${
                    isHovered ? 'max-h-32 opacity-100 mb-3' : 'max-h-0 opacity-0'
                }`}>
                    <p className="text-gray-600 text-sm line-clamp-3">
                        {producto.descripcion || 'Sin descripción disponible'}
                    </p>
                </div>

                <button className="w-full bg-white border-2 border-gray-800 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-800 hover:text-white transition-colors duration-300">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}

export default TarjetaProducto;
