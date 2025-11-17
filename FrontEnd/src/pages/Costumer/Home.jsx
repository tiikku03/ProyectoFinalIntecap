import React from "react";
import HeroCarousel from "../../Components/CostumerComponents/HeroCarousel";
import SeccionProductos from "../../Components/CostumerComponents/SeccionProductos";


function Home(){
    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-8">
            {/* Hero Carousel */}
            <HeroCarousel />

            {/* Sección de Novedades */}
            <SeccionProductos titulo="Novedades" limite={4} />
        </div>
    )
}
export default Home;