import React from "react";
import { FiPackage, FiCreditCard, FiCheckCircle } from "react-icons/fi";

function ProgresoCheckout({ pasoActual = 1 }) {
    const pasos = [
        { numero: 1, nombre: "Envío", icono: FiPackage },
        { numero: 2, nombre: "Pago", icono: FiCreditCard },
        { numero: 3, nombre: "Revisión", icono: FiCheckCircle }
    ];

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
                {pasos.map((paso, index) => {
                    const IconComponent = paso.icono;
                    const isActive = paso.numero === pasoActual;
                    const isCompleted = paso.numero < pasoActual;

                    return (
                        <React.Fragment key={paso.numero}>
                            {/* Paso */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : isCompleted
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-200 text-gray-400"
                                    }`}
                                >
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <span
                                    className={`mt-2 text-sm font-medium ${
                                        isActive
                                            ? "text-blue-600"
                                            : isCompleted
                                            ? "text-green-600"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {paso.nombre}
                                </span>
                            </div>

                            {/* Línea conectora */}
                            {index < pasos.length - 1 && (
                                <div className="flex-1 h-1 mx-4 relative top-[-20px]">
                                    <div
                                        className={`h-full transition-colors ${
                                            paso.numero < pasoActual
                                                ? "bg-green-600"
                                                : "bg-gray-200"
                                        }`}
                                    ></div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default ProgresoCheckout;
