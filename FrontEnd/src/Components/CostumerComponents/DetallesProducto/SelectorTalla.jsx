import React from "react";

function SelectorTalla({ tallaSeleccionada, onTallaChange, producto }) {
    // Categorías que requieren selector de talla
    const categoriasConTalla = [
        'Ropa',
        'Deportes',
        'Ropa Deportiva',
        'Tenis',
        'Calzado'
    ];

    // Verificar si el producto pertenece a una categoría que requiere talla
    const requieredTalla = categoriasConTalla.some(cat =>
        producto?.categoria?.toLowerCase().includes(cat.toLowerCase()) ||
        producto?.subcategoria?.toLowerCase().includes(cat.toLowerCase())
    );

    if (!requieredTalla) {
        return null;
    }

    // Tallas disponibles según el tipo de producto
    const tallasDisponibles = ['S', 'M', 'L', 'XL'];

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Talla
            </label>
            <div className="flex gap-2 flex-wrap">
                {tallasDisponibles.map((talla) => (
                    <button
                        key={talla}
                        onClick={() => onTallaChange(talla)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                            tallaSeleccionada === talla
                                ? "border-blue-600 bg-blue-50 text-blue-600"
                                : "border-gray-300 hover:border-gray-400 text-gray-700"
                        }`}
                    >
                        {talla}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SelectorTalla;
