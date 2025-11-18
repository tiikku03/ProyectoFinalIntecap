import React, { useState, useEffect } from "react";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

function FormularioProducto({ isOpen, onClose, onProductoCreado }) {
    const [categorias, setCategorias] = useState([]);
    const [loadingCategorias, setLoadingCategorias] = useState(true);
    const [enviando, setEnviando] = useState(false);
    
    // Estados del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        categoria: "",
        subcategoria: "",
        precio: "",
        stock: "",
        imagenes: [""]
    });

    const [errores, setErrores] = useState({});

    // Cargar categorías al montar el componente
    useEffect(() => {
        if (isOpen) {
            fetchCategorias();
        }
    }, [isOpen]);

    const fetchCategorias = async () => {
        try {
            let todasLasCategorias = [];
            let page = 1;
            let hasMore = true;

            // Obtener todos los productos de todas las páginas
            while (hasMore) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/leerproductos?page=${page}`);
                const data = await response.json();
                
                if (data.success && data.data.productos.length > 0) {
                    todasLasCategorias = [...todasLasCategorias, ...data.data.productos];
                    hasMore = data.data.hasNextPage;
                    page++;
                } else {
                    hasMore = false;
                }
            }
            
            // Extraer categorías únicas
            const categoriasUnicas = [...new Set(todasLasCategorias
                .map(producto => producto.categoria)
                .filter(cat => cat && cat.trim() !== "")
            )].sort();
            
            setCategorias(categoriasUnicas);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        } finally {
            setLoadingCategorias(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo cuando el usuario escribe
        if (errores[name]) {
            setErrores(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleImagenChange = (index, value) => {
        const nuevasImagenes = [...formData.imagenes];
        nuevasImagenes[index] = value;
        setFormData(prev => ({
            ...prev,
            imagenes: nuevasImagenes
        }));
    };

    const agregarCampoImagen = () => {
        setFormData(prev => ({
            ...prev,
            imagenes: [...prev.imagenes, ""]
        }));
    };

    const eliminarCampoImagen = (index) => {
        if (formData.imagenes.length > 1) {
            const nuevasImagenes = formData.imagenes.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                imagenes: nuevasImagenes
            }));
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!formData.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es requerido";
        }

        if (!formData.descripcion.trim()) {
            nuevosErrores.descripcion = "La descripción es requerida";
        }

        if (!formData.categoria) {
            nuevosErrores.categoria = "Selecciona una categoría";
        }

        if (!formData.precio || parseFloat(formData.precio) <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a 0";
        }

        if (!formData.stock || parseInt(formData.stock) < 0) {
            nuevosErrores.stock = "El stock no puede ser negativo";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        setEnviando(true);

        try {
            // Filtrar URLs de imágenes vacías
            const imagenesValidas = formData.imagenes.filter(img => img.trim() !== "");

            const productData = {
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                categoria: formData.categoria,
                subcategoria: formData.subcategoria || null,
                precio: parseFloat(formData.precio),
                stock_actual: parseInt(formData.stock),
                imagenes: imagenesValidas
            };

            // TODO: Reemplazar con la llamada real a la API
            // const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/crearproducto`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(productData)
            // });

            // const data = await response.json();

            // if (data.success) {
            //     onProductoCreado();
            //     resetFormulario();
            //     onClose();
            //     alert('Producto creado exitosamente');
            // } else {
            //     alert(`Error: ${data.message}`);
            // }

            // Simulación de éxito (eliminar cuando conectes la API)
            console.log("Datos a enviar:", productData);
            setTimeout(() => {
                alert('Producto creado exitosamente (simulación)');
                resetFormulario();
                onClose();
                onProductoCreado();
                setEnviando(false);
            }, 1000);

        } catch (error) {
            console.error("Error al crear producto:", error);
            alert('Error al crear el producto. Intenta nuevamente.');
            setEnviando(false);
        }
    };

    const resetFormulario = () => {
        setFormData({
            nombre: "",
            descripcion: "",
            categoria: "",
            subcategoria: "",
            precio: "",
            stock: "",
            imagenes: [""]
        });
        setErrores({});
    };

    const handleClose = () => {
        resetFormulario();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/50 z-50"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div 
                        className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Nuevo Producto</h2>
                                <p className="text-sm text-gray-600 mt-1">Completa los datos del nuevo producto</p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                disabled={enviando}
                            >
                                <FiX className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Información Básica */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
                                
                                {/* Nombre del Producto */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre del Producto <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                                            errores.nombre ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={enviando}
                                    />
                                    {errores.nombre && (
                                        <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descripción <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none ${
                                            errores.descripcion ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={enviando}
                                    />
                                    {errores.descripcion && (
                                        <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>
                                    )}
                                </div>

                                {/* Categoría */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoría <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                                            errores.categoria ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={enviando || loadingCategorias}
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map((cat, index) => (
                                            <option key={index} value={cat.nombre || cat}>
                                                {cat.nombre || cat}
                                            </option>
                                        ))}
                                    </select>
                                    {errores.categoria && (
                                        <p className="text-red-500 text-sm mt-1">{errores.categoria}</p>
                                    )}
                                </div>

                                {/* Subcategoría */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subcategoría
                                    </label>
                                    <input
                                        type="text"
                                        name="subcategoria"
                                        value={formData.subcategoria}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        disabled={enviando}
                                    />
                                </div>
                            </div>

                            {/* Precio e Inventario */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Precio e Inventario</h3>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Precio */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Precio (USD) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                            <input
                                                type="number"
                                                name="precio"
                                                value={formData.precio}
                                                onChange={handleChange}
                                                placeholder="0"
                                                step="0.01"
                                                min="0"
                                                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                                                    errores.precio ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                disabled={enviando}
                                            />
                                        </div>
                                        {errores.precio && (
                                            <p className="text-red-500 text-sm mt-1">{errores.precio}</p>
                                        )}
                                    </div>

                                    {/* Stock */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Stock (Unidades) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            placeholder="0"
                                            min="0"
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                                                errores.stock ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            disabled={enviando}
                                        />
                                        {errores.stock && (
                                            <p className="text-red-500 text-sm mt-1">{errores.stock}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Imágenes del Producto */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Imágenes del Producto</h3>
                                
                                <div className="space-y-3">
                                    {formData.imagenes.map((imagen, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="url"
                                                value={imagen}
                                                onChange={(e) => handleImagenChange(index, e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                disabled={enviando}
                                            />
                                            {formData.imagenes.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarCampoImagen(index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    disabled={enviando}
                                                >
                                                    <FiTrash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={agregarCampoImagen}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                                    disabled={enviando}
                                >
                                    <FiPlus className="w-5 h-5" />
                                    Agregar
                                </button>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    disabled={enviando}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={enviando}
                                >
                                    {enviando ? 'Creando...' : 'Crear Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormularioProducto;
