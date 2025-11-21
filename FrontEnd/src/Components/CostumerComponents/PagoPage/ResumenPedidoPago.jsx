import React from "react";

function ResumenPedidoPago({ carrito, totales }) {
    if (!carrito || !carrito.detalle_carrito) {
        return null;
    }

    const { subtotal, envio, total } = totales;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
            </h2>

            {/* Lista de productos */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {carrito.detalle_carrito.map((item) => (
                    <div key={item.ProductoID} className="flex gap-3 items-start">
                        {/* Imagen miniatura */}
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
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

                        {/* Información del producto */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {item.productos.nombre}
                            </h3>
                            <p className="text-xs text-gray-600 truncate">
                                {item.productos.categoria}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-700">
                                    Cantidad: <span className="font-semibold">{item.Cantidad}</span>
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                    ${item.subtotal}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Separador */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Detalles del precio */}
            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                    <span>Envío</span>
                    {parseFloat(envio) === 0 ? (
                        <span className="text-green-600 font-semibold">GRATIS</span>
                    ) : (
                        <span className="font-semibold">${envio}</span>
                    )}
                </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">${total}</span>
                </div>
            </div>
        </div>
    );
}

export default ResumenPedidoPago;
