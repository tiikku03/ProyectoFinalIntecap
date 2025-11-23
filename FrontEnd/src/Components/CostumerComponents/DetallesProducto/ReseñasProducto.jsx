import React, { useState, useEffect } from "react";
import { FiStar, FiUser } from "react-icons/fi";

function ReseñasProducto({ idProducto }) {
    const [reseñas, setReseñas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [promedioCalificacion, setPromedioCalificacion] = useState(0);

    useEffect(() => {
        if (!idProducto) return;

        const fetchReseñas = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/resenas/producto/${idProducto}`
                );
                const data = await response.json();

                if (data.success && data.data) {
                    setReseñas(data.data);

                    // Calcular promedio de calificación
                    if (data.data.length > 0) {
                        const suma = data.data.reduce((acc, r) => acc + r.calificacion, 0);
                        setPromedioCalificacion((suma / data.data.length).toFixed(1));
                    }
                }
            } catch (error) {
                console.error("Error al cargar reseñas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReseñas();
    }, [idProducto]);

    const renderEstrellas = (calificacion) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((estrella) => (
                    <FiStar
                        key={estrella}
                        className={`w-4 h-4 ${
                            estrella <= calificacion
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }`}
                    />
                ))}
            </div>
        );
    };

    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="py-8">
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-100 h-24 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (reseñas.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <FiStar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Sin reseñas
                </h3>
                <p className="text-gray-500">
                    Este producto aún no tiene reseñas. ¡Sé el primero en opinar!
                </p>
            </div>
        );
    }

    return (
        <div className="py-6">
            {/* Resumen de calificaciones */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900">
                            {promedioCalificacion}
                        </div>
                        <div className="flex justify-center mt-1">
                            {renderEstrellas(Math.round(parseFloat(promedioCalificacion)))}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            {reseñas.length} {reseñas.length === 1 ? 'reseña' : 'reseñas'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de reseñas */}
            <div className="space-y-6">
                {reseñas.map((reseña) => (
                    <div key={reseña.id_resena} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-start gap-3">
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FiUser className="w-5 h-5 text-blue-600" />
                            </div>

                            <div className="flex-1">
                                {/* Nombre y fecha */}
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            {reseña.nombre_usuario || 'Usuario anónimo'}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            {renderEstrellas(reseña.calificacion)}
                                            <span className="text-xs text-gray-500">
                                                {formatearFecha(reseña.fecha_resena)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Comentario */}
                                {reseña.comentario && (
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {reseña.comentario}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReseñasProducto;
