import React from "react";
import { useCarrito } from "../../Context/CarritoContext";
import Revision from "../../Components/CostumerComponents/RevisionPage/Revision";

function RevisionPage() {
    const { carrito } = useCarrito();

    // Calcular totales
    const calcularTotales = () => {
        if (!carrito || !carrito.detalle_carrito) {
            return {
                subtotal: "0.00",
                envio: "0.00",
                total: "0.00",
            };
        }

        const subtotal = carrito.detalle_carrito.reduce(
            (acc, item) => acc + parseFloat(item.subtotal),
            0
        );

        const envio = subtotal >= 100 ? 0 : 10;
        const total = subtotal + envio;

        return {
            subtotal: subtotal.toFixed(2),
            envio: envio.toFixed(2),
            total: total.toFixed(2),
        };
    };

    const totales = calcularTotales();

    return <Revision carrito={carrito} totales={totales} />;
}

export default RevisionPage;
