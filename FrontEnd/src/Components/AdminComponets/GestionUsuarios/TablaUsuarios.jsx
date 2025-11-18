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
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-4">
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
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">Cargando usuarios...</td>
            </tr>
          ) : usuariosFiltrados.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">No se encontraron usuarios</td>
            </tr>
          ) : (
            usuariosFiltrados.map(usuario => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaUsuarios;
