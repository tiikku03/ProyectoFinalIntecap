import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";
import TarjetaProducto from "../../Components/CostumerComponents/TarjetaProducto";
import Filtros from "./Filtros";

function Categoria() {
    const { categoria } = useParams();

    console.log("Categoría obtenida de la URL:", categoria);
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [filtros, setFiltros] = useState({
        precioMin: 0,
        precioMax: 50000,
        ordenPrecio: ""
    });
    const apiUrl = import.meta.env.VITE_API_URL;

    // Convertir el parámetro de URL a formato de categoría
    // Ejemplo: "alimentos" -> "Alimentos"
    const categoriaNormalizada = categoria
        ? categoria.charAt(0).toUpperCase() + categoria.slice(1)
        : '';

    useEffect(() => {
        const fetchProductosPorCategoria = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `${apiUrl}/productos/productosPorCategoria?categoria=${encodeURIComponent(categoriaNormalizada)}`
                );
                const data = await response.json();

                if (data.success) {
                    setProductos(data.data);
                    setProductosFiltrados(data.data);
                } else {
                    setError(data.message || "Error al obtener productos");
                }
            } catch (err) {
                console.error("Error al obtener productos:", err);
                setError("Error de conexión con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchProductosPorCategoria();
    }, [categoria, apiUrl, categoriaNormalizada]);

    // Aplicar filtros cuando cambien
    useEffect(() => {
        let resultado = [...productos];

        // Filtrar por rango de precio
        resultado = resultado.filter(producto => {
            const precio = parseFloat(producto.precio);
            return precio >= filtros.precioMin && precio <= filtros.precioMax;
        });

        // Ordenar por precio
        if (filtros.ordenPrecio === 'asc') {
            resultado.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
        } else if (filtros.ordenPrecio === 'desc') {
            resultado.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
        }

        setProductosFiltrados(resultado);
    }, [filtros, productos]);

    const handleFiltrosChange = (nuevosFiltros) => {
        setFiltros(nuevosFiltros);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando productos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header de la categoría */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {categoriaNormalizada}
                    </h1>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                            {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                        </p>

                        {/* Botón de filtros para móvil */}
                        <button
                            onClick={() => setMostrarFiltros(!mostrarFiltros)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <FiFilter className="w-4 h-4" />
                            <span className="font-medium">Filtros</span>
                        </button>
                    </div>
                </div>

                {/* Layout con Sidebar y Grid de productos */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar de filtros - Desktop siempre visible */}
                    <aside className="hidden lg:block lg:w-64 shrink-0">
                        <Filtros onFiltrosChange={handleFiltrosChange} />
                    </aside>

                    {/* Modal de filtros para móvil/tablet */}
                    {mostrarFiltros && (
                        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMostrarFiltros(false)}>
                            <div
                                className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
                                    <button
                                        onClick={() => setMostrarFiltros(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <Filtros onFiltrosChange={handleFiltrosChange} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Grid de productos */}
                    <div className="flex-1">
                        {productosFiltrados.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {productosFiltrados.map((producto) => (
                                    <TarjetaProducto key={producto.id_producto} producto={producto} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-600 text-lg">
                                    No hay productos que coincidan con los filtros seleccionados
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categoria;