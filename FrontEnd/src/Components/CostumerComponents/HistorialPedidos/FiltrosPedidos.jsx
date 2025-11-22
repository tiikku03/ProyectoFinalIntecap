import React from "react";
import { FiFilter } from "react-icons/fi";

function FiltrosPedidos({ estadoSeleccionado, onCambiarEstado }) {
    const estados = [
        { valor: "todos", etiqueta: "Todos", color: "bg-gray-600 hover:bg-gray-700" },
        { valor: "Pendiente", etiqueta: "Pendiente", color: "bg-yellow-600 hover:bg-yellow-700" },
        { valor: "Procesando", etiqueta: "Procesando", color: "bg-blue-600 hover:bg-blue-700" },
        { valor: "Enviado", etiqueta: "Enviado", color: "bg-purple-600 hover:bg-purple-700" },
        { valor: "Entregado", etiqueta: "Recibido", color: "bg-green-600 hover:bg-green-700" },
        { valor: "Cancelado", etiqueta: "Cancelado", color: "bg-red-600 hover:bg-red-700" },
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <FiFilter className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">Filtrar por estado</h3>
            </div>

            <div className="flex flex-wrap gap-3">
                {estados.map((estado) => (
                    <button
                        key={estado.valor}
                        onClick={() => onCambiarEstado(estado.valor)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            estadoSeleccionado === estado.valor
                                ? `${estado.color} text-white shadow-md scale-105`
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        {estado.etiqueta}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FiltrosPedidos;
