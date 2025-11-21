import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../Context/CarritoContext";
import { FiShoppingCart } from "react-icons/fi";
import Envio from "../../Components/CostumerComponents/EnvioPage/Envio";

function EnvioPage() {
    const navigate = useNavigate();
    const { carrito, loading } = useCarrito();

    // Calcular totales
    const calcularTotales = () => {
        if (!carrito || !carrito.detalle_carrito) {
            return {
                subtotal: "0.00",
                envio: "0.00",
                total: "0.00",
            };
        }

        const subtotal = parseFloat(carrito.total);
        const envio = 0; // Envío gratis
        const total = subtotal + envio;

        return {
            subtotal: subtotal.toFixed(2),
            envio: envio.toFixed(2),
            total: total.toFixed(2),
        };
    };

    // Estado de carga
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="h-96 bg-gray-200 rounded-lg"></div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="h-96 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Carrito vacío
    if (!carrito || !carrito.detalle_carrito || carrito.detalle_carrito.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <FiShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        No hay productos en el carrito
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Agrega productos antes de continuar con el checkout
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Ir al Home
                    </button>
                </div>
            </div>
        );
    }

    const totales = calcularTotales();

    return <Envio carrito={carrito} totales={totales} />;
}

export default EnvioPage;
