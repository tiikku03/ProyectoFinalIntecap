import React, { useState, useEffect } from 'react';
import EstadisticasUsuarios from '../../Components/AdminComponets/GestionUsuarios/EstadisticasUsuarios';
import FiltrosUsuarios from '../../Components/AdminComponets/GestionUsuarios/FiltrosUsuarios';
import TablaUsuarios from '../../Components/AdminComponets/GestionUsuarios/TablaUsuarios';

function GestionUsuarios() {
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    clientes: 0,
    admins: 0
  });
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');

  useEffect(() => {
    fetchEstadisticas();
  }, []);

  
  const fetchEstadisticas = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      
      const response = await fetch(`${apiUrl}/usuarios/estadisticas`);
      const data = await response.json();
      
      if (data.success) {
        setEstadisticas(data.data);
      }
    } catch (error) {
      console.error('Error al obtener estadísticas de usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Administra las cuentas de usuarios del sistema
        </p>
      </div>

      {/* Estadísticas de Usuarios */}
      <EstadisticasUsuarios estadisticas={estadisticas} loading={loading} />

      {/* Filtros de Usuarios */}
      <FiltrosUsuarios 
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        rolFiltro={rolFiltro}
        setRolFiltro={setRolFiltro}
      />

      {/* Tabla de Usuarios */}
      <TablaUsuarios busqueda={busqueda} rolFiltro={rolFiltro} />

      {/* Aquí irá la tabla de usuarios */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-500 text-center py-8">
          Tabla de usuarios en desarrollo...
        </p>
      </div>
    </div>
  );
}

export default GestionUsuarios;
