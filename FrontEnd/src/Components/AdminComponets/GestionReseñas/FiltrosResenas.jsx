import React from 'react';


const FiltrosResenas = ({
  busqueda,
  setBusqueda,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  categorias,
  calificacionSeleccionada,
  setCalificacionSeleccionada
}) => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row gap-2 items-center">
      {/* Búsqueda por texto, email o nombre */}
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Buscar por texto, producto, email o autor..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />
      {/* Filtro por categoría de producto */}
      <select
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={categoriaSeleccionada}
        onChange={e => setCategoriaSeleccionada(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categorias && categorias.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {/* Filtro por calificación */}
      <select
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={calificacionSeleccionada}
        onChange={e => setCalificacionSeleccionada(e.target.value)}
      >
        <option value="">Todas las calificaciones</option>
        {[5,4,3,2,1].map(num => (
          <option key={num} value={num}>{num} estrellas</option>
        ))}
      </select>
    </div>
  );
};

export default FiltrosResenas;
