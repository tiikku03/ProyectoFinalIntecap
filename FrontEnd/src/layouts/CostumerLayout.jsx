import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/layoutComponents/Header.jsx";
import Footer from "../Components/layoutComponents/Footer.jsx";

function CostumerLayout() {
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default CostumerLayout;