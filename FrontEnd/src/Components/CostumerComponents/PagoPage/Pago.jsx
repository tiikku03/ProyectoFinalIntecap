import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgresoCheckout from "../EnvioPage/ProgresoCheckout";
import MetodoPago from "./MetodoPago";
import FormularioTarjeta from "./FormularioTarjeta";
import ResumenPedidoPago from "./ResumenPedidoPago";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function Pago({ carrito, totales }) {
    const navigate = useNavigate();
    const [metodoPago, setMetodoPago] = useState("tarjeta");
    const [datosTarjeta, setDatosTarjeta] = useState({});
    const [formularioValido, setFormularioValido] = useState(false);

    const handleMetodoPagoChange = (nuevoMetodo) => {
        setMetodoPago(nuevoMetodo);
        // Si cambia a un método que no es tarjeta, marcar como válido automáticamente
        if (nuevoMetodo !== "tarjeta") {
            setFormularioValido(true);
        } else {
            setFormularioValido(false);
        }
    };

    const handleDatosTarjetaChange = (datos, esValido) => {
        setDatosTarjeta(datos);
        setFormularioValido(esValido);
    };

    const handleVolver = () => {
        navigate("/checkout");
    };

    const handleContinuarRevision = () => {
        if (metodoPago === "tarjeta" && !formularioValido) {
            alert("Por favor, completa todos los campos de la tarjeta");
            return;
        }

        // Guardar datos de pago en localStorage
        localStorage.setItem("metodoPago", metodoPago);
        if (metodoPago === "tarjeta") {
            localStorage.setItem("datosTarjeta", JSON.stringify(datosTarjeta));
        }

        // Navegar a la página de revisión
        navigate("/revision");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Título */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Método de Pago
                    </h1>
                </div>

                {/* Progreso del checkout */}
                <ProgresoCheckout pasoActual={2} />

                {/* Contenido principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulario de pago */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                    2
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Método de Pago
                                </h2>
                            </div>

                            {/* Selector de método de pago */}
                            <MetodoPago
                                metodoPagoSeleccionado={metodoPago}
                                onMetodoPagoChange={handleMetodoPagoChange}
                            />

                            {/* Formulario de tarjeta (solo si se selecciona tarjeta) */}
                            {metodoPago === "tarjeta" && (
                                <FormularioTarjeta
                                    onDatosChange={handleDatosTarjetaChange}
                                    datosIniciales={datosTarjeta}
                                />
                            )}

                            {/* Mensajes para otros métodos de pago */}
                            {metodoPago === "paypal" && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                                    <p className="text-blue-900 font-semibold mb-2">
                                        Serás redirigido a PayPal
                                    </p>
                                    <p className="text-sm text-blue-700">
                                        Al continuar, serás redirigido a PayPal para completar tu pago de forma segura.
                                    </p>
                                </div>
                            )}

                            {metodoPago === "stripe" && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                                    <p className="text-blue-900 font-semibold mb-2">
                                        Serás redirigido a Stripe
                                    </p>
                                    <p className="text-sm text-blue-700">
                                        Al continuar, serás redirigido a Stripe para completar tu pago de forma segura.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Resumen del pedido */}
                    <div className="lg:col-span-1">
                        <ResumenPedidoPago carrito={carrito} totales={totales} />
                    </div>
                </div>

                {/* Botones de navegación */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <button
                        onClick={handleVolver}
                        className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Volver
                    </button>

                    <button
                        onClick={handleContinuarRevision}
                        disabled={metodoPago === "tarjeta" && !formularioValido}
                        className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                            metodoPago === "tarjeta" && !formularioValido
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                        Continuar a Revisión
                        <FiArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pago;
