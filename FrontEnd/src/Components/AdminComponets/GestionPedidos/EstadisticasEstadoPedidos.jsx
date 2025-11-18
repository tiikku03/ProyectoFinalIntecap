import React, { useState, useEffect } from 'react';

const EstadisticasEstadoPedidos = () => {
  const [estadisticas, setEstadisticas] = useState({
    pendiente: 0,
    procesando: 0,
    enviado: 0,
    entregado: 0,
    cancelado: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEstadisticas();
  }, []);

  const fetchEstadisticas = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      
      // Obtener todos los pedidos para contar por estado
      let allPedidos = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await fetch(`${apiUrl}/pedidos/leerpedidos?page=${page}`);
        const data = await response.json();
        
        if (data.success && data.data.pedidos && data.data.pedidos.length > 0) {
          allPedidos = [...allPedidos, ...data.data.pedidos];
          hasMore = data.data.hasNextPage;
          page++;
        } else {
          hasMore = false;
        }
      }

      // Contar pedidos por estado
      const stats = {
        pendiente: allPedidos.filter(p => p.estado === 'Pendiente').length,
        procesando: allPedidos.filter(p => p.estado === 'Procesando').length,
        enviado: allPedidos.filter(p => p.estado === 'Enviado').length,
        entregado: allPedidos.filter(p => p.estado === 'Entregado').length,
        cancelado: allPedidos.filter(p => p.estado === 'Cancelado').length,
        total: allPedidos.length
      };

      setEstadisticas(stats);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const tarjetas = [
    {
      titulo: 'Pendientes',
      valor: estadisticas.pendiente,
      color: 'bg-yellow-500',
      icono: '⏳'
    },
    {
      titulo: 'Procesando',
      valor: estadisticas.procesando,
      color: 'bg-blue-500',
      icono: '🔄'
    },
    {
      titulo: 'Enviados',
      valor: estadisticas.enviado,
      color: 'bg-purple-500',
      icono: '📦'
    },
    {
      titulo: 'Entregados',
      valor: estadisticas.entregado,
      color: 'bg-green-500',
      icono: '✅'
    },
    {
      titulo: 'Cancelados',
      valor: estadisticas.cancelado,
      color: 'bg-red-500',
      icono: '❌'
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white px-3 py-2 rounded-md shadow-sm animate-pulse min-w-[120px]">
            <div className="h-2 bg-gray-200 rounded w-16 mb-1.5"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tarjetas.map((tarjeta, index) => (
        <div key={index} className="bg-white px-3 py-2 rounded-md shadow-sm hover:shadow-md transition-shadow min-w-[120px]">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-sm">{tarjeta.icono}</span>
            <h3 className="text-xs font-medium text-gray-600">{tarjeta.titulo}</h3>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-gray-800">{tarjeta.valor}</p>
            <div className={`w-1.5 h-1.5 rounded-full ${tarjeta.color}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EstadisticasEstadoPedidos;
