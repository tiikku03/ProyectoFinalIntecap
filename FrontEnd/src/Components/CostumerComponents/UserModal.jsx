import React from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

function UserModal({ userModalOpen, setUserModalOpen }) {
    return (
        <>
            {/* Overlay oscuro */}
            {userModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
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
                </div>
            </div>
        </>
    );
}

export default UserModal;
