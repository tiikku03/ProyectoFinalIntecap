import React from "react";
import { FiTrash2 } from "react-icons/fi";

function ItemCarrito({ item, onCantidadChange, onEliminar }) {
    const {
        ProductoID,
        Cantidad,
        productos,
        subtotal
    } = item;

    const handleIncrementar = () => {
        onCantidadChange(ProductoID, Cantidad + 1);
    };

    const handleDecrementar = () => {
        if (Cantidad > 1) {
            onCantidadChange(ProductoID, Cantidad - 1);
        }
    };

    const handleEliminar = () => {
        onEliminar(ProductoID);
    };

    return (
        <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            {/* Imagen del producto */}
            <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                {productos.url_imagen ? (
                    <img
                        src={productos.url_imagen}
                        alt={productos.nombre}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        Producto {ProductoID}
                    </div>
                )}
            </div>

            {/* Información del producto */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                        {productos.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                        {productos.categoria}
                    </p>
                    {productos.color && (
                        <p className="text-sm text-gray-600">
                            Color: <span className="font-medium">{productos.color}</span>
                        </p>
                    )}
                </div>

                {/* Precio unitario */}
                <div className="text-blue-600 font-semibold">
                    ${parseFloat(productos.precio).toFixed(2)}
                </div>
            </div>

            {/* Controles de cantidad */}
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                        onClick={handleDecrementar}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={Cantidad <= 1}
                    >
                        -
                    </button>
                    <span className="w-12 h-8 flex items-center justify-center border-x border-gray-300 font-medium text-gray-900">
                        {Cantidad}
                    </span>
                    <button
                        onClick={handleIncrementar}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Subtotal y botón eliminar */}
            <div className="flex flex-col items-end justify-between">
                <button
                    onClick={handleEliminar}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    aria-label="Eliminar producto"
                    title="Eliminar"
                >
                    <FiTrash2 className="w-5 h-5" />
                </button>

                <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                        ${subtotal}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCarrito;
