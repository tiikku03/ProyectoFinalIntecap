import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

function Cantidad({ cantidad, onCantidadChange, stockDisponible = 10, maximoPermitido = 10 }) {
    const handleIncrement = () => {
        const maximo = Math.min(stockDisponible, maximoPermitido);
        if (cantidad < maximo) {
            onCantidadChange(cantidad + 1);
        }
    };

    const handleDecrement = () => {
        if (cantidad > 1) {
            onCantidadChange(cantidad - 1);
        }
    };

    const handleInputChange = (e) => {
        const valor = parseInt(e.target.value);
        const maximo = Math.min(stockDisponible, maximoPermitido);

        if (!isNaN(valor) && valor >= 1 && valor <= maximo) {
            onCantidadChange(valor);
        }
    };

    const maximo = Math.min(stockDisponible, maximoPermitido);

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad
            </label>
            <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <button
                        onClick={handleDecrement}
                        disabled={cantidad <= 1}
                        className="px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Decrementar cantidad"
                    >
                        <FiMinus className="w-4 h-4 text-gray-600" />
                    </button>

                    <input
                        type="number"
                        value={cantidad}
                        onChange={handleInputChange}
                        min="1"
                        max={maximo}
                        className="w-16 text-center py-2 border-x-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />

                    <button
                        onClick={handleIncrement}
                        disabled={cantidad >= maximo}
                        className="px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Incrementar cantidad"
                    >
                        <FiPlus className="w-4 h-4 text-gray-600" />
                    </button>
                </div>

                <span className="text-sm text-gray-500">
                    Máximo {maximo} unidades
                </span>
            </div>
        </div>
    );
}

export default Cantidad;
