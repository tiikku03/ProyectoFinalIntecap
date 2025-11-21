import React from "react";
import { FiMapPin, FiEdit } from "react-icons/fi";

function DatosEnvio({ datosEnvio, onEditar }) {
    if (!datosEnvio) {
        return null;
    }

    const {
        nombre,
        apellido,
        correo,
        telefono,
        direccion,
        departamento,
        codigoPostal,
        pais,
    } = datosEnvio;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FiMapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Información de Envío
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Nombre completo</p>
                        <p className="text-sm font-medium text-gray-900">
                            {nombre} {apellido}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Teléfono</p>
                        <p className="text-sm font-medium text-gray-900">{telefono}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 mb-1">Correo electrónico</p>
                    <p className="text-sm font-medium text-gray-900">{correo}</p>
                </div>

                <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-2">Dirección de entrega</p>
                    <p className="text-sm font-medium text-gray-900">{direccion}</p>
                    <p className="text-sm text-gray-700">
                        {departamento}, {codigoPostal}
                    </p>
                    <p className="text-sm text-gray-700">{pais}</p>
                </div>
            </div>
        </div>
    );
}

export default DatosEnvio;
