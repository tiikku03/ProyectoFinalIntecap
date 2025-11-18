import React, { useState, useEffect } from "react";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

function FormularioEditarProducto({ isOpen, onClose, onProductoActualizado, producto }) {
    const [enviando, setEnviando] = useState(false);
    
    // Estados del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        categoria: "",
        subcategoria: "",
        precio: "",
        stock: "",
        url_imagen: ""
    });

    const [errores, setErrores] = useState({});

    // Cargar datos del producto cuando se abre el modal
    useEffect(() => {
        if (isOpen && producto) {
            setFormData({
                nombre: producto.nombre || "",
                descripcion: producto.descripcion || "",
                categoria: producto.categoria || "",
                subcategoria: producto.subcategoria || "",
                precio: producto.precio || "",
                stock: producto.stock || "",
                url_imagen: producto.url_imagen || ""
            });
        }
    }, [isOpen, producto]);

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

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!formData.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es requerido";
        }

        if (!formData.descripcion.trim()) {
            nuevosErrores.descripcion = "La descripción es requerida";
        }

        if (!formData.categoria.trim()) {
            nuevosErrores.categoria = "La categoría es requerida";
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
            const productData = {
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                categoria: formData.categoria,
                subcategoria: formData.subcategoria || null,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                url_imagen: formData.url_imagen || null
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/productos/actualizarproducto/${producto.id_producto}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData)
                }
            );

            const data = await response.json();

            if (data.success) {
                alert('Producto actualizado exitosamente');
                onProductoActualizado();
                resetFormulario();
                onClose();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert('Error al actualizar el producto. Intenta nuevamente.');
        } finally {
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
            url_imagen: ""
        });
        setErrores({});
    };

    const handleClose = () => {
        resetFormulario();
        onClose();
    };

    if (!isOpen || !producto) return null;

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
                                <h2 className="text-2xl font-bold text-gray-900">Editar Producto</h2>
                                <p className="text-sm text-gray-600 mt-1">Actualiza los datos del producto</p>
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
                                    <input
                                        type="text"
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                                            errores.categoria ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={enviando}
                                    />
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

                            {/* Imagen del Producto */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Imagen del Producto</h3>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL de la imagen
                                    </label>
                                    <input
                                        type="url"
                                        name="url_imagen"
                                        value={formData.url_imagen}
                                        onChange={handleChange}
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        disabled={enviando}
                                    />
                                </div>

                                {/* Preview de la imagen */}
                                {formData.url_imagen && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
                                        <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                            <img
                                                src={formData.url_imagen}
                                                alt="Preview"
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
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
                                    {enviando ? 'Actualizando...' : 'Actualizar Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormularioEditarProducto;
