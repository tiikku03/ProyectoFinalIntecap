import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    FiGrid, 
    FiPackage, 
    FiShoppingCart, 
    FiUsers, 
    FiMessageSquare, 
    FiSettings, 
    FiLogOut,
    FiMenu
} from "react-icons/fi";

function AdminHeader({ setSidebarOpen }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes agregar lógica de logout (limpiar localStorage, etc.)
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 lg:px-6 h-16">
                {/* Botón de menú móvil y logo */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <FiMenu className="w-6 h-6 text-gray-700" />
                    </button>
                    
                    <Link to="/admin/dashboard" className="flex items-center gap-2">
                        <span className="text-xl font-bold">
                            <span className="text-blue-600">Admin</span>
                            <span className="text-gray-800"> Panel</span>
                        </span>
                    </Link>
                </div>

                {/* Menú de navegación desktop */}
                <nav className="hidden md:flex items-center gap-1">
                    <Link 
                        to="/admin/dashboard" 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <FiGrid className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link 
                        to="/admin/productos" 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <FiPackage className="w-4 h-4" />
                        Productos
                    </Link>
                    <Link 
                        to="/admin/pedidos" 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <FiShoppingCart className="w-4 h-4" />
                        Pedidos
                    </Link>
                    <Link 
                        to="/admin/usuarios" 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <FiUsers className="w-4 h-4" />
                        Usuarios
                    </Link>
                    <Link 
                        to="/admin/resenas" 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <FiMessageSquare className="w-4 h-4" />
                        Reseñas
                    </Link>
                </nav>

                {/* Botón de salir */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <FiLogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Salir</span>
                </button>
            </div>
        </header>
    );
}

export default AdminHeader;
