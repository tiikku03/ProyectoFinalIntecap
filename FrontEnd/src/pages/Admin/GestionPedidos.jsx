import React, { useState, useEffect } from "react";
import TablasPedidos from '../../Components/AdminComponets/GestionPedidos/TablasPedidos';
import FiltrosPedidos from '../../Components/AdminComponets/GestionPedidos/FiltrosPedidos';
import EstadisticasEstadoPedidos from '../../Components/AdminComponets/GestionPedidos/EstadisticasEstadoPedidos';

function GestionPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    // Estados para filtros
    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("Todos");

    // Estados para modal
    const [modalDetalle, setModalDetalle] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    // Cargar pedidos desde la API
    const fetchPedidos = async () => {
        if (page === 1) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos/leerpedidos?page=${page}`);
            const data = await response.json();
            
            if (data.success) {
                setPedidos(prev => page === 1 ? data.data.pedidos : [...prev, ...data.data.pedidos]);
                setHasMore(data.data.hasNextPage);
            }
        } catch (error) {
            console.error("Error al cargar pedidos:", error);
            alert("Error al cargar los pedidos");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchPedidos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    // Aplicar filtros
    useEffect(() => {
        let resultados = [...pedidos];

        // Filtrar por búsqueda de ID de usuario o ID de pedido
        if (busqueda.trim()) {
            resultados = resultados.filter(pedido =>
                pedido.id_pedido.toString().includes(busqueda) ||
                pedido.id_usuario.toString().includes(busqueda)
            );
        }

        // Filtrar por estado
        if (estadoFiltro !== "Todos") {
            resultados = resultados.filter(pedido => pedido.estado === estadoFiltro);
        }

        setPedidosFiltrados(resultados);
    }, [pedidos, busqueda, estadoFiltro]);

    // Handlers
    const handleVerDetalle = (pedido) => {
        setPedidoSeleccionado(pedido);
        setModalDetalle(true);
    };

    const cargarMasPedidos = () => {
        if (hasMore && !loadingMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    Administra y supervisa todos los pedidos
                </p>
            </div>

            {/* Estadísticas por Estado */}
            <EstadisticasEstadoPedidos />

            {/* Filtros */}
            <FiltrosPedidos 
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                estadoFiltro={estadoFiltro}
                setEstadoFiltro={setEstadoFiltro}
            />

            {/* Tabla de pedidos */}
            <TablasPedidos 
                pedidos={pedidosFiltrados}
                loading={loading}
                loadingMore={loadingMore}
                onLoadMore={cargarMasPedidos}
                onVerDetalle={handleVerDetalle}
            />

            {/* Contador de resultados */}
            {!loading && (
                <div className="text-xs sm:text-sm text-gray-600 text-center py-2">
                    Mostrando {pedidosFiltrados.length} pedidos {!hasMore && '(todos cargados)'}
                </div>
            )}

            {/* Modal Detalle (Placeholder) */}
            {modalDetalle && pedidoSeleccionado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg sm:text-xl font-bold">Detalle del Pedido #{pedidoSeleccionado.id_pedido}</h2>
                            <button
                                onClick={() => setModalDetalle(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                            <p><strong>Usuario:</strong> #{pedidoSeleccionado.id_usuario}</p>
                            <p><strong>Total:</strong> ${parseFloat(pedidoSeleccionado.total).toFixed(2)}</p>
                            <p><strong>Estado:</strong> {pedidoSeleccionado.estado}</p>
                            <p><strong>Método de Pago:</strong> {pedidoSeleccionado.metodo_pago}</p>
                            <p className="wrap-break-word"><strong>Dirección:</strong> {pedidoSeleccionado.direccion_envio}</p>
                            {/* TODO: Agregar detalles de productos del pedido */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GestionPedidos;
