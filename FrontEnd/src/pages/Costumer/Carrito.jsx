import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import ItemCarrito from "../../Components/CostumerComponents/CarritoPage/ItemCarrito";
import ResumenPedido from "../../Components/CostumerComponents/CarritoPage/ResumenPedido";
import BotonesAccion from "../../Components/CostumerComponents/CarritoPage/BotonesAccion";
import { useCarrito } from "../../Context/CarritoContext";

function Carrito() {
    const navigate = useNavigate();
    const { carrito, loading, actualizarCantidad, eliminarDelCarrito } = useCarrito();

    const handleCantidadChange = async (idProducto, nuevaCantidad) => {
        const resultado = await actualizarCantidad(idProducto, nuevaCantidad);
        if (!resultado.success) {
            alert("Error al actualizar la cantidad");
        }
    };

    const handleEliminarProducto = async (idProducto) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            return;
        }

        const resultado = await eliminarDelCarrito(idProducto);
        if (!resultado.success) {
            alert("Error al eliminar el producto");
        }
    };

    const handleProcederPago = () => {
        // TODO: Navegar a la página de pago/checkout
        navigate("/checkout");
    };

    const handleContinuarComprando = () => {
        navigate("/");
    };

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

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-32 bg-gray-200 rounded-lg"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!carrito || !carrito.detalle_carrito || carrito.detalle_carrito.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <FiShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Tu carrito está vacío
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Agrega productos para comenzar tu compra
                    </p>
                    <button
                        onClick={handleContinuarComprando}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Ir al Home
                    </button>
                </div>
            </div>
        );
    }

    const totales = calcularTotales();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Encabezado */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Carrito de Compras
                </h1>
                <p className="text-gray-600">
                    {carrito.cantidadItems} {carrito.cantidadItems === 1 ? 'producto' : 'productos'} en tu carrito
                </p>
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lista de productos */}
                <div className="lg:col-span-2 space-y-4">
                    {carrito.detalle_carrito.map((item) => (
                        <ItemCarrito
                            key={item.ProductoID}
                            item={item}
                            onCantidadChange={handleCantidadChange}
                            onEliminar={handleEliminarProducto}
                        />
                    ))}
                </div>

                {/* Resumen y botones de acción */}
                <div className="lg:col-span-1 space-y-4">
                    <ResumenPedido
                        subtotal={totales.subtotal}
                        envio={totales.envio}
                        total={totales.total}
                    />
                    <BotonesAccion
                        onProcederPago={handleProcederPago}
                        onContinuarComprando={handleContinuarComprando}
                    />
                </div>
            </div>
        </div>
    );
}

export default Carrito;
