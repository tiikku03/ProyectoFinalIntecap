import React from "react";

function StatCard({ titulo, valor, cambio, icono: Icon, colorIcono = "text-blue-600" }) {
    const esCambioPositivo = cambio && parseFloat(cambio) >= 0;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{titulo}</h3>
                {Icon && (
                    <div className={`p-2 rounded-lg bg-gray-50 ${colorIcono}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
            </div>
            
            <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900">
                    {valor || "$0"}
                </p>
                
                {cambio && (
                    <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${
                            esCambioPositivo ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {esCambioPositivo ? '↑' : '↓'} {Math.abs(parseFloat(cambio))}%
                        </span>
                        <span className="text-sm text-gray-500">vs semana anterior</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StatCard;
