import React, { useState } from "react";
import { FiMenu, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/LogInContext.jsx";
import Sidebar from "../CostumerComponents/Sidebar";
import UserModal from "../CostumerComponents/UserModal";

function Header(){
    const { isAuthenticated } = useAuth();
    const [wishlistCount] = useState(5); // Contador de wishlist
    const [cartCount] = useState(3); // Contador de carrito
    const [menuOpen, setMenuOpen] = useState(false); // Estado del menú lateral
    const [userModalOpen, setUserModalOpen] = useState(false); // Estado del modal de usuario

    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                    <div className="flex justify-between items-center h-16">
                
                        <button 
                            onClick={() => setMenuOpen(true)}
                            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <FiMenu className="w-5 h-5 text-gray-700" />
                        </button>

                        
                        <Link to="/" className="text-xl font-bold text-gray-800">
                            Mi Tienda
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link to="/wishlist" className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                                <FiHeart className="w-5 h-5 text-gray-700" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            <Link to="/carrito" className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                                <FiShoppingCart className="w-5 h-5 text-gray-700" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <button 
                                onClick={() => setUserModalOpen(true)}
                                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                <FiUser className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar Component - Solo si está autenticado */}
            {isAuthenticated && <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
            
            {/* User Modal Component */}
            <UserModal userModalOpen={userModalOpen} setUserModalOpen={setUserModalOpen} />
        </>
    )
}

export default Header;