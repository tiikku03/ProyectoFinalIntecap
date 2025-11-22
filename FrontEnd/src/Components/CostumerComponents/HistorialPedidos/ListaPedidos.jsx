import React from "react";
import TarjetaPedido from "./TarjetaPedido";
import { FiPackage, FiAlertCircle } from "react-icons/fi";

function ListaPedidos({ pedidos, cargando, error }) {
    if (cargando) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 text-lg">Cargando tus pedidos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Error al cargar los pedidos
                </h3>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (!pedidos || pedidos.length === 0) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <FiPackage className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No tienes pedidos todavía
                </h3>
                <p className="text-gray-500 mb-6">
                    Cuando realices una compra, aparecerá aquí
                </p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    Explorar Productos
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {pedidos.map((pedido) => (
                <TarjetaPedido key={pedido.id_pedido} pedido={pedido} />
            ))}
        </div>
    );
}

export default ListaPedidos;
