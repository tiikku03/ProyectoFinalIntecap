import React, { useState, useEffect } from "react";
import { FiClock, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/LogInContext";
import ListaPedidos from "../../Components/CostumerComponents/HistorialPedidos/ListaPedidos";
import FiltrosPedidos from "../../Components/CostumerComponents/HistorialPedidos/FiltrosPedidos";

function HistorialPedidos() {
    const { usuario, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState("todos");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Verificar autenticación
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Cargar pedidos del usuario
    const cargarPedidos = async () => {
        try {
            setCargando(true);
            setError(null);

            if (!usuario || !usuario.id_usuario) {
                setError("No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.");
                setCargando(false);
                return;
            }

            console.log("Cargando pedidos para usuario ID:", usuario.id_usuario);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/pedidos/usuario/${usuario.id_usuario}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al obtener los pedidos");
            }

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (data.success) {
                setPedidos(data.data.pedidos);
                setPedidosFiltrados(data.data.pedidos);
            } else {
                setError(data.message || "Error al cargar los pedidos");
            }
        } catch (err) {
            console.error("Error al cargar pedidos:", err);
            setError(`No se pudieron cargar los pedidos: ${err.message}`);
        } finally {
            setCargando(false);
        }
    };

    // Filtrar pedidos por estado
    const filtrarPedidos = (estado) => {
        setEstadoSeleccionado(estado);

        if (estado === "todos") {
            setPedidosFiltrados(pedidos);
        } else {
            const filtrados = pedidos.filter((pedido) => pedido.estado === estado);
            setPedidosFiltrados(filtrados);
        }
    };

    // Cargar pedidos al montar el componente o cuando cambie el usuario
    useEffect(() => {
        if (usuario && usuario.id_usuario) {
            cargarPedidos();
        }
    }, [usuario]);

    // Obtener estadísticas rápidas
    const obtenerEstadisticas = () => {
        const total = pedidos.length;
        const pendientes = pedidos.filter((p) => p.estado === "Pendiente").length;
        const entregados = pedidos.filter((p) => p.estado === "Entregado").length;

        return { total, pendientes, entregados };
    };

    const estadisticas = obtenerEstadisticas();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Encabezado */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Mi Historial de Pedidos
                    </h1>
                    <p className="text-gray-600">
                        Aquí puedes ver el estado y detalles de todos tus pedidos
                    </p>
                </div>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiClock className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total de Pedidos</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {estadisticas.total}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <FiClock className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pedidos Pendientes</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {estadisticas.pendientes}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <FiUser className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pedidos Recibidos</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {estadisticas.entregados}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtros */}
                <FiltrosPedidos
                    estadoSeleccionado={estadoSeleccionado}
                    onCambiarEstado={filtrarPedidos}
                />

                {/* Lista de pedidos */}
                <ListaPedidos
                    pedidos={pedidosFiltrados}
                    cargando={cargando}
                    error={error}
                />
            </div>
        </div>
    );
}

export default HistorialPedidos;
