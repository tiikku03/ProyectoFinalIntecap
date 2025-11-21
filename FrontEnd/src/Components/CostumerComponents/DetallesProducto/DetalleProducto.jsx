import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiTruck, FiStar } from "react-icons/fi";
import ImagenProducto from "./ImagenProducto";
import SelectorTalla from "./SelectorTalla";
import SelectorColor from "./SelectorColor";
import Cantidad from "./Cantidad";
import TabsDescripcionReseñas from "./TabsDescripcionReseñas";

function DetalleProducto() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tallaSeleccionada, setTallaSeleccionada] = useState('M');
    const [colorSeleccionado, setColorSeleccionado] = useState('Negro');
    const [cantidad, setCantidad] = useState(1);
    const [promedioCalificacion, setPromedioCalificacion] = useState(0);
    const [totalReseñas, setTotalReseñas] = useState(0);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/productos/obtenerProducto/${id}`
                );
                const data = await response.json();

                if (data.success && data.data) {
                    setProducto(data.data);
                    // Cargar reseñas para obtener el promedio
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
                    `${import.meta.env.VITE_API_URL}/reseñas/producto/${productId}`
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

    const handleAgregarAlCarrito = () => {
        // Aquí puedes integrar con tu contexto de carrito
        const productoCarrito = {
            ...producto,
            talla: tallaSeleccionada,
            color: colorSeleccionado,
            cantidad: cantidad
        };

        console.log("Agregar al carrito:", productoCarrito);
        alert("Producto agregado al carrito!");
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

    // Preparar array de imágenes (soporta tanto url_imagen como imagen_url)
    const imagenUrl = producto.url_imagen || producto.imagen_url;
    const imagenes = imagenUrl ? [imagenUrl] : [];

    // Preparar características
    const caracteristicas = producto.caracteristicas
        ? (typeof producto.caracteristicas === 'string'
            ? producto.caracteristicas.split('\n').filter(c => c.trim())
            : producto.caracteristicas)
        : [];

    const descuento = calcularDescuento();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6">
                <a href="/" className="hover:text-gray-700">Inicio</a>
                <span className="mx-2">/</span>
                <a href="/productos" className="hover:text-gray-700">Productos</a>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{producto.nombre}</span>
            </nav>

            {/* Contenido principal */}
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
                {/* Columna izquierda - Imágenes */}
                <ImagenProducto imagenes={imagenes} />

                {/* Columna derecha - Información */}
                <div className="w-full lg:w-1/2">
                    {/* Título */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {producto.nombre}
                    </h1>

                    {/* Reseñas */}
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

                    {/* Precio */}
                    <div className="mb-6">
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-gray-900">
                                ${producto.precio?.toFixed(2)}
                            </span>
                            {producto.precio_original && descuento > 0 && (
                                <>
                                    <span className="text-xl text-gray-500 line-through">
                                        ${producto.precio_original.toFixed(2)}
                                    </span>
                                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                                        -{descuento}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Stock */}
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

                    {/* Envío */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                        <FiTruck className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <p className="font-medium text-gray-900">Envío gratis en 24h</p>
                            <p className="text-sm text-gray-600">
                                Recíbelo mañana si haces el pedido antes de las 18:00h
                            </p>
                        </div>
                    </div>

                    {producto.stock > 0 && (
                        <>
                            {/* Selector de Talla */}
                            <SelectorTalla
                                tallaSeleccionada={tallaSeleccionada}
                                onTallaChange={setTallaSeleccionada}
                                producto={producto}
                            />

                            {/* Selector de Color */}
                            <SelectorColor
                                colorSeleccionado={colorSeleccionado}
                                onColorChange={setColorSeleccionado}
                                producto={producto}
                            />

                            {/* Cantidad */}
                            <Cantidad
                                cantidad={cantidad}
                                onCantidadChange={setCantidad}
                                stockDisponible={producto.stock}
                                maximoPermitido={10}
                            />

                            {/* Botones de acción */}
                            <div className="flex gap-3 mb-6">
                                <button
                                    onClick={handleAgregarAlCarrito}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                    Añadir al Carrito
                                </button>

                                <button
                                    className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-red-400 hover:text-red-500 transition-colors"
                                    aria-label="Añadir a lista de deseos"
                                >
                                    <FiHeart className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    )}

                    {/* Información adicional */}
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

            {/* Tabs de Descripción y Reseñas */}
            <div className="border-t pt-8">
                <TabsDescripcionReseñas
                    descripcion={producto.descripcion}
                    idProducto={producto.id_producto}
                    caracteristicas={caracteristicas}
                />
            </div>
        </div>
    );
}

export default DetalleProducto;
