import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiPackage } from "react-icons/fi";

function AlertasStockBajo() {
    const [productosStockBajo, setProductosStockBajo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductosStockBajo = async () => {
            try {
                let todosLosProductos = [];
                let page = 1;
                let hasMore = true;

                // Obtener todos los productos de todas las páginas
                while (hasMore) {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/leerproductos?page=${page}`);
                    const data = await response.json();
                    
                    if (data.success && data.data.productos.length > 0) {
                        todosLosProductos = [...todosLosProductos, ...data.data.productos];
                        hasMore = data.data.hasNextPage;
                        page++;
                    } else {
                        hasMore = false;
                    }
                }
                
                // Filtrar productos con stock menor a 10
                const productosBajoStock = todosLosProductos
                    .filter(producto => producto.stock < 10)
                    .map(producto => ({
                        id: producto.id_producto,
                        nombre: producto.nombre,
                        stock_actual: producto.stock,
                        stock_minimo: 10 // Definimos 10 como mínimo requerido
                    }))
                    .sort((a, b) => a.stock_actual - b.stock_actual); // Ordenar por stock (menor a mayor)
                
                setProductosStockBajo(productosBajoStock);
            } catch (error) {
                console.error("Error al cargar productos con stock bajo:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductosStockBajo();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FiAlertTriangle className="w-5 h-5 text-orange-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Alertas de Stock Bajo</h2>
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-200 rounded-lg h-20 animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FiAlertTriangle className="w-5 h-5 text-orange-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Alertas de Stock Bajo</h2>
                </div>
                {productosStockBajo.length > 0 && (
                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {productosStockBajo.length} productos requieren reposición
                    </span>
                )}
            </div>

            {productosStockBajo.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {productosStockBajo.map((producto) => (
                        <ProductoStockBajo key={producto.id} producto={producto} />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
                    <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                        No hay productos con stock bajo en este momento
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Todos los productos tienen stock adecuado (&gt;= 10 unidades)
                    </p>
                </div>
            )}
        </div>
    );
}

// Componente para cada producto individual
function ProductoStockBajo({ producto }) {
    // Determinar el nivel de urgencia basado en stock actual vs mínimo
    const porcentajeStock = (producto.stock_actual / producto.stock_minimo) * 100;
    const urgencia = porcentajeStock <= 50 ? 'alta' : porcentajeStock <= 75 ? 'media' : 'baja';

    const colores = {
        alta: {
            bg: 'bg-red-50 border-red-200',
            badge: 'bg-red-100 text-red-800',
            stock: 'text-red-600'
        },
        media: {
            bg: 'bg-orange-50 border-orange-200',
            badge: 'bg-orange-100 text-orange-800',
            stock: 'text-orange-600'
        },
        baja: {
            bg: 'bg-yellow-50 border-yellow-200',
            badge: 'bg-yellow-100 text-yellow-800',
            stock: 'text-yellow-600'
        }
    };

    const colorActual = colores[urgencia];

    return (
        <div className={`p-4 rounded-lg border ${colorActual.bg} hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                    <FiPackage className={`w-5 h-5 ${colorActual.stock}`} />
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                            {producto.nombre}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Mínimo requerido: <span className="font-medium">{producto.stock_minimo} unidades</span>
                        </p>
                    </div>
                </div>

                <div className="text-right ml-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colorActual.badge}`}>
                        {producto.stock_actual} unidades
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AlertasStockBajo;
