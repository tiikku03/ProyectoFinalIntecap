import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiTruck, FiStar, FiArrowLeft } from "react-icons/fi";
import { useWishlist } from "../../Context/WishlistContext";
import ImagenProducto from "../../Components/CostumerComponents/DetallesProducto/ImagenProducto";
import SelectorTalla from "../../Components/CostumerComponents/DetallesProducto/SelectorTalla";
import SelectorColor from "../../Components/CostumerComponents/DetallesProducto/SelectorColor";
import Cantidad from "../../Components/CostumerComponents/DetallesProducto/Cantidad";
import TabsDescripcionReseñas from "../../Components/CostumerComponents/DetallesProducto/TabsDescripcionReseñas";

function DetalleProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { verificarEnWishlist, agregarAWishlist, eliminarDeWishlist, obtenerIdWishlist } = useWishlist();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tallaSeleccionada, setTallaSeleccionada] = useState('M');
    const [colorSeleccionado, setColorSeleccionado] = useState('Negro');
    const [cantidad, setCantidad] = useState(1);
    const [promedioCalificacion, setPromedioCalificacion] = useState(0);
    const [totalReseñas, setTotalReseñas] = useState(0);
    const [enWishlist, setEnWishlist] = useState(false);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/productos/leerproducto/${id}`
                );
                const data = await response.json();

                if (data.success && data.data) {
                    setProducto(data.data);
                    fetchReseñas(id);
                }
            } catch (error) {
                console.error("Error al cargar producto:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchReseñas = async (productId) => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/resenas/producto/${productId}`
                );
                const data = await response.json();

                if (data.success && data.data && data.data.length > 0) {
                    const suma = data.data.reduce((acc, r) => acc + r.calificacion, 0);
                    setPromedioCalificacion((suma / data.data.length).toFixed(1));
                    setTotalReseñas(data.data.length);
                }
            } catch (error) {
                console.error("Error al cargar reseñas:", error);
            }
        };

        if (id) {
            fetchProducto();
        }
    }, [id]);

    // Verificar si el producto está en la wishlist
    useEffect(() => {
        if (producto) {
            setEnWishlist(verificarEnWishlist(producto.id_producto));
        }
    }, [producto, verificarEnWishlist]);

    const handleAgregarAlCarrito = () => {
        const productoCarrito = {
            ...producto,
            talla: tallaSeleccionada,
            color: colorSeleccionado,
            cantidad: cantidad
        };

        console.log("Agregar al carrito:", productoCarrito);
        alert("Producto agregado al carrito!");
    };

    const handleToggleWishlist = async () => {
        if (enWishlist) {
            // Eliminar de la wishlist
            const idWishlist = obtenerIdWishlist(producto.id_producto);
            const resultado = await eliminarDeWishlist(idWishlist);

            if (resultado.success) {
                setEnWishlist(false);
            } else if (resultado.requireAuth) {
                navigate('/login');
            } else {
                alert(resultado.message);
            }
        } else {
            // Agregar a la wishlist
            const resultado = await agregarAWishlist(producto.id_producto);

            if (resultado.success) {
                setEnWishlist(true);
            } else if (resultado.requireAuth) {
                navigate('/login');
            } else {
                alert(resultado.message);
            }
        }
    };

    const calcularDescuento = () => {
        if (producto?.precio_original && producto?.precio) {
            const descuento = ((producto.precio_original - producto.precio) / producto.precio_original) * 100;
            return Math.round(descuento);
        }
        return 0;
    };

    const renderEstrellas = (calificacion) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((estrella) => (
                    <FiStar
                        key={estrella}
                        className={`w-4 h-4 ${
                            estrella <= Math.round(calificacion)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }`}
                    />
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2 bg-gray-200 aspect-square rounded-lg"></div>
                        <div className="w-full lg:w-1/2 space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-32 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Producto no encontrado
                    </h2>
                    <p className="text-gray-600">
                        El producto que buscas no existe o ha sido eliminado.
                    </p>
                </div>
            </div>
        );
    }

    const imagenUrl = producto.url_imagen || producto.imagen_url;
    const imagenes = imagenUrl ? [imagenUrl] : [];

    const descuento = calcularDescuento();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Botón de volver */}
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
                <FiArrowLeft className="w-5 h-5" />
                <span className="font-medium">Volver</span>
            </button>

            <div className="flex flex-col lg:flex-row gap-8 mb-12">
                <ImagenProducto imagenes={imagenes} />

                <div className="w-full lg:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {producto.nombre}
                    </h1>

                    <div className="flex items-center gap-2 mb-4">
                        {totalReseñas > 0 ? (
                            <>
                                {renderEstrellas(parseFloat(promedioCalificacion))}
                                <span className="text-sm font-medium text-gray-900">
                                    {promedioCalificacion}
                                </span>
                                <span className="text-sm text-gray-500">
                                    ({totalReseñas} {totalReseñas === 1 ? 'reseña' : 'reseñas'})
                                </span>
                            </>
                        ) : (
                            <span className="text-sm text-gray-500">Sin reseñas</span>
                        )}
                    </div>

                    <div className="mb-6">
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-gray-900">
                                Q{parseFloat(producto.precio).toFixed(2)}
                            </span>
                            {producto.precio_original && descuento > 0 && (
                                <>
                                    <span className="text-xl text-gray-500 line-through">
                                        Q{parseFloat(producto.precio_original).toFixed(2)}
                                    </span>
                                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                                        -{descuento}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        {producto.stock > 0 ? (
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                    En Stock
                                </span>
                                <span className="text-sm text-gray-600">
                                    {producto.stock} unidades disponibles
                                </span>
                            </div>
                        ) : (
                            <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                                Agotado
                            </span>
                        )}
                    </div>

                    <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                        <FiTruck className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <p className="font-medium text-gray-900">Envío gratis en 24h</p>
                            <p className="text-sm text-gray-600">
                                Recíbelo mañana si haces el pedido antes de las 18:00h
                            </p>
                        </div>
                    </div>

                    {producto.stock > 0 ? (
                        <>
                            <SelectorTalla
                                tallaSeleccionada={tallaSeleccionada}
                                onTallaChange={setTallaSeleccionada}
                                producto={producto}
                            />

                            <SelectorColor
                                colorSeleccionado={colorSeleccionado}
                                onColorChange={setColorSeleccionado}
                                producto={producto}
                            />

                            <Cantidad
                                cantidad={cantidad}
                                onCantidadChange={setCantidad}
                                stockDisponible={producto.stock}
                                maximoPermitido={producto.stock}
                            />

                            <div className="flex gap-3 mb-6">
                                <button
                                    onClick={handleAgregarAlCarrito}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                    Añadir al Carrito
                                </button>

                                <button
                                    onClick={handleToggleWishlist}
                                    className={`px-6 py-3 border-2 rounded-lg transition-all duration-200 ${
                                        enWishlist
                                            ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                                            : 'border-gray-300 text-gray-700 hover:border-red-400 hover:text-red-500'
                                    }`}
                                    aria-label={enWishlist ? "Quitar de lista de deseos" : "Añadir a lista de deseos"}
                                >
                                    <FiHeart className={`w-5 h-5 ${enWishlist ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="mb-6">
                            <button
                                onClick={handleToggleWishlist}
                                className={`w-full flex items-center justify-center gap-2 px-6 py-3 border-2 rounded-lg transition-all duration-200 font-medium ${
                                    enWishlist
                                        ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                                        : 'border-red-400 text-red-600 hover:bg-red-50'
                                }`}
                                aria-label={enWishlist ? "Quitar de lista de deseos" : "Añadir a lista de deseos"}
                            >
                                <FiHeart className={`w-5 h-5 ${enWishlist ? 'fill-current' : ''}`} />
                                {enWishlist ? 'En tu Lista de Deseos' : 'Agregar a Lista de Deseos'}
                            </button>
                        </div>
                    )}

                    <div className="border-t pt-6 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Categoría:</span>
                            <span className="font-medium text-gray-900">
                                {producto.categoria}
                            </span>
                        </div>
                        {producto.subcategoria && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subcategoría:</span>
                                <span className="font-medium text-gray-900">
                                    {producto.subcategoria}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-600">SKU:</span>
                            <span className="font-medium text-gray-900">
                                PROD-{producto.id_producto}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t pt-8">
                <TabsDescripcionReseñas
                    descripcion={producto.descripcion}
                    idProducto={producto.id_producto}
                />
            </div>
        </div>
    );
}

export default DetalleProducto;
