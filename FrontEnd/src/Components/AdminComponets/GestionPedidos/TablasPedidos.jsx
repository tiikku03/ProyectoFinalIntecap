import React, { useEffect, useRef } from 'react';
import { FaEye } from 'react-icons/fa';

const TablasPedidos = ({ pedidos, loading, loadingMore, onLoadMore, onVerDetalle }) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && !loadingMore) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loading, loadingMore, onLoadMore]);

  const getEstadoEmoji = (estado) => {
    const emojis = {
      Pendiente: '⏳',
      Procesando: '🔄',
      Enviado: '📦',
      Entregado: '✅',
      Cancelado: '❌'
    };
    return emojis[estado] || '📋';
  };

  const getEstadoColor = (estado) => {
    const colores = {
      Pendiente: 'bg-yellow-100 text-yellow-800',
      Procesando: 'bg-blue-100 text-blue-800',
      Enviado: 'bg-purple-100 text-purple-800',
      Entregado: 'bg-green-100 text-green-800',
      Cancelado: 'bg-red-100 text-red-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    }).format(precio);
  };

  if (loading && pedidos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pedidos.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron pedidos
                </td>
              </tr>
            ) : (
              pedidos.map((pedido) => (
                <tr key={pedido.id_pedido} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                    <span className="hidden sm:inline">ORD-</span>{String(pedido.id_pedido).padStart(4, '0')}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                    <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
                      {pedido.usuario?.nombre} {pedido.usuario?.apellido}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none hidden sm:block">
                      {pedido.usuario?.email}
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatearFecha(pedido.fecha_pedido)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-gray-900">
                    {formatearPrecio(pedido.total)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(pedido.estado)}`}>
                      <span className="mr-0.5 sm:mr-1">{getEstadoEmoji(pedido.estado)}</span>
                      <span className="hidden sm:inline">{pedido.estado}</span>
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    <button
                      onClick={() => onVerDetalle(pedido)}
                      className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <FaEye className="sm:mr-1" />
                      <span className="hidden sm:inline ml-1">Ver Detalle</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Observer target for infinite scroll */}
      <div ref={observerTarget} className="h-4" />

      {loadingMore && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default TablasPedidos;
