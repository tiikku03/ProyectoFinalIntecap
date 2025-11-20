import React, { useState, useEffect } from "react";
import TablasPedidos from '../../Components/AdminComponets/GestionPedidos/TablasPedidos';
import FiltrosPedidos from '../../Components/AdminComponets/GestionPedidos/FiltrosPedidos';
import EstadisticasEstadoPedidos from '../../Components/AdminComponets/GestionPedidos/EstadisticasEstadoPedidos';
import ModalDetallePedido from '../../Components/AdminComponets/GestionPedidos/ModalDetallePedido';

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

            {/* Modal Detalle del Pedido */}
            <ModalDetallePedido
                isOpen={modalDetalle}
                onClose={() => setModalDetalle(false)}
                pedidoId={pedidoSeleccionado?.id_pedido}
            />
        </div>
    );
}

export default GestionPedidos;
