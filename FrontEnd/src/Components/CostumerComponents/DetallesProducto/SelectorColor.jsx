import React from "react";
import { FiCheck } from "react-icons/fi";

function SelectorColor({ colorSeleccionado, onColorChange, producto }) {
    // Categorías que requieren selector de color
    const categoriasConColor = [
        'Ropa',
        'Deportes',
        'Ropa Deportiva',
        'Tenis',
        'Calzado',
        'Celulares',
        'Laptops',
        'Accesorios',
        'Tecnología'
    ];

    // Verificar si el producto pertenece a una categoría que requiere color
    const requiereColor = categoriasConColor.some(cat =>
        producto?.categoria?.toLowerCase().includes(cat.toLowerCase()) ||
        producto?.subcategoria?.toLowerCase().includes(cat.toLowerCase())
    );

    if (!requiereColor) {
        return null;
    }

    // Colores disponibles con sus valores hexadecimales
    const coloresDisponibles = [
        { nombre: 'Negro', valor: '#000000' },
        { nombre: 'Blanco', valor: '#FFFFFF' },
        { nombre: 'Azul', valor: '#3B82F6' },
        { nombre: 'Rojo', valor: '#EF4444' },
        { nombre: 'Verde', valor: '#10B981' },
        { nombre: 'Gris', valor: '#6B7280' },
    ];

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Color: <span className="text-gray-900 font-semibold">{colorSeleccionado}</span>
            </label>
            <div className="flex gap-3 flex-wrap">
                {coloresDisponibles.map((color) => (
                    <button
                        key={color.nombre}
                        onClick={() => onColorChange(color.nombre)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                            colorSeleccionado === color.nombre
                                ? "border-blue-600 ring-2 ring-blue-200"
                                : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color.valor }}
                        title={color.nombre}
                    >
                        {colorSeleccionado === color.nombre && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FiCheck
                                    className="w-5 h-5"
                                    style={{
                                        color: color.nombre === 'Blanco' ? '#000000' : '#FFFFFF'
                                    }}
                                />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SelectorColor;
