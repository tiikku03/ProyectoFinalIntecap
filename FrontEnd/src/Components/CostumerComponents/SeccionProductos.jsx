import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TarjetaProducto from "./TarjetaProducto";

function SeccionProductos({ titulo = "Novedades", limite = 4, mostrarVerTodo = true }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/leerproductos?page=1`);
                const data = await response.json();

                if (data.success && data.data.productos) {
                    setProductos(data.data.productos.slice(0, limite));
                }
            } catch (error) {
                console.error("Error al cargar productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [limite]);

    if (loading) {
        return (
            <section className="py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(limite)].map((_, index) => (
                        <div key={index} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
                    ))}
                </div>
            </section>
        );
    }

    if (productos.length === 0) {
        return (
            <section className="py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
                </div>
                <p className="text-gray-500 text-center py-12">No hay productos disponibles</p>
            </section>
        );
    }

    return (
        <section className="py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
                {mostrarVerTodo && (
                    <Link 
                        to="/productos" 
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                        Ver todo
                        <span className="text-lg">›</span>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productos.map((producto) => (
                    <TarjetaProducto key={producto.id_producto} producto={producto} />
                ))}
            </div>
        </section>
    );
}

export default SeccionProductos;
