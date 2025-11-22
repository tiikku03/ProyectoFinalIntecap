import React from "react";
import { FiCheckCircle, FiFileText } from "react-icons/fi";

function DetallesOrden({ pedido }) {
    if (!pedido) {
        return null;
    }

    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const opciones = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString("es-MX", opciones);
    };

    const formatearNumeroPedido = (id) => {
        return `ORD-${String(id).padStart(6, "0")}`;
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-10 h-10 text-green-600" />
                </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Gracias por tu compra. Hemos recibido tu pedido correctamente
            </h1>

            <div className="mt-6 border-t border-b border-gray-200 py-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <FiFileText className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-600">Número de Pedido</p>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                    {formatearNumeroPedido(pedido.id_pedido)}
                </p>
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-600">Fecha de Pedido</p>
                <p className="text-lg font-semibold text-gray-900">
                    {formatearFecha(pedido.fecha_pedido)}
                </p>
            </div>
        </div>
    );
}

export default DetallesOrden;
