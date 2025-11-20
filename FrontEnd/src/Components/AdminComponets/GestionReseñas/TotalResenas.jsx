import { useState, useEffect } from 'react';

const TotalResenas = () => {
  const [totalResenas, setTotalResenas] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTotalResenas();
  }, []);

  const fetchTotalResenas = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/resenas/leerresena`);
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setTotalResenas(data.data.length);
      }
    } catch (error) {
      console.error('Error al obtener total de reseñas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-sm animate-pulse w-32">
        <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
        <div className="h-5 bg-gray-200 rounded w-6"></div>
      </div>
    );
  }

  return (
    <div className="bg-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow w-32">
      <h3 className="text-xs font-medium text-gray-600 mb-1">Total</h3>
      <p className="text-xl font-bold text-indigo-600">{totalResenas}</p>
    </div>
  );
};

export default TotalResenas;
