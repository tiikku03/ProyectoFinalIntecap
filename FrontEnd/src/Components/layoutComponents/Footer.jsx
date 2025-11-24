import React from "react";
import { FiShoppingBag, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer(){
    return (
        <footer className="bg-gray-800 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sección de información de la tienda */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <FiShoppingBag className="w-7 h-7 md:w-8 md:h-8 text-blue-400" />
                            <h3 className="text-xl md:text-2xl font-bold text-white">TiendaOnline</h3>
                        </div>
                        <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed">
                            Tu destino para las mejores compras en línea.<br />
                            Calidad, variedad y los mejores precios.
                        </p>
                        
                        {/* Información de contacto */}
                        <div className="space-y-4">
                            <a href="mailto:soporte@smartShopping.com" className="flex items-center gap-4 hover:text-blue-400 transition-colors text-base md:text-lg">
                                <FiMail className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                                <span>soporte@smartShopping.com</span>
                            </a>
                            <a href="tel:+50256878950" className="flex items-center gap-4 hover:text-blue-400 transition-colors text-base md:text-lg">
                                <FiPhone className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                                <span>+502 5687-8950</span>
                            </a>
                            <div className="flex items-center gap-4 text-base md:text-lg">
                                <FiMapPin className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                                <span>Ciudad Guatemala</span>
                            </div>
                        </div>
                    </div>

                    {/* Sección de servicio al cliente */}
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-6">Servicio al Cliente</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/historial-pedidos" className="hover:text-blue-400 transition-colors text-base md:text-lg">
                                    Historial de Pedidos
                                </Link>
                            </li>
                            <li>
                                <Link to="/preguntas-frecuentes" className="hover:text-blue-400 transition-colors text-base md:text-lg">
                                    Preguntas Frecuentes
                                </Link>
                            </li>
                            <li>
                                <Link to="/contacto" className="hover:text-blue-400 transition-colors text-base md:text-lg">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link to="/politica-devoluciones" className="hover:text-blue-400 transition-colors text-base md:text-lg">
                                    Política de Devoluciones
                                </Link>
                            </li>
                            <li>
                                <Link to="/politica-envios" className="hover:text-blue-400 transition-colors text-base md:text-lg">
                                    Política de Envíos
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Línea divisoria y copyright */}
                
            </div>
        </footer>
    )
}

export default Footer;