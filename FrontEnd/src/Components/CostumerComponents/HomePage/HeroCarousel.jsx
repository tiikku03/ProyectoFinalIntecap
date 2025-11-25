import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Array de URLs de imágenes personalizadas
    const images = [
        "https://elsolweb.tv/wp-content/uploads/2020/02/tienda-samsung1.jpg",
        "https://soyummy.com/wp-content/uploads/2024/08/empty-aisles-at-a-supermarket-grocery-shopping-concepts-stockpack-istock-scaled-1-1024x674-1.jpg",
        "https://blogs.hoy.es/red-decora/wp-content/uploads/sites/66/2014/02/Spar-supermercado-en-Budapest-dise%C3%B1o-por-LAB5-architects_12.jpg"
        // Agrega aquí tus propias URLs
    ];

    // Auto-play del carousel
    useEffect(() => {
        if (images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000); // Cambia cada 5 segundos
        return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    if (images.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No hay imágenes disponibles</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-64 md:h-96 bg-linear-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden shadow-lg">
            {/* Imagen de fondo del slide */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${images[currentSlide]})`,
                    filter: "brightness(0.7)",
                    zIndex: 1
                }}
            ></div>

            {/* Contenido del slide */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6 md:px-12 z-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                        Bienvenido a smartShopping
                    </h2>
                    <p className="text-sm md:text-lg text-white mb-4 md:mb-6">
                        Descubre los mejores productos con calidad garantizada
                    </p>
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
                {images.map((_, index) => (
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
        </div>
    );
}

export default HeroCarousel;