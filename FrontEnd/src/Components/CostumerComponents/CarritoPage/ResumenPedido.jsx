import React from "react";
import { FiCheck } from "react-icons/fi";

function ResumenPedido({ subtotal, envio, total }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
            </h2>

            {/* Detalles del precio */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">Q{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                    <span>Envío</span>
                    {parseFloat(envio) === 0 ? (
                        <span className="text-green-600 font-semibold">GRATIS</span>
                    ) : (
                        <span className="font-semibold">Q{envio}</span>
                    )}
                </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">Q{total}</span>
                </div>
            </div>

            {/* Beneficios */}
            <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                    <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                        Aceptamos todas las tarjetas de crédito y débito
                    </span>
                </div>
                <div className="flex items-start gap-2">
                    <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                        Compra 100% segura y protegida
                    </span>
                </div>
                <div className="flex items-start gap-2">
                    <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                        Devoluciones gratis dentro de 30 días
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ResumenPedido;
