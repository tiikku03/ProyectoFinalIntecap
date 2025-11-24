import React from "react";
import HeroCarousel from "../../Components/CostumerComponents/HomePage/HeroCarousel";
import SeccionProductos from "../../Components/CostumerComponents/SeccionProductos";


function Home(){
    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-8">
            <HeroCarousel />

            <SeccionProductos titulo="Celulares" limite={4} mostrarVerTodo={true} />
            <SeccionProductos titulo="Ropa" limite={4} mostrarVerTodo={true} />
            <SeccionProductos titulo="Alimentos" limite={4} mostrarVerTodo={true} />
        </div>
    )
}
export default Home;