import React from "react";
import { FiPackage } from "react-icons/fi";

function ResumenPedido({ pedido }) {
    if (!pedido || !pedido.detalle_pedido) {
        return null;
    }

    const calcularSubtotal = () => {
        return pedido.detalle_pedido.reduce((acc, item) => {
            return acc + parseFloat(item.productos.precio) * item.cantidad;
        }, 0);
    };

    const subtotal = calcularSubtotal();
    const envio = subtotal >= 100 ? 0 : 10;
    const total = parseFloat(pedido.total);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
                <FiPackage className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                    Resumen del Pedido
                </h3>
            </div>

            {/* Lista de productos */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {pedido.detalle_pedido.map((item, index) => (
                    <div
                        key={index}
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
                                    <span className="font-semibold">
                                        Cantidad: {item.cantidad}
                                    </span>
                                </div>
                                <div className="text-sm font-bold text-gray-900">
                                    $
                                    {(
                                        parseFloat(item.productos.precio) *
                                        item.cantidad
                                    ).toFixed(2)}
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
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-700">
                    <span>Envío</span>
                    {envio === 0 ? (
                        <span className="text-green-600 font-semibold">GRATIS</span>
                    ) : (
                        <span className="font-semibold">${envio.toFixed(2)}</span>
                    )}
                </div>

                <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                            Total Pagado
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumenPedido;
