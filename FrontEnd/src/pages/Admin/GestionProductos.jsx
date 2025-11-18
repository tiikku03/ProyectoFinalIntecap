import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiPlus } from "react-icons/fi";
import FiltrosProductos from "../../Components/AdminComponets/GestionProductos/FiltrosProductos";
import ListaProductosAdmin from "../../Components/AdminComponets/GestionProductos/ListaProductosAdmin";
import FormularioProducto from "../../Components/AdminComponets/GestionProductos/FormularioProducto";
import FormularioEditarProducto from "../../Components/AdminComponets/GestionProductos/FormularioEditarProducto";

function GestionProductos() {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    // Estados para filtros
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
    const [idBusqueda, setIdBusqueda] = useState("");

    // Ref para el observer
    const observer = useRef();
    const lastProductRef = useCallback(node => {
        if (loadingMore) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        
        if (node) observer.current.observe(node);
    }, [loadingMore, hasMore]);

    // Cargar productos desde la API
    const fetchProductos = useCallback(async () => {
        if (page === 1) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/leerproductos?page=${page}`);
            const data = await response.json();
            
            if (data.success) {
                setProductos(prev => page === 1 ? data.data.productos : [...prev, ...data.data.productos]);
                setHasMore(data.data.hasNextPage);
            }
        } catch (error) {
            console.error("Error al cargar productos:", error);
            alert("Error al cargar los productos");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [page]);

    useEffect(() => {
        fetchProductos();
    }, [fetchProductos]);

    // Aplicar filtros cuando cambian los estados
    useEffect(() => {
        let resultados = [...productos];

        // Filtrar por búsqueda de nombre
        if (busqueda.trim()) {
            resultados = resultados.filter(producto =>
                producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        

        // Filtrar por categoría
        if (categoriaSeleccionada !== "Todos") {
            resultados = resultados.filter(producto =>
                producto.categoria === categoriaSeleccionada
            );
        }

        // Filtrar por ID
        if (idBusqueda.trim()) {
            resultados = resultados.filter(producto =>
                producto.id_producto.toString() === idBusqueda
            );
        }

        setProductosFiltrados(resultados);
    }, [busqueda, categoriaSeleccionada, idBusqueda, productos]);

    // Función para editar producto
    const handleEditar = (producto) => {
        setProductoAEditar(producto);
        setModalEditarAbierto(true);
    };

    // Función para eliminar producto
    const handleEliminar = async (producto) => {
        const confirmacion = window.confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`);
        
        if (!confirmacion) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/productos/eliminarProducto/${producto.id_producto}`,
                { method: 'DELETE' }
            );
            const data = await response.json();

            if (data.success) {
                alert('Producto eliminado correctamente');
                // Recargar desde la primera página
                setPage(1);
                setProductos([]);
                fetchProductos();
            } else {
                alert(data.message || 'Error al eliminar el producto');
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert('Error al eliminar el producto');
        }
    };

    // Función para crear nuevo producto
    const handleNuevoProducto = () => {
        setModalAbierto(true);
    };

    const handleProductoCreado = () => {
        setPage(1);
        setProductos([]);
        fetchProductos(); // Recargar productos después de crear uno nuevo
    };

    const handleProductoActualizado = () => {
        setPage(1);
        setProductos([]);
        fetchProductos(); // Recargar productos después de actualizar
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
                    <p className="text-gray-600 mt-1">
                        Administra tu catálogo de productos
                    </p>
                </div>
                <button
                    onClick={handleNuevoProducto}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    <FiPlus className="w-5 h-5" />
                    Nuevo Producto
                </button>
            </div>

            {/* Filtros */}
            <FiltrosProductos
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                categoriaSeleccionada={categoriaSeleccionada}
                setCategoriaSeleccionada={setCategoriaSeleccionada}
                idBusqueda={idBusqueda}
                setIdBusqueda={setIdBusqueda}
                productos={productos}
            />

            {/* Lista de productos */}
            <ListaProductosAdmin
                productos={productosFiltrados}
                loading={loading}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
                lastProductRef={lastProductRef}
            />

            {/* Loading más productos */}
            {loadingMore && (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}

            {/* Contador de resultados */}
            {!loading && (
                <div className="text-sm text-gray-600 text-center">
                    Mostrando {productosFiltrados.length} productos {!hasMore && '(todos cargados)'}
                </div>
            )}

            {/* Modal de Formulario */}
            <FormularioProducto
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onProductoCreado={handleProductoCreado}
            />

            {/* Modal de Edición */}
            <FormularioEditarProducto
                isOpen={modalEditarAbierto}
                onClose={() => {
                    setModalEditarAbierto(false);
                    setProductoAEditar(null);
                }}
                onProductoActualizado={handleProductoActualizado}
                producto={productoAEditar}
            />
        </div>
    );
}

export default GestionProductos;
