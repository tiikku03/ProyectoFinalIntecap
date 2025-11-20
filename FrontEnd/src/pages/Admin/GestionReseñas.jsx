
import React, { useState } from 'react';
import TotalResenas from '../../Components/AdminComponets/GestionReseñas/TotalResenas';
import FiltrosResenas from '../../Components/AdminComponets/GestionReseñas/FiltrosResenas';

function GestionResenas() {
    // Estados para filtros
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState("");
    // Puedes obtener las categorías de la API o definirlas estáticas por ahora
    const categorias = [];

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
        </div>
    );
}
export default GestionResenas;