import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgresoCheckout from "./ProgresoCheckout";
import FormularioEnvio from "./FormularioEnvio";
import ResumenCompra from "./ResumenCompra";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function Envio({ carrito, totales }) {
    const navigate = useNavigate();
    const [datosEnvio, setDatosEnvio] = useState({});
    const [formularioValido, setFormularioValido] = useState(false);

    const handleDatosChange = (datos, esValido) => {
        setDatosEnvio(datos);
        setFormularioValido(esValido);
    };

    const handleVolverCarrito = () => {
        navigate("/carrito");
    };

    const handleContinuarPago = () => {
        if (!formularioValido) {
            alert("Por favor, completa todos los campos requeridos");
            return;
        }

        // Guardar datos de envío en localStorage para usarlos en el siguiente paso
        localStorage.setItem("datosEnvio", JSON.stringify(datosEnvio));

        // Guardar snapshot del carrito para el pedido
        if (carrito && carrito.detalle_carrito) {
            localStorage.setItem("carritoCheckout", JSON.stringify({
                productos: carrito.detalle_carrito,
                totales: totales
            }));
        }

        // Navegar a la página de pago
        navigate("/pago");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Título */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Finalizar Compra
                    </h1>
                </div>

                {/* Progreso del checkout */}
                <ProgresoCheckout pasoActual={1} />

                {/* Contenido principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulario de envío */}
                    <div className="lg:col-span-2">
                        <FormularioEnvio
                            onDatosChange={handleDatosChange}
                            datosIniciales={datosEnvio}
                        />
                    </div>

                    {/* Resumen de la compra */}
                    <div className="lg:col-span-1">
                        <ResumenCompra carrito={carrito} totales={totales} />
                    </div>
                </div>

                {/* Botones de navegación */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <button
                        onClick={handleVolverCarrito}
                        className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Volver al Carrito
                    </button>

                    <button
                        onClick={handleContinuarPago}
                        disabled={!formularioValido}
                        className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                            formularioValido
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Continuar al Pago
                        <FiArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Envio;
