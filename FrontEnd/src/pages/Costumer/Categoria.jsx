import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TarjetaProducto from "../../Components/CostumerComponents/TarjetaProducto";

function Categoria() {
    const { categoria } = useParams();

    console.log("Categoría obtenida de la URL:", categoria);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {categoriaNormalizada}
                    </h1>
                    <p className="text-gray-600">
                        {productos.length} {productos.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                    </p>
                </div>

                {/* Grid de productos */}
                {productos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productos.map((producto) => (
                            <TarjetaProducto key={producto.id_producto} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No hay productos disponibles en esta categoría
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Categoria;