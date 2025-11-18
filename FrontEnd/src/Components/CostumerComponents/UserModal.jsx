import React from "react";
import { FiX, FiUser, FiPackage, FiSettings, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/LogInContext.jsx";

function UserModal({ userModalOpen, setUserModalOpen }) {
    const { isAuthenticated, usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setUserModalOpen(false);
        navigate('/');
    };

    return (
        <>
            {/* Overlay oscuro */}
            {userModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setUserModalOpen(false)}
                />
            )}

            {/* Modal de usuario */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                userModalOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                {/* Header del modal */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Mi Cuenta</h2>
                    <button 
                        onClick={() => setUserModalOpen(false)}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <FiX className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                {/* Contenido del modal */}
                <div className="p-4">
                    {isAuthenticated ? (
                        // Usuario autenticado
                        <>
                            {/* Información del usuario */}
                            <div className="mb-6 pb-4 border-b border-gray-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                        <FiUser className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {usuario?.nombre} {usuario?.apellido}
                                        </h3>
                                        <p className="text-sm text-gray-500">{usuario?.correo}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Opciones del menú */}
                            <nav className="space-y-2">
                                <Link
                                    to="/perfil"
                                    onClick={() => setUserModalOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <FiUser className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-700">Mi Perfil</span>
                                </Link>

                                <Link
                                    to="/pedidos"
                                    onClick={() => setUserModalOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <FiPackage className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-700">Mis Pedidos</span>
                                </Link>

                                <Link
                                    to="/configuracion"
                                    onClick={() => setUserModalOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <FiSettings className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-700">Configuración</span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 mt-4"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                    <span className="font-medium">Cerrar Sesión</span>
                                </button>
                            </nav>
                        </>
                    ) : (
                        // Usuario no autenticado
                        <>
                            <p className="text-sm text-gray-500 mb-6">
                                Gestiona tu cuenta y preferencias
                            </p>

                            {/* Botones de acción */}
                            <div className="space-y-3">
                                <Link 
                                    to="/login"
                                    onClick={() => setUserModalOpen(false)}
                                    className="block w-full bg-gray-900 text-white text-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                >
                                    Iniciar Sesión
                                </Link>

                                <Link 
                                    to="/register"
                                    onClick={() => setUserModalOpen(false)}
                                    className="block w-full border-2 border-gray-900 text-gray-900 text-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Registrarse
                                </Link>
                            </div>

                            <p className="text-sm text-gray-500 text-center mt-4">
                                Crea una cuenta para guardar tus productos favoritos
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserModal;
