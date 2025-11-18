import { FiSearch } from "react-icons/fi";

function FiltrosUsuarios({ busqueda, setBusqueda, rolFiltro, setRolFiltro }) {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Filtros
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Búsqueda por nombre, email o ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buscar
                    </label>
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Nombre, email o ID..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
                        />
                    </div>
                </div>

                {/* Filtro por rol */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rol
                    </label>
                    <select
                        value={rolFiltro}
                        onChange={(e) => setRolFiltro(e.target.value)}
                        className="w-full px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base bg-white"
                    >
                        <option value="">Todos los roles</option>
                        <option value="admin">Administrador</option>
                        <option value="usuario">Usuario</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default FiltrosUsuarios;
