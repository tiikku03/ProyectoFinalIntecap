import { useEffect, useState } from "react";
import { FiEye, FiUserX } from "react-icons/fi";

function TablaUsuarios({ busqueda, rolFiltro }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsuarios();
    // eslint-disable-next-line
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/usuarios`);
      const data = await res.json();
      if (data.success) {
        setUsuarios(data.data);
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrado por búsqueda y rol
  const usuariosFiltrados = usuarios.filter(u => {
    const texto = `${u.nombre} ${u.apellido} ${u.email} ${u.id_usuario}`.toLowerCase();
    const matchBusqueda = busqueda === '' || texto.includes(busqueda.toLowerCase());
    const matchRol = rolFiltro === '' || u.rol === rolFiltro;
    return matchBusqueda && matchRol;
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {loading ? (
        <div className="px-6 py-12 text-center text-gray-400">Cargando usuarios...</div>
      ) : usuariosFiltrados.length === 0 ? (
        <div className="px-6 py-12 text-center text-gray-400">No se encontraron usuarios</div>
      ) : (
        <>
          {/* Vista móvil - Tarjetas */}
          <div className="block lg:hidden">
            <div className="divide-y divide-gray-200">
              {usuariosFiltrados.map(usuario => (
                <div key={usuario.id_usuario} className="p-4 hover:bg-gray-50 transition-colors">
                  {/* Nombre y acciones */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{usuario.nombre} {usuario.apellido}</div>
                      <div className="text-xs text-gray-500">USR-{usuario.id_usuario.toString().padStart(3, '0')}</div>
                    </div>
                    <span className={`ml-2 inline-block px-2 py-1 text-xs rounded font-semibold ${usuario.rol === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {usuario.rol === 'admin' ? 'Admin' : 'Usuario'}
                    </span>
                  </div>

                  {/* Contacto */}
                  <div className="mb-2">
                    <div className="text-sm text-gray-800">{usuario.email}</div>
                    <div className="text-xs text-gray-500">{usuario.telefono || 'Sin teléfono'}</div>
                  </div>

                  {/* Fecha de registro */}
                  <div className="text-xs text-gray-500 mb-3">
                    Registrado: {usuario.fecha_registro ? usuario.fecha_registro.split('T')[0] : '--'}
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <button title="Ver detalles" className="flex-1 py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center gap-1">
                      <FiEye className="w-4 h-4" />
                      <span className="text-sm">Ver</span>
                    </button>
                    <button title="Eliminar usuario" className="flex-1 py-2 rounded bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center gap-1">
                      <FiUserX className="w-4 h-4" />
                      <span className="text-sm">Eliminar</span>
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registro</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {usuariosFiltrados.map(usuario => (
                  <tr key={usuario.id_usuario} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{usuario.nombre} {usuario.apellido}</div>
                      <div className="text-xs text-gray-500">USR-{usuario.id_usuario.toString().padStart(3, '0')}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-gray-800">{usuario.email}</div>
                      <div className="text-xs text-gray-500">{usuario.telefono || '--'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div>{usuario.fecha_registro ? usuario.fecha_registro.split('T')[0] : '--'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-block px-2 py-1 text-xs rounded font-semibold ${usuario.rol === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {usuario.rol === 'admin' ? 'Admin' : 'Usuario'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap flex gap-2 items-center">
                      <button title="Ver detalles" className="p-2 rounded hover:bg-gray-100 text-blue-600">
                        <FiEye className="w-5 h-5" />
                      </button>
                      <button title="Eliminar usuario" className="p-2 rounded hover:bg-red-50 text-red-600">
                        <FiUserX className="w-5 h-5" />
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
}

export default TablaUsuarios;
