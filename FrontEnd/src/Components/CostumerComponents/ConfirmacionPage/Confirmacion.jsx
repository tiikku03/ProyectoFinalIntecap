import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DetallesOrden from "./DetallesOrden";
import SeguimientoEnvio from "./SeguimientoEnvio";
import ResumenPedido from "./ResumenPedido";
import DireccionEnvio from "./DireccionEnvio";
import { FiHome, FiPackage } from "react-icons/fi";

function Confirmacion() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [pedido, setPedido] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const idPedido = searchParams.get("pedido");

    useEffect(() => {
        const cargarPedido = async () => {
            if (!idPedido) {
                setError("No se encontró el número de pedido");
                setCargando(false);
                return;
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/pedidos/${idPedido}`
                );

                if (!response.ok) {
                    throw new Error("Error al cargar el pedido");
                }

                const data = await response.json();
                setPedido(data);
            } catch (error) {
                console.error("Error al cargar pedido:", error);
                setError("No se pudo cargar la información del pedido");
            } finally {
                setCargando(false);
            }
        };

        cargarPedido();
    }, [idPedido]);

    const handleVolverInicio = () => {
        navigate("/");
    };

    const handleVerPedidos = () => {
        navigate("/historial-pedidos");
    };

    if (cargando) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando información del pedido...</p>
                </div>
            </div>
        );
    }

    if (error || !pedido) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || "No se encontró el pedido"}</p>
                    <button
                        onClick={handleVolverInicio}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Detalles de la orden (mensaje de éxito y número de pedido) */}
                <div className="mb-6">
                    <DetallesOrden pedido={pedido} />
                </div>

                {/* Contenido principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Columna izquierda - Información */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Seguimiento de envío */}
                        <SeguimientoEnvio pedido={pedido} />

                        {/* Dirección de envío */}
                        <DireccionEnvio pedido={pedido} />
                    </div>

                    {/* Columna derecha - Resumen del pedido */}
                    <div className="lg:col-span-1">
                        <ResumenPedido pedido={pedido} />
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleVolverInicio}
                        className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                        <FiHome className="w-5 h-5" />
                        Volver al Inicio
                    </button>

                    <button
                        onClick={handleVerPedidos}
                        className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                        <FiPackage className="w-5 h-5" />
                        Ver Mis Pedidos
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirmacion;
