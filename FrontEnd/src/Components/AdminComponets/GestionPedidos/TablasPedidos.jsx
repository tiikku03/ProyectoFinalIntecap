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
      {pedidos.length === 0 ? (
        <div className="px-6 py-12 text-center text-gray-500">
          No se encontraron pedidos
        </div>
      ) : (
        <>
          {/* Vista móvil - Tarjetas */}
          <div className="block lg:hidden">
            <div className="divide-y divide-gray-200">
              {pedidos.map((pedido) => (
                <div key={pedido.id_pedido} className="p-4 hover:bg-gray-50 transition-colors">
                  {/* ID y Estado */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        ORD-{String(pedido.id_pedido).padStart(4, '0')}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatearFecha(pedido.fecha_pedido)}
                      </div>
                    </div>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(pedido.estado)}`}>
                      <span className="mr-1">{getEstadoEmoji(pedido.estado)}</span>
                      {pedido.estado}
                    </span>
                  </div>

                  {/* Cliente */}
                  <div className="mb-2">
                    <div className="text-sm text-gray-800 font-medium">
                      {pedido.usuario?.nombre} {pedido.usuario?.apellido}
                    </div>
                    <div className="text-xs text-gray-500">
                      {pedido.usuario?.email}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Total</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {formatearPrecio(pedido.total)}
                    </div>
                  </div>

                  {/* Acción */}
                  <div>
                    <button
                      onClick={() => onVerDetalle(pedido)}
                      className="w-full py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center gap-2"
                    >
                      <FaEye className="w-4 h-4" />
                      <span className="text-sm">Ver Detalle</span>
                    </button>
                  </div>
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
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pedidos.map((pedido) => (
                  <tr key={pedido.id_pedido} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ORD-{String(pedido.id_pedido).padStart(4, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {pedido.usuario?.nombre} {pedido.usuario?.apellido}
                      </div>
                      <div className="text-xs text-gray-500">
                        {pedido.usuario?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatearFecha(pedido.fecha_pedido)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatearPrecio(pedido.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(pedido.estado)}`}>
                        <span className="mr-1">{getEstadoEmoji(pedido.estado)}</span>
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => onVerDetalle(pedido)}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <FaEye className="mr-1" />
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

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
