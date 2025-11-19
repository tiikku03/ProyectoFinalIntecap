import React from 'react';

const EstadisticasUsuarios = ({ estadisticas, loading }) => {
  const tarjetas = [
    {
      titulo: 'Admins',
      valor: estadisticas.admins || 0,
      color: 'text-purple-600'
    },
    {
      titulo: 'Usuarios',
      valor: estadisticas.usuarios || 0,
      color: 'text-blue-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white px-4 py-3 rounded-lg shadow-sm animate-pulse min-w-[120px]">
            <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-8"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tarjetas.map((tarjeta, index) => (
        <div key={index} className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow min-w-[120px]">
          <h3 className="text-xs font-medium text-gray-600 mb-1">{tarjeta.titulo}</h3>
          <p className={`text-2xl font-bold ${tarjeta.color}`}>{tarjeta.valor}</p>
        </div>
      ))}
    </div>
  );
};

export default EstadisticasUsuarios;
