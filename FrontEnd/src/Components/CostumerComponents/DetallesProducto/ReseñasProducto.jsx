import React, { useState, useEffect } from "react";
import { FiStar, FiUser, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { useAuth } from "../../../Context/LogInContext";

function ReseñasProducto({ idProducto }) {
    const { usuario, isAuthenticated } = useAuth();
    const [reseñas, setReseñas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [promedioCalificacion, setPromedioCalificacion] = useState(0);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editando, setEditando] = useState(null);

    // Estados del formulario
    const [calificacion, setCalificacion] = useState(5);
    const [comentario, setComentario] = useState("");
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (!idProducto) return;
        cargarReseñas();
    }, [idProducto]);

    const cargarReseñas = async () => {
        try {
            setLoading(true);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            alert("Debes iniciar sesión para dejar una reseña");
            return;
        }

        try {
            setEnviando(true);

            if (editando) {
                // Actualizar reseña existente
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/resenas/actualizarresena/${editando.id_resena}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            calificacion,
                            comentario
                        })
                    }
                );

                const data = await response.json();

                if (data.success) {
                    alert("Reseña actualizada correctamente");
                    setEditando(null);
                    setMostrarFormulario(false);
                    resetFormulario();
                    cargarReseñas();
                } else {
                    alert(data.message || "Error al actualizar la reseña");
                }
            } else {
                // Crear nueva reseña
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/resenas/crearresena`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id_usuario: usuario.id_usuario,
                            id_producto: idProducto,
                            calificacion,
                            comentario
                        })
                    }
                );

                const data = await response.json();

                if (data.success) {
                    alert("Reseña creada correctamente");
                    setMostrarFormulario(false);
                    resetFormulario();
                    cargarReseñas();
                } else {
                    alert(data.message || "Error al crear la reseña");
                }
            }
        } catch (error) {
            console.error("Error al guardar reseña:", error);
            alert("Error al guardar la reseña");
        } finally {
            setEnviando(false);
        }
    };

    const handleEliminar = async (idResena) => {
        if (!window.confirm("¿Estás seguro de eliminar esta reseña?")) {
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/resenas/eliminarresena/${idResena}`,
                { method: 'DELETE' }
            );

            const data = await response.json();

            if (data.success) {
                alert("Reseña eliminada correctamente");
                cargarReseñas();
            } else {
                alert(data.message || "Error al eliminar la reseña");
            }
        } catch (error) {
            console.error("Error al eliminar reseña:", error);
            alert("Error al eliminar la reseña");
        }
    };

    const handleEditar = (resena) => {
        setEditando(resena);
        setCalificacion(resena.calificacion);
        setComentario(resena.comentario || "");
        setMostrarFormulario(true);
    };

    const resetFormulario = () => {
        setCalificacion(5);
        setComentario("");
        setEditando(null);
    };

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

    const renderEstrellasInteractivas = () => {
        return (
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((estrella) => (
                    <button
                        key={estrella}
                        type="button"
                        onClick={() => setCalificacion(estrella)}
                        className="focus:outline-none transition-transform hover:scale-110"
                    >
                        <FiStar
                            className={`w-6 h-6 ${
                                estrella <= calificacion
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 hover:text-yellow-300"
                            }`}
                        />
                    </button>
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

    const usuarioYaReseño = () => {
        if (!isAuthenticated || !usuario) return false;
        return reseñas.some(r => r.id_usuario === usuario.id_usuario);
    };

    const puedeAgregarReseña = () => {
        return isAuthenticated && !usuarioYaReseño() && !mostrarFormulario;
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

    return (
        <div className="py-6">
            {/* Resumen de calificaciones */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">
                                {reseñas.length > 0 ? promedioCalificacion : "0"}
                            </div>
                            <div className="flex justify-center mt-1">
                                {renderEstrellas(Math.round(parseFloat(promedioCalificacion)))}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                {reseñas.length} {reseñas.length === 1 ? 'reseña' : 'reseñas'}
                            </div>
                        </div>
                    </div>

                    {/* Botón para agregar reseña */}
                    {puedeAgregarReseña() && (
                        <button
                            onClick={() => setMostrarFormulario(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Escribir una reseña
                        </button>
                    )}
                </div>
            </div>

            {/* Formulario de reseña */}
            {mostrarFormulario && (
                <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {editando ? "Editar reseña" : "Escribe tu reseña"}
                        </h3>
                        <button
                            onClick={() => {
                                setMostrarFormulario(false);
                                resetFormulario();
                            }}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Calificación
                            </label>
                            {renderEstrellasInteractivas()}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comentario
                            </label>
                            <textarea
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Comparte tu experiencia con este producto..."
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={enviando}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                            >
                                {enviando ? "Guardando..." : editando ? "Actualizar" : "Publicar"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setMostrarFormulario(false);
                                    resetFormulario();
                                }}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de reseñas */}
            {reseñas.length === 0 ? (
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
            ) : (
                <div className="space-y-6">
                    {reseñas.map((reseña) => {
                        const esDelUsuarioActual = isAuthenticated && usuario && reseña.id_usuario === usuario.id_usuario;
                        const nombreCompleto = reseña.usuarios
                            ? `${reseña.usuarios.nombre} ${reseña.usuarios.apellido}`
                            : 'Usuario anónimo';

                        return (
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
                                                    {nombreCompleto}
                                                    {esDelUsuarioActual && (
                                                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                            Tú
                                                        </span>
                                                    )}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {renderEstrellas(reseña.calificacion)}
                                                    <span className="text-xs text-gray-500">
                                                        {formatearFecha(reseña.fecha_resena)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Botones de editar/eliminar */}
                                            {esDelUsuarioActual && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditar(reseña)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Editar"
                                                    >
                                                        <FiEdit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEliminar(reseña.id_resena)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
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
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ReseñasProducto;