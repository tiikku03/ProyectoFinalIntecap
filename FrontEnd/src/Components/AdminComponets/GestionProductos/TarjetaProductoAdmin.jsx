import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function TarjetaProductoAdmin({ producto, onEditar, onEliminar }) {
    // Determinar el color del stock según la cantidad
    const getStockColor = (stock) => {
        if (stock >= 30) return "bg-green-500";
        if (stock >= 10) return "bg-orange-500";
        return "bg-orange-500";
    };

    return (
        <div className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-12 gap-4 items-center p-4">
                {/* Imagen y detalles del producto */}
                <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        {producto.url_imagen ? (
                            <img
                                src={producto.url_imagen}
                                alt={producto.nombre}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `
                                        <div class="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    `;
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{producto.nombre}</h3>
                        <p className="text-sm text-gray-500 truncate">{producto.descripcion || 'Sin descripción'}</p>
                    </div>
                </div>

                {/* Categoría y Subcategoría */}
                <div className="col-span-6 md:col-span-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {producto.categoria || 'Sin categoría'}
                        </span>
                        {producto.subcategoria && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                {producto.subcategoria}
                            </span>
                        )}
                    </div>
                </div>

                {/* Precio */}
                <div className="col-span-6 md:col-span-2 text-right md:text-left">
                    <span className="font-semibold text-gray-900">${parseFloat(producto.precio).toFixed(2)}</span>
                </div>

                {/* Stock */}
                <div className="col-span-6 md:col-span-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${getStockColor(producto.stock)}`}>
                        {producto.stock} unidades
                    </span>
                </div>

                {/* Acciones */}
                <div className="col-span-12 md:col-span-1 flex items-center justify-end gap-2">
                    <button
                        onClick={() => onEditar(producto)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEliminar(producto)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TarjetaProductoAdmin;
