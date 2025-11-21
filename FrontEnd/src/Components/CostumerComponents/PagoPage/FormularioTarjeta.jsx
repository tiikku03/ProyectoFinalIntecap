import React, { useState } from "react";
import { FiShield } from "react-icons/fi";

function FormularioTarjeta({ onDatosChange, datosIniciales = {} }) {
    const [datos, setDatos] = useState({
        numeroTarjeta: datosIniciales.numeroTarjeta || "",
        nombreTarjeta: datosIniciales.nombreTarjeta || "",
        fechaExpiracion: datosIniciales.fechaExpiracion || "",
        cvv: datosIniciales.cvv || "",
    });

    const [errores, setErrores] = useState({});

    const formatearNumeroTarjeta = (valor) => {
        // Remover espacios y caracteres no numéricos
        const soloNumeros = valor.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        // Agregar espacios cada 4 dígitos
        const grupos = soloNumeros.match(/.{1,4}/g);
        return grupos ? grupos.join(" ") : "";
    };

    const formatearFechaExpiracion = (valor) => {
        // Remover caracteres no numéricos
        const soloNumeros = valor.replace(/[^0-9]/gi, "");
        // Agregar slash después de 2 dígitos
        if (soloNumeros.length >= 2) {
            return soloNumeros.slice(0, 2) + "/" + soloNumeros.slice(2, 4);
        }
        return soloNumeros;
    };

    const validarCampo = (nombre, valor) => {
        const nuevosErrores = { ...errores };

        switch (nombre) {
            case "numeroTarjeta":
                const soloNumeros = valor.replace(/\s+/g, "");
                if (!soloNumeros) {
                    nuevosErrores.numeroTarjeta = "El número de tarjeta es requerido";
                } else if (soloNumeros.length < 13 || soloNumeros.length > 19) {
                    nuevosErrores.numeroTarjeta = "Número de tarjeta inválido";
                } else {
                    delete nuevosErrores.numeroTarjeta;
                }
                break;

            case "nombreTarjeta":
                if (!valor.trim()) {
                    nuevosErrores.nombreTarjeta = "El nombre es requerido";
                } else if (valor.trim().length < 3) {
                    nuevosErrores.nombreTarjeta = "Nombre inválido";
                } else {
                    delete nuevosErrores.nombreTarjeta;
                }
                break;

            case "fechaExpiracion":
                const soloNumerosFecha = valor.replace(/[^0-9]/gi, "");
                if (!soloNumerosFecha) {
                    nuevosErrores.fechaExpiracion = "La fecha es requerida";
                } else if (soloNumerosFecha.length !== 4) {
                    nuevosErrores.fechaExpiracion = "Fecha inválida (MM/AA)";
                } else {
                    const mes = parseInt(soloNumerosFecha.slice(0, 2));
                    if (mes < 1 || mes > 12) {
                        nuevosErrores.fechaExpiracion = "Mes inválido";
                    } else {
                        delete nuevosErrores.fechaExpiracion;
                    }
                }
                break;

            case "cvv":
                if (!valor) {
                    nuevosErrores.cvv = "El CVV es requerido";
                } else if (valor.length < 3 || valor.length > 4) {
                    nuevosErrores.cvv = "CVV inválido";
                } else {
                    delete nuevosErrores.cvv;
                }
                break;

            default:
                break;
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Aplicar formateo según el campo
        if (name === "numeroTarjeta") {
            value = formatearNumeroTarjeta(value);
            if (value.replace(/\s+/g, "").length > 19) return; // Máximo 19 dígitos
        } else if (name === "fechaExpiracion") {
            value = formatearFechaExpiracion(value);
            if (value.replace(/[^0-9]/gi, "").length > 4) return; // Máximo 4 dígitos
        } else if (name === "cvv") {
            value = value.replace(/[^0-9]/gi, "");
            if (value.length > 4) return; // Máximo 4 dígitos
        } else if (name === "nombreTarjeta") {
            value = value.toUpperCase();
        }

        const nuevosDatos = { ...datos, [name]: value };
        setDatos(nuevosDatos);
        validarCampo(name, value);

        if (onDatosChange) {
            const esValido = validarCampo(name, value) && Object.keys(errores).length === 0;
            onDatosChange(nuevosDatos, esValido);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validarCampo(name, value);
    };

    return (
        <div className="space-y-4">
            {/* Número de Tarjeta */}
            <div>
                <label
                    htmlFor="numeroTarjeta"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Número de Tarjeta <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="numeroTarjeta"
                    name="numeroTarjeta"
                    value={datos.numeroTarjeta}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errores.numeroTarjeta
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errores.numeroTarjeta && (
                    <p className="mt-1 text-sm text-red-500">
                        {errores.numeroTarjeta}
                    </p>
                )}
            </div>

            {/* Nombre en la Tarjeta */}
            <div>
                <label
                    htmlFor="nombreTarjeta"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Nombre en la Tarjeta <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="nombreTarjeta"
                    name="nombreTarjeta"
                    value={datos.nombreTarjeta}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errores.nombreTarjeta
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errores.nombreTarjeta && (
                    <p className="mt-1 text-sm text-red-500">
                        {errores.nombreTarjeta}
                    </p>
                )}
            </div>

            {/* Fecha de Expiración y CVV */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="fechaExpiracion"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Fecha de Expiración <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="fechaExpiracion"
                        name="fechaExpiracion"
                        value={datos.fechaExpiracion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errores.fechaExpiracion
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                    />
                    {errores.fechaExpiracion && (
                        <p className="mt-1 text-sm text-red-500">
                            {errores.fechaExpiracion}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={datos.cvv}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errores.cvv
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                    />
                    {errores.cvv && (
                        <p className="mt-1 text-sm text-red-500">{errores.cvv}</p>
                    )}
                </div>
            </div>

            {/* Mensaje de seguridad */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                    <FiShield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-blue-900">
                            Pago 100% Seguro
                        </p>
                        <p className="text-xs text-blue-700">
                            Tu información está protegida con encriptación SSL de 256 bits.
                            No almacenamos datos de tu tarjeta.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioTarjeta;
