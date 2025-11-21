
import React, { useState, useEffect } from 'react';
import TotalResenas from '../../Components/AdminComponets/GestionReseñas/TotalResenas';
import FiltrosResenas from '../../Components/AdminComponets/GestionReseñas/FiltrosResenas';
import TablaResenas from '../../Components/AdminComponets/GestionReseñas/TablaResenas';

function GestionResenas() {
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState("");
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            let todasLasCategorias = [];
            let page = 1;
            let hasNextPage = true;

            while (hasNextPage) {
                const response = await fetch(`${apiUrl}/productos/leerproductos?page=${page}`);
                const data = await response.json();

                if (data.success && data.data && Array.isArray(data.data.productos)) {
                    // Extraer categorías de esta página
                    const categoriasEnPagina = data.data.productos.map(producto => producto.categoria);
                    todasLasCategorias = [...todasLasCategorias, ...categoriasEnPagina];

                    // Verificar si hay más páginas
                    hasNextPage = data.data.hasNextPage;
                    page++;
                } else {
                    hasNextPage = false;
                }
            }

            // Obtener categorías únicas y filtrar valores vacíos
            const categoriasUnicas = [...new Set(todasLasCategorias)];
            setCategorias(categoriasUnicas.filter(cat => cat).sort());
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Reseñas</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    Administra las reseñas de productos realizadas por los usuarios
                </p>
            </div>  
            {/* Tarjeta de total de reseñas */}
            <TotalResenas />
            {/* Filtros de reseñas */}
            <FiltrosResenas
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                categoriaSeleccionada={categoriaSeleccionada}
                setCategoriaSeleccionada={setCategoriaSeleccionada}
                categorias={categorias}
                calificacionSeleccionada={calificacionSeleccionada}
                setCalificacionSeleccionada={setCalificacionSeleccionada}
            />

            {/* Tabla de reseñas */}
            <TablaResenas />
        </div>
    );
}
export default GestionResenas;