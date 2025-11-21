import React from "react";
import { FiCreditCard } from "react-icons/fi";
import { FaPaypal, FaCcStripe } from "react-icons/fa";

function MetodoPago({ metodoPagoSeleccionado, onMetodoPagoChange }) {
    const metodosPago = [
        {
            id: "tarjeta",
            nombre: "Tarjeta de Crédito/Débito",
            descripcion: "Visa, Mastercard, American Express",
            icono: FiCreditCard,
        },
        {
            id: "paypal",
            nombre: "PayPal",
            descripcion: "Paga con tu cuenta PayPal",
            icono: FaPaypal,
        },
        {
            id: "stripe",
            nombre: "Stripe",
            descripcion: "Pago seguro con Stripe",
            icono: FaCcStripe,
        },
    ];

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Selecciona tu método de pago
            </h3>

            <div className="space-y-3">
                {metodosPago.map((metodo) => {
                    const IconComponent = metodo.icono;
                    const isSelected = metodoPagoSeleccionado === metodo.id;

                    return (
                        <div
                            key={metodo.id}
                            onClick={() => onMetodoPagoChange(metodo.id)}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                isSelected
                                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        isSelected
                                            ? "border-blue-600"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    )}
                                </div>

                                <IconComponent
                                    className={`w-8 h-8 ${
                                        isSelected ? "text-blue-600" : "text-gray-600"
                                    }`}
                                />

                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">
                                        {metodo.nombre}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {metodo.descripcion}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MetodoPago;
