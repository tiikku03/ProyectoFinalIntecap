import React from "react";
import { FiPackage } from "react-icons/fi";

function ResumenFinal({ carrito, totales }) {
    if (!carrito || !carrito.detalle_carrito) {
        return null;
    }

    const { subtotal, envio, total } = totales;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
                <FiPackage className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                    Resumen del Pedido
                </h3>
            </div>

            {/* Lista de productos */}
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {carrito.detalle_carrito.map((item) => (
                    <div
                        key={item.ProductoID}
                        className="flex gap-3 pb-4 border-b border-gray-100 last:border-0"
                    >
                        {/* Imagen */}
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                            {item.productos.url_imagen ? (
                                <img
                                    src={item.productos.url_imagen}
                                    alt={item.productos.nombre}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                    Sin imagen
                                </div>
                            )}
                        </div>

                        {/* Información */}
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                {item.productos.nombre}
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">
                                {item.productos.categoria}
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="text-xs text-gray-600">
                                    <span className="font-medium">
                                        ${parseFloat(item.productos.precio).toFixed(2)}
                                    </span>
                                    {" × "}
                                    <span className="font-semibold">{item.Cantidad}</span>
                                </div>
                                <div className="text-sm font-bold text-gray-900">
                                    ${item.subtotal}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Totales */}
            <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-700">
                    <span>Envío</span>
                    {parseFloat(envio) === 0 ? (
                        <span className="text-green-600 font-semibold">GRATIS</span>
                    ) : (
                        <span className="font-semibold">${envio}</span>
                    )}
                </div>

                <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-blue-600">
                            ${total}
                        </span>
                    </div>
                </div>
            </div>

            {/* Nota adicional */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                    Al confirmar tu pedido, aceptas nuestros{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        términos y condiciones
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

export default ResumenFinal;
