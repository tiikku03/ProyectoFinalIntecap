import React from "react";
import { FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";

function TablaProductos({ productos, loading, onEditar, onEliminar }) {
    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="bg-gray-200 rounded h-16 animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (productos.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No se encontraron productos</p>
                <p className="text-gray-400 text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Vista móvil - Tarjetas */}
            <div className="block lg:hidden">
                <div className="divide-y divide-gray-200">
                    {productos.map((producto) => (
                        <div key={producto.id_producto} className="p-4 hover:bg-gray-50 transition-colors">
                            {/* Imagen, nombre y ID */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="h-16 w-16 shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                                    {producto.imagen_url ? (
                                        <img
                                            src={producto.imagen_url}
                                            alt={producto.nombre}
                                            className="h-16 w-16 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <FiPackage className="text-gray-400 w-6 h-6" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900">{producto.nombre}</div>
                                    <div className="text-xs text-gray-500">#{producto.id_producto}</div>
                                    <span className="inline-block mt-1 px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {producto.categoria || 'Sin categoría'}
                                    </span>
                                </div>
                            </div>

                            {/* Información de precio y stock */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Precio</div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        ${parseFloat(producto.precio).toFixed(2)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Stock</div>
                                    <div className={`text-sm font-medium ${
                                        producto.stock_actual <= producto.stock_minimo
                                            ? 'text-red-600'
                                            : 'text-green-600'
                                    }`}>
                                        {producto.stock_actual || 0} unidades
                                    </div>
                                </div>
                            </div>

                            {/* Estado */}
                            <div className="mb-3">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    producto.activo
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {producto.activo ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>

                            {/* Acciones */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEditar(producto)}
                                    className="flex-1 py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center gap-1"
                                    title="Editar"
                                >
                                    <FiEdit2 className="w-4 h-4" />
                                    <span className="text-sm">Editar</span>
                                </button>
                                <button
                                    onClick={() => onEliminar(producto)}
                                    className="flex-1 py-2 rounded bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center gap-1"
                                    title="Eliminar"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                    <span className="text-sm">Eliminar</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vista desktop - Tabla */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Producto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Categoría
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {productos.map((producto) => (
                            <tr key={producto.id_producto} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    #{producto.id_producto}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                                            {producto.imagen_url ? (
                                                <img
                                                    src={producto.imagen_url}
                                                    alt={producto.nombre}
                                                    className="h-10 w-10 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <FiPackage className="text-gray-400" />
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {producto.nombre}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {producto.categoria || 'Sin categoría'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                    ${parseFloat(producto.precio).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <span className={`font-medium ${
                                        producto.stock_actual <= producto.stock_minimo
                                            ? 'text-red-600'
                                            : 'text-green-600'
                                    }`}>
                                        {producto.stock_actual || 0} unidades
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        producto.activo
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {producto.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEditar(producto)}
                                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onEliminar(producto)}
                                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablaProductos;
