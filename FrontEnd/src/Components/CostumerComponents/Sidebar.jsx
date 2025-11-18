import React from "react";
import { FiX, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

function Sidebar({ menuOpen, setMenuOpen }) {
    const categorias = [
        "Electrónica",
        "Ropa y Moda",
        "Hogar y Jardín",
        "Deportes",
        "Libros",
        "Juguetes",
        "Belleza",
        "Alimentos"
    ];

    return (
        <>
            {/* Overlay oscuro */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Menú lateral deslizante */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Header del menú */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Menú</h2>
                    <button 
                        onClick={() => setMenuOpen(false)}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <FiX className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                {/* Contenido del menú */}
                <div className="p-4 overflow-y-auto h-full pb-20">
                    <p className="text-sm text-gray-500 mb-6">
                        Explora nuestras categorías de productos
                    </p>

                    {/* Botón Regresar al Home */}
                    <Link 
                        to="/" 
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors mb-6"
                    >
                        <FiHome className="w-5 h-5 text-gray-700" />
                        <span className="font-medium text-gray-800">Regresar al Home</span>
                    </Link>

                    {/* Categorías */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">
                            CATEGORÍAS
                        </h3>
                        <nav className="space-y-1">
                            {categorias.map((categoria, index) => (
                                <Link
                                    key={index}
                                    to={`/categoria/${categoria.toLowerCase().replace(/\s+/g, '-')}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="block p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                                >
                                    {categoria}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
