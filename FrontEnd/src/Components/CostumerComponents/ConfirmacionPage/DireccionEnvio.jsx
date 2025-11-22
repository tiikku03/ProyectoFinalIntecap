import React from "react";
import { FiMapPin } from "react-icons/fi";

function DireccionEnvio({ pedido }) {
    if (!pedido) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
                <FiMapPin className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                    Dirección de Envío
                </h3>
            </div>

            <div className="space-y-3">
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {pedido.direccion_envio}
                    </p>
                </div>

                {pedido.metodo_pago && (
                    <div className="border-t pt-3 mt-3">
                        <p className="text-xs text-gray-500 mb-1">Método de pago</p>
                        <p className="text-sm font-medium text-gray-900 capitalize">
                            {pedido.metodo_pago}
                        </p>
                    </div>
                )}

                <div className="border-t pt-3 mt-3">
                    <p className="text-xs text-gray-500 mb-1">Estado del pedido</p>
                    <div className="inline-block">
                        <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                pedido.estado === "Pendiente"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : pedido.estado === "Procesando"
                                    ? "bg-blue-100 text-blue-800"
                                    : pedido.estado === "Enviado"
                                    ? "bg-purple-100 text-purple-800"
                                    : pedido.estado === "Entregado"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {pedido.estado}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DireccionEnvio;
