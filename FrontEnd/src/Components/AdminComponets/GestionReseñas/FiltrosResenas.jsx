import { FiSearch } from "react-icons/fi";

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
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Filtros
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Búsqueda por texto, email o nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Texto, producto, email o autor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Filtro por categoría de producto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base bg-white"
          >
            <option value="">Todas las categorías</option>
            {categorias && categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Filtro por calificación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calificación
          </label>
          <select
            value={calificacionSeleccionada}
            onChange={(e) => setCalificacionSeleccionada(e.target.value)}
            className="w-full px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base bg-white"
          >
            <option value="">Todas las calificaciones</option>
            {[5,4,3,2,1].map(num => (
              <option key={num} value={num}>{num} estrellas</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltrosResenas;
