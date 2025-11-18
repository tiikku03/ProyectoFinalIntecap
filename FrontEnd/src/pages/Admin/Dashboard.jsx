import React, { useState, useEffect } from 'react';
import StatCard from '../../Components/AdminComponets/GestionDashboard/StatCard';
import AlertasStockBajo from '../../Components/AdminComponets/GestionDashboard/AlertasStockBajo';
import { FiPackage, FiClock, FiUsers } from 'react-icons/fi';

function Dashboard() {
  const [estadisticas, setEstadisticas] = useState({
    productosTotales: 0,
    totalPedidos: 0,
    totalUsuarios: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      
      // Obtener datos de las APIs
      const [responseProductos, responsePedidos, responseUsuarios] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/productos/leerproductos?page=1`),
        fetch(`${import.meta.env.VITE_API_URL}/pedidos/total`),
        fetch(`${import.meta.env.VITE_API_URL}/usuarios/total`)
      ]);
      
      const dataProductos = await responseProductos.json();
      const dataPedidos = await responsePedidos.json();
      const dataUsuarios = await responseUsuarios.json();
      
      setEstadisticas({
        productosTotales: dataProductos.success ? dataProductos.data.totalProductos : 0,
        totalPedidos: dataPedidos.success ? dataPedidos.data.total : 0,
        totalUsuarios: dataUsuarios.success ? dataUsuarios.data.total : 0
      });
      
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Encabezado */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
        <p className="text-gray-600">Resumen de métricas y estadísticas clave</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          titulo="Productos Totales"
          valor={loading ? "..." : estadisticas.productosTotales.toString()}
          icono={FiPackage}
          colorIcono="text-blue-600"
        />
        <StatCard
          titulo="Total de Pedidos"
          valor={loading ? "..." : estadisticas.totalPedidos.toString()}
          icono={FiClock}
          colorIcono="text-orange-600"
        />
        <StatCard
          titulo="Total de Usuarios"
          valor={loading ? "..." : estadisticas.totalUsuarios.toString()}
          icono={FiUsers}
          colorIcono="text-green-600"
        />
      </div>

      {/* Alertas de Stock Bajo */}
      <AlertasStockBajo />
    </div>
  );
}

export default Dashboard;
