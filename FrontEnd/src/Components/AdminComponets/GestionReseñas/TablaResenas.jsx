import { useState, useEffect } from 'react';

const TablaResenas = () => {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResenas();
  }, []);

  const fetchResenas = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/resenas/leerresena`);
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setResenas(data.data);
      }
    } catch (error) {
      console.error('Error al obtener reseñas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (idResena) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta reseña?');

    if (!confirmar) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/resenas/eliminarresena/${idResena}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        // Actualizar la lista de reseñas eliminando la reseña
        setResenas(resenas.filter(resena => resena.id_resena !== idResena));
        alert('Reseña eliminada correctamente');
      } else {
        alert('Error al eliminar la reseña: ' + data.message);
      }
    } catch (error) {
      console.error('Error al eliminar reseña:', error);
      alert('Error al eliminar la reseña');
    }
  };

  const renderEstrellas = (calificacion) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span key={i} className={i <= calificacion ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return estrellas;
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {resenas.length === 0 ? (
        <div className="px-6 py-12 text-center text-gray-500">
          No hay reseñas disponibles
        </div>
      ) : (
        <>
          {/* Vista móvil - Tarjetas */}
          <div className="block lg:hidden">
            <div className="divide-y divide-gray-200">
              {resenas.map((resena) => (
                <div key={resena.id_resena} className="p-4 hover:bg-gray-50 transition-colors">
                  {/* Producto y acciones */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center flex-1">
                      <img
                        className="h-12 w-12 rounded object-cover"
                        src={resena.productos?.url_imagen || '/placeholder-product.png'}
                        alt={resena.productos?.nombre}
                      />
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {resena.productos?.nombre || 'Producto no disponible'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEliminar(resena.id_resena)}
                      className="ml-2 text-red-600 hover:text-red-900 p-2"
                      title="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Autor */}
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      {resena.usuarios ? `${resena.usuarios.nombre} ${resena.usuarios.apellido}` : 'Usuario no disponible'}
                    </p>
                    <p className="text-xs text-gray-500">{resena.usuarios?.email}</p>
                  </div>

                  {/* Calificación */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-base">
                      {renderEstrellas(resena.calificacion)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({resena.calificacion})</span>
                  </div>

                  {/* Comentario */}
                  <div className="mb-2">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {resena.comentario || 'Sin comentario'}
                    </p>
                  </div>

                  {/* Fecha */}
                  <p className="text-xs text-gray-500">{formatearFecha(resena.fecha_resena)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vista desktop - Tabla */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Autor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calificación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reseña
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resenas.map((resena) => (
                  <tr key={resena.id_resena} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded object-cover"
                            src={resena.productos?.url_imagen || '/placeholder-product.png'}
                            alt={resena.productos?.nombre}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {resena.productos?.nombre || 'Producto no disponible'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {resena.usuarios ?
                          `${resena.usuarios.nombre} ${resena.usuarios.apellido}` :
                          'Usuario no disponible'
                        }
                      </div>
                      <div className="text-sm text-gray-500">
                        {resena.usuarios?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex text-lg">
                          {renderEstrellas(resena.calificacion)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          ({resena.calificacion})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        <p className="line-clamp-2" title={resena.comentario}>
                          {resena.comentario || 'Sin comentario'}
                        </p>
                        {resena.comentario && resena.comentario.length > 50 && (
                          <button className="text-indigo-600 hover:text-indigo-900 text-xs mt-1">
                            Leer más
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatearFecha(resena.fecha_resena)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEliminar(resena.id_resena)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TablaResenas;
