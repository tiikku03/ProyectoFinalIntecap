import React from "react";
import { FiPackage, FiCalendar, FiCreditCard, FiMapPin, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function TarjetaPedido({ pedido }) {
    const navigate = useNavigate();

    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const opciones = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString("es-MX", opciones);
    };

    const formatearNumeroPedido = (id) => {
        return `ORD-${String(id).padStart(8, "0")}`;
    };

    const obtenerColorEstado = (estado) => {
        const colores = {
            Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
            Procesando: "bg-blue-100 text-blue-800 border-blue-300",
            Enviado: "bg-purple-100 text-purple-800 border-purple-300",
            Entregado: "bg-green-100 text-green-800 border-green-300",
            Cancelado: "bg-red-100 text-red-800 border-red-300",
        };
        return colores[estado] || "bg-gray-100 text-gray-800 border-gray-300";
    };

    const handleVerDetalles = () => {
        navigate(`/confirmacion?pedido=${pedido.id_pedido}`);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 p-6 mb-4 shadow-sm hover:shadow-md">
            {/* Header con número de pedido y estado */}
            <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FiPackage className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            {formatearNumeroPedido(pedido.id_pedido)}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <FiCalendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                                {formatearFecha(pedido.fecha_pedido)}
                            </span>
                        </div>
                    </div>
                </div>
                <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${obtenerColorEstado(
                        pedido.estado
                    )}`}
                >
                    {pedido.estado}
                </span>
            </div>

            {/* Información del pedido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start gap-2">
                    <FiMapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-700">Dirección de envío</p>
                        <p className="text-sm text-gray-600">{pedido.direccion_envio}</p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <FiCreditCard className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-700">Método de pago</p>
                        <p className="text-sm text-gray-600">{pedido.metodo_pago}</p>
                    </div>
                </div>
            </div>

            {/* Footer con total y botón */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">
                        Q{parseFloat(pedido.total).toFixed(2)}
                    </p>
                </div>
                <button
                    onClick={handleVerDetalles}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    Ver Detalles
                    <FiChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default TarjetaPedido;
