import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch de productos desde la API
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/leerproductos?page=1`);
                const data = await response.json();
                
                if (data.success && data.data.productos) {
                    // Tomar solo los primeros 5 productos
                    setProductos(data.data.productos.slice(0, 5));
                }
            } catch (error) {
                console.error("Error al cargar productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    // Auto-play del carousel
    useEffect(() => {
        if (productos.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % productos.length);
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(interval);
    }, [productos.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % productos.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + productos.length) % productos.length);
    };

    if (loading) {
        return (
            <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
        );
    }

    if (productos.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No hay productos disponibles</p>
            </div>
        );
    }

    const currentProduct = productos[currentSlide];

    return (
        <div className="relative w-full h-64 md:h-96 bg-linear-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden shadow-lg">
            {/* Contenido del slide */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6 md:px-12 z-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
                        Bienvenido a TiendaOnline
                    </h2>
                    <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-6">
                        Descubre los mejores productos con calidad garantizada
                    </p>
                    <Link
                        to={`/producto/${currentProduct.id_producto}`}
                        className="inline-block bg-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                    >
                        Comprar Ahora
                    </Link>
                </div>
            </div>

            {/* Botón anterior */}
            <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 md:p-3 rounded-full shadow-lg transition-all z-20"
                aria-label="Anterior"
            >
                <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
            </button>

            {/* Botón siguiente */}
            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 md:p-3 rounded-full shadow-lg transition-all z-20"
                aria-label="Siguiente"
            >
                <FiChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
            </button>

            {/* Indicadores de slides */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {productos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                            index === currentSlide
                                ? 'bg-blue-600 w-6 md:w-8'
                                : 'bg-white bg-opacity-60 hover:bg-opacity-100'
                        }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Información del producto actual (oculta visualmente pero útil para SEO) */}
            <div className="sr-only">
                <h3>{currentProduct.nombre}</h3>
                <p>{currentProduct.descripcion}</p>
                <p>Precio: ${currentProduct.precio}</p>
            </div>
        </div>
    );
}

export default HeroCarousel;
