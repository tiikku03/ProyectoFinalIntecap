import React from "react";
import TarjetaProductoAdmin from "./TarjetaProductoAdmin";

function ListaProductosAdmin({ productos, loading, onEditar, onEliminar, lastProductRef }) {
    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="space-y-0">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-20 bg-gray-100 animate-pulse border-b border-gray-200"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (productos.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-500 text-lg">No se encontraron productos</p>
                <p className="text-gray-400 text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Encabezado de la tabla */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 items-center p-4">
                    <div className="col-span-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Producto
                    </div>
                    <div className="col-span-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Categoría
                    </div>
                    <div className="col-span-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Precio
                    </div>
                    <div className="col-span-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Stock
                    </div>
                    <div className="col-span-1 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                        Acciones
                    </div>
                </div>
            </div>

            {/* Lista de productos */}
            <div>
                {productos.map((producto, index) => {
                    // Asignar ref al último producto para scroll infinito
                    if (productos.length === index + 1) {
                        return (
                            <div key={producto.id_producto} ref={lastProductRef}>
                                <TarjetaProductoAdmin
                                    producto={producto}
                                    onEditar={onEditar}
                                    onEliminar={onEliminar}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <TarjetaProductoAdmin
                                key={producto.id_producto}
                                producto={producto}
                                onEditar={onEditar}
                                onEliminar={onEliminar}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default ListaProductosAdmin;
