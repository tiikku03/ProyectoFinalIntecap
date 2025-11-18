import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
    FiGrid, 
    FiPackage, 
    FiShoppingCart, 
    FiUsers, 
    FiMessageSquare, 
    FiSettings, 
    FiLogOut,
    FiX
} from "react-icons/fi";

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();

    const menuItems = [
        { path: "/admin/dashboard", icon: FiGrid, label: "Dashboard" },
        { path: "/admin/productos", icon: FiPackage, label: "Productos" },
        { path: "/admin/pedidos", icon: FiShoppingCart, label: "Pedidos" },
        { path: "/admin/usuarios", icon: FiUsers, label: "Usuarios" },
        { path: "/admin/resenas", icon: FiMessageSquare, label: "Reseñas" },
        { path: "/admin/configuracion", icon: FiSettings, label: "Configuración" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Overlay para mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:hidden ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header del sidebar */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-600">Panel de Administración</h2>
                            <p className="text-xs text-gray-500 mt-1">Navega por las diferentes secciones del panel</p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <FiX className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Menú de navegación */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-3">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                
                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                                active
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium text-sm">{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Botón de cerrar sesión */}
                    <div className="p-4 border-t border-gray-200">
                        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <FiLogOut className="w-5 h-5" />
                            <span className="font-medium text-sm">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default AdminSidebar;
