import React from "react";
import { FiArrowRight } from "react-icons/fi";

function BotonesAccion({ onProcederPago, onContinuarComprando, deshabilitarPago = false }) {
    return (
        <div className="space-y-4">
            {/* Botón Proceder al Pago */}
            <button
                onClick={onProcederPago}
                disabled={deshabilitarPago}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Proceder al Pago
                <FiArrowRight className="w-5 h-5" />
            </button>

            {/* Botón Continuar Comprando */}
            <button
                onClick={onContinuarComprando}
                className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold"
            >
                Continuar Comprando
            </button>
        </div>
    );
}

export default BotonesAccion;
