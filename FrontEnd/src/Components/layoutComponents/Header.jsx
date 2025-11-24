import React, { useState } from "react";
import { FiMenu, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/LogInContext.jsx";
import { useCarrito } from "../../Context/CarritoContext.jsx";
import { useWishlist } from "../../Context/WishlistContext.jsx";
import Sidebar from "../CostumerComponents/Sidebar";
import UserModal from "../CostumerComponents/UserModal";

function Header(){
    const { isAuthenticated } = useAuth();
    const { cantidadItems } = useCarrito();
    const { cantidadItems: wishlistCount } = useWishlist();
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

                        
                        <Link to="/" className="flex items-center gap-2">
                            <span
                                className="overflow-hidden flex items-center justify-center"
                                style={{ height: '64px', width: '180px' }}
                            >
                                <img
                                    src="http://detova.com/wp-content/uploads/2025/09/Smart-Shopping.png"
                                    alt="SmartShopping Logo"
                                    className="h-7 w-auto md:h-14 md:w-auto object-contain m-auto"
                                    style={{ maxWidth: '100%', height: '28px' }}
                                />
                            </span>
                        </Link>

                        <div className="flex items-center gap-2 md:gap-4">
                            <Link to="/wishlist" className="relative p-1 md:p-2 rounded-md hover:bg-gray-100 transition-colors">
                                <FiHeart className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] md:text-xs font-bold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            <Link to="/carrito" className="relative p-1 md:p-2 rounded-md hover:bg-gray-100 transition-colors">
                                <FiShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                                {cantidadItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] md:text-xs font-bold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                                        {cantidadItems}
                                    </span>
                                )}
                            </Link>

                            <button 
                                onClick={() => setUserModalOpen(true)}
                                className="p-1 md:p-2 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                <FiUser className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
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