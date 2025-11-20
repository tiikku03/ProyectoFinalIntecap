import { useEffect, useState } from 'react';
import { FiX, FiPackage, FiUser, FiCreditCard, FiMapPin, FiCalendar } from 'react-icons/fi';

const ModalDetallePedido = ({ isOpen, onClose, pedidoId }) => {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && pedidoId) {
      fetchDetallePedido();
    }
  }, [isOpen, pedidoId]);

  const fetchDetallePedido = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/pedidos/${pedidoId}`);
      const data = await response.json();

      if (data.success) {
        setPedido(data.data);
      }
    } catch (error) {
      console.error('Error al obtener detalle del pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '--';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoColor = (estado) => {
    const colores = {
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Procesando': 'bg-blue-100 text-blue-800',
      'Enviado': 'bg-purple-100 text-purple-800',
      'Entregado': 'bg-green-100 text-green-800',
      'Cancelado': 'bg-red-100 text-red-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Pedido ORD-{pedidoId?.toString().padStart(4, '0')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">
            Cargando detalles del pedido...
          </div>
        ) : pedido ? (
          <div className="p-6">
            {/* Grid de 2 columnas en desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna principal - Productos */}
              <div className="lg:col-span-2 space-y-6">
                {/* Productos */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FiPackage className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">
                      Productos ({pedido.detalle_pedido?.length || 0})
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {pedido.detalle_pedido?.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={item.productos?.url_imagen || '/placeholder-product.png'}
                          alt={item.productos?.nombre}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.productos?.nombre}</div>
                          <div className="text-sm text-gray-500">
                            Cantidad: {item.cantidad}
                          </div>
                          <div className="text-sm text-gray-600">
                            GTQ {parseFloat(item.productos?.precio || 0).toFixed(2)} c/u
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            GTQ {(parseFloat(item.productos?.precio || 0) * item.cantidad).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resumen de totales */}
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        GTQ {(parseFloat(pedido.total || 0) * 0.84).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Envío</span>
                      <span className="text-green-600">Gratis</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IVA (16%)</span>
                      <span className="text-gray-900">
                        GTQ {(parseFloat(pedido.total || 0) * 0.16).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">
                        GTQ {parseFloat(pedido.total || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dirección de Envío */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FiMapPin className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Dirección de Envío</h3>
                  </div>
                  <p className="text-gray-700">{pedido.direccion_envio || 'No especificada'}</p>
                </div>

                {/* Método de Pago */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FiCreditCard className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Método de Pago</h3>
                  </div>
                  <p className="text-gray-700 capitalize">{pedido.metodo_pago || 'No especificado'}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Pago confirmado el {formatearFecha(pedido.fecha_pedido)}
                  </p>
                </div>
              </div>

              {/* Columna lateral - Cliente e Info */}
              <div className="space-y-6">
                {/* Cliente */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FiUser className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Cliente</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-gray-900">
                        {pedido.usuarios ? `${pedido.usuarios.nombre} ${pedido.usuarios.apellido}` : 'Usuario no disponible'}
                      </p>
                      <p className="text-sm text-gray-500">Usuario #{pedido.id_usuario}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600">{pedido.usuarios?.email || '--'}</p>
                    </div>
                  </div>
                </div>

                {/* Estado del Pedido */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Estado del Pedido</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Estado Actual</label>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(pedido.estado)}`}>
                        {pedido.estado}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Historial */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FiCalendar className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Historial</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pedido Creado</p>
                        <p className="text-xs text-gray-500">{formatearFecha(pedido.fecha_pedido)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de Guardar Cambios */}
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            No se encontraron detalles del pedido
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalDetallePedido;
