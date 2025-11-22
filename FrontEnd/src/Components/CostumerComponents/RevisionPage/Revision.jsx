import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/LogInContext";
import ProgresoCheckout from "../EnvioPage/ProgresoCheckout";
import DatosEnvio from "./DatosEnvio";
import DatosPago from "./DatosPago";
import ResumenFinal from "./ResumenFinal";
import { FiArrowLeft } from "react-icons/fi";

function Revision({ carrito, totales }) {
    const navigate = useNavigate();
    const { usuario } = useAuth();
    const [datosEnvio, setDatosEnvio] = useState(null);
    const [metodoPago, setMetodoPago] = useState(null);
    const [datosTarjeta, setDatosTarjeta] = useState(null);
    const [procesando, setProcesando] = useState(false);

    useEffect(() => {
        // Cargar datos de localStorage
        const datosEnvioGuardados = localStorage.getItem("datosEnvio");
        const metodoPagoGuardado = localStorage.getItem("metodoPago");
        const datosTarjetaGuardados = localStorage.getItem("datosTarjeta");

        if (datosEnvioGuardados) {
            setDatosEnvio(JSON.parse(datosEnvioGuardados));
        }

        if (metodoPagoGuardado) {
            setMetodoPago(metodoPagoGuardado);
        }

        if (datosTarjetaGuardados) {
            setDatosTarjeta(JSON.parse(datosTarjetaGuardados));
        }

        // Si no hay datos, redirigir al checkout
        if (!datosEnvioGuardados || !metodoPagoGuardado) {
            navigate("/checkout");
        }
    }, [navigate]);

    const handleEditarEnvio = () => {
        navigate("/checkout");
    };

    const handleEditarPago = () => {
        navigate("/pago");
    };

    const handleVolver = () => {
        navigate("/pago");
    };

    const handleConfirmarPedido = async () => {
        if (!usuario) {
            alert("Debes iniciar sesión para completar la compra");
            navigate("/login");
            return;
        }

        // Verificar que hay productos en el carrito
        if (!carrito || !carrito.detalle_carrito || carrito.detalle_carrito.length === 0) {
            alert("No hay productos en el carrito para crear el pedido.");
            navigate("/carrito");
            return;
        }

        setProcesando(true);

        // Debug: Verificar qué se está enviando
        console.log("Carrito completo:", carrito);
        console.log("Detalle carrito:", carrito?.detalle_carrito);
        console.log("Totales:", totales);

        try {
            // Extraer solo los datos necesarios de los productos para evitar referencias circulares
            const productosLimpios = carrito.detalle_carrito.map(item => ({
                ProductoID: item.ProductoID,
                Cantidad: item.Cantidad,
            }));

            const bodyData = {
                idUsuario: usuario.id_usuario,
                datosEnvio: datosEnvio,
                metodoPago: metodoPago,
                productos: productosLimpios,
                total: parseFloat(totales.total),
            };

            console.log("Body que se enviará:", bodyData);
            console.log("Productos limpios:", productosLimpios);

            // Intentar hacer stringify y ver qué pasa
            const bodyString = JSON.stringify(bodyData);
            console.log("Body después de stringify:", bodyString);
            console.log("Length del string:", bodyString.length);

            // Crear el pedido en el backend usando el carrito actual
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/pagos/crear-pedido`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: bodyString,
                }
            );

            const data = await response.json();

            if (data.success && data.data && data.data.pedido) {
                // Limpiar localStorage
                localStorage.removeItem("datosEnvio");
                localStorage.removeItem("metodoPago");
                localStorage.removeItem("datosTarjeta");
                localStorage.removeItem("carritoCheckout");

                // Redirigir a página de confirmación con el ID del pedido
                navigate(`/confirmacion?pedido=${data.data.pedido.id_pedido}`);
            } else {
                throw new Error(data.message || "Error al crear el pedido");
            }
        } catch (error) {
            console.error("Error al confirmar pedido:", error);
            alert(
                "Hubo un error al procesar tu pedido. Por favor, intenta de nuevo."
            );
        } finally {
            setProcesando(false);
        }
    };

    if (!datosEnvio || !metodoPago) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Título */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Revisar Pedido
                    </h1>
                </div>

                {/* Progreso del checkout */}
                <ProgresoCheckout pasoActual={3} />

                {/* Contenido principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Columna izquierda - Datos */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Datos de envío */}
                        <DatosEnvio
                            datosEnvio={datosEnvio}
                            onEditar={handleEditarEnvio}
                        />

                        {/* Datos de pago */}
                        <DatosPago
                            metodoPago={metodoPago}
                            datosTarjeta={datosTarjeta}
                            onEditar={handleEditarPago}
                        />
                    </div>

                    {/* Columna derecha - Resumen */}
                    <div className="lg:col-span-1">
                        <ResumenFinal carrito={carrito} totales={totales} />
                    </div>
                </div>

                {/* Botones de navegación */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <button
                        onClick={handleVolver}
                        disabled={procesando}
                        className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Volver
                    </button>

                    <button
                        onClick={handleConfirmarPedido}
                        disabled={procesando}
                        className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-colors ${
                            procesando
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                    >
                        {procesando ? "Procesando..." : "Confirmar Pedido"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Revision;
