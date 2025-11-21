import React from "react";
import { FiCreditCard, FiEdit } from "react-icons/fi";
import { FaPaypal, FaCcStripe } from "react-icons/fa";

function DatosPago({ metodoPago, datosTarjeta, onEditar }) {
    const getIconoMetodo = () => {
        switch (metodoPago) {
            case "tarjeta":
                return <FiCreditCard className="w-5 h-5 text-blue-600" />;
            case "paypal":
                return <FaPaypal className="w-5 h-5 text-blue-600" />;
            case "stripe":
                return <FaCcStripe className="w-5 h-5 text-blue-600" />;
            default:
                return <FiCreditCard className="w-5 h-5 text-blue-600" />;
        }
    };

    const getNombreMetodo = () => {
        switch (metodoPago) {
            case "tarjeta":
                return "Tarjeta de Crédito/Débito";
            case "paypal":
                return "PayPal";
            case "stripe":
                return "Stripe";
            default:
                return "Método de pago";
        }
    };

    const ocultarNumeroTarjeta = (numero) => {
        if (!numero) return "";
        const limpio = numero.replace(/\s+/g, "");
        const ultimos4 = limpio.slice(-4);
        return `•••• •••• •••• ${ultimos4}`;
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {getIconoMetodo()}
                    <h3 className="text-lg font-semibold text-gray-900">
                        Método de Pago
                    </h3>
                </div>
                <button
                    onClick={onEditar}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    <FiEdit className="w-4 h-4" />
                    Editar
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {getNombreMetodo()}
                    </p>
                </div>

                {metodoPago === "tarjeta" && datosTarjeta && (
                    <div className="border-t pt-3 space-y-2">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Número de tarjeta</p>
                            <p className="text-sm font-medium text-gray-900">
                                {ocultarNumeroTarjeta(datosTarjeta.numeroTarjeta)}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Titular</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {datosTarjeta.nombreTarjeta}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Vencimiento</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {datosTarjeta.fechaExpiracion}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {metodoPago === "paypal" && (
                    <div className="border-t pt-3">
                        <p className="text-sm text-gray-600">
                            Serás redirigido a PayPal para completar el pago de forma segura.
                        </p>
                    </div>
                )}

                {metodoPago === "stripe" && (
                    <div className="border-t pt-3">
                        <p className="text-sm text-gray-600">
                            El pago será procesado de forma segura a través de Stripe.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DatosPago;
