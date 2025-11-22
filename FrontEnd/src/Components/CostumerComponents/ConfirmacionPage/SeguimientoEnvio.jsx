import React from "react";
import { FiTruck, FiMail, FiCalendar } from "react-icons/fi";

function SeguimientoEnvio({ pedido }) {
    if (!pedido) {
        return null;
    }

    const calcularFechaEstimada = () => {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + 5); // Estimado 5 días hábiles
        const opciones = {
            weekday: "long",
            day: "numeric",
            month: "long",
        };
        return fecha.toLocaleDateString("es-MX", opciones);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
                <FiTruck className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                    Seguimiento de Envío
                </h3>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                    <FiMail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">
                            Te enviaremos un correo electrónico con la información de seguimiento
                        </p>
                        <p className="text-xs text-blue-700">
                            Recibirás actualizaciones sobre el estado de tu pedido por correo electrónico
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <FiCalendar className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Fecha estimada de entrega
                        </p>
                        <p className="text-sm text-gray-600 capitalize">
                            {calcularFechaEstimada()}
                        </p>
                    </div>
                </div>

                <div className="border-t pt-3 mt-3">
                    <p className="text-xs text-gray-500">
                        Puedes hacer seguimiento de tu pedido en cualquier momento desde tu cuenta
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SeguimientoEnvio;
