import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

function FiltrosProductos({ 
    busqueda, 
    setBusqueda, 
    categoriaSeleccionada, 
    setCategoriaSeleccionada, 
    idBusqueda, 
    setIdBusqueda,
    productos // Agregar productos como prop
}) {
    const [categorias, setCategorias] = useState(["Todos"]);

    // Extraer categorías únicas de los productos
    useEffect(() => {
        if (productos && productos.length > 0) {
            const categoriasUnicas = [...new Set(
                productos
                    .map(producto => producto.categoria)
                    .filter(cat => cat && cat.trim() !== '')
            )].sort();
            
            setCategorias(["Todos", ...categoriasUnicas]);
        } else {
            setCategorias(["Todos"]);
        }
    }, [productos]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros de Búsqueda</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Búsqueda por nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buscar por nombre
                    </label>
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {/* Filtro por categoría */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría
                    </label>
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        {categorias.map((categoria, index) => (
                            <option key={index} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Búsqueda por ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buscar por ID
                    </label>
                    <input
                        type="number"
                        placeholder="ID del producto"
                        value={idBusqueda}
                        onChange={(e) => setIdBusqueda(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                </div>
            </div>
        </div>
    );
}

export default FiltrosProductos;
