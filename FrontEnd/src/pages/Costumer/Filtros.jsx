import React, { useState, useEffect } from "react";

function Filtros({ onFiltrosChange }) {
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(500);
    const [ordenPrecio, setOrdenPrecio] = useState("");

    useEffect(() => {
        if (onFiltrosChange) {
            onFiltrosChange({
                precioMin,
                precioMax,
                ordenPrecio
            });
        }
    }, [precioMin, precioMax, ordenPrecio]);

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Rango de Precio */}
            <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Rango de Precio</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600 mb-2 block">
                            Precio Mínimo: ${precioMin}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            value={precioMin}
                            onChange={(e) => setPrecioMin(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 mb-2 block">
                            Precio Máximo: ${precioMax}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            value={precioMax}
                            onChange={(e) => setPrecioMax(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                    <div className="pt-2 text-center">
                        <span className="text-lg font-semibold text-gray-900">
                            ${precioMin} - ${precioMax}
                        </span>
                    </div>
                </div>
            </div>

            {/* Ordenar por Precio */}
            <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Ordenar por</h3>
                <select
                    value={ordenPrecio}
                    onChange={(e) => setOrdenPrecio(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                    <option value="">Seleccionar orden</option>
                    <option value="desc">Precio: Mayor a Menor</option>
                    <option value="asc">Precio: Menor a Mayor</option>
                </select>
            </div>
        </div>
    );
}

export default Filtros;