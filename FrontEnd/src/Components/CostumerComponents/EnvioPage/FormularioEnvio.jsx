import React, { useState } from "react";

function FormularioEnvio({ onDatosChange, datosIniciales = {} }) {
    const [datos, setDatos] = useState({
        nombre: datosIniciales.nombre || "",
        apellido: datosIniciales.apellido || "",
        correo: datosIniciales.correo || "",
        telefono: datosIniciales.telefono || "",
        direccion: datosIniciales.direccion || "",
        departamento: datosIniciales.departamento || "",
        codigoPostal: datosIniciales.codigoPostal || "",
        pais: datosIniciales.pais || "Guatemala"
    });

    const [errores, setErrores] = useState({});

    const validarCampo = (nombre, valor) => {
        const nuevosErrores = { ...errores };

        switch (nombre) {
            case "nombre":
            case "apellido":
                if (!valor.trim()) {
                    nuevosErrores[nombre] = `El ${nombre} es requerido`;
                } else {
                    delete nuevosErrores[nombre];
                }
                break;
            case "correo":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!valor.trim()) {
                    nuevosErrores.correo = "El correo es requerido";
                } else if (!emailRegex.test(valor)) {
                    nuevosErrores.correo = "Correo electrónico inválido";
                } else {
                    delete nuevosErrores.correo;
                }
                break;
            case "telefono":
                if (!valor.trim()) {
                    nuevosErrores.telefono = "El teléfono es requerido";
                } else if (valor.length < 8) {
                    nuevosErrores.telefono = "Teléfono inválido";
                } else {
                    delete nuevosErrores.telefono;
                }
                break;
            case "direccion":
                if (!valor.trim()) {
                    nuevosErrores.direccion = "La dirección es requerida";
                } else {
                    delete nuevosErrores.direccion;
                }
                break;
            case "departamento":
                if (!valor.trim()) {
                    nuevosErrores.departamento = "El departamento es requerido";
                } else {
                    delete nuevosErrores.departamento;
                }
                break;
            case "codigoPostal":
                if (!valor.trim()) {
                    nuevosErrores.codigoPostal = "El código postal es requerido";
                } else {
                    delete nuevosErrores.codigoPostal;
                }
                break;
            case "pais":
                if (!valor.trim()) {
                    nuevosErrores.pais = "El país es requerido";
                } else {
                    delete nuevosErrores.pais;
                }
                break;
            default:
                break;
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nuevosDatos = { ...datos, [name]: value };
        setDatos(nuevosDatos);
        validarCampo(name, value);

        if (onDatosChange) {
            onDatosChange(nuevosDatos, Object.keys(errores).length === 0);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validarCampo(name, value);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    1
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                    Información de Envío
                </h2>
            </div>

            <form className="space-y-4">
                {/* Nombre y Apellido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="nombre"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={datos.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                errores.nombre
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }`}
                            placeholder="Ingresa tu nombre"
                        />
                        {errores.nombre && (
                            <p className="mt-1 text-sm text-red-500">
                                {errores.nombre}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="apellido"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Apellido <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={datos.apellido}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                errores.apellido
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }`}
                            placeholder="Ingresa tu apellido"
                        />
                        {errores.apellido && (
                            <p className="mt-1 text-sm text-red-500">
                                {errores.apellido}
                            </p>
                        )}
                    </div>
                </div>

                {/* Correo Electrónico */}
                <div>
                    <label
                        htmlFor="correo"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Correo Electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={datos.correo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errores.correo
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                    />
                    {errores.correo && (
                        <p className="mt-1 text-sm text-red-500">
                            {errores.correo}
                        </p>
                    )}
                </div>

                {/* Teléfono */}
                <div>
                    <label
                        htmlFor="telefono"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={datos.telefono}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errores.telefono
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                    />
                    {errores.telefono && (
                        <p className="mt-1 text-sm text-red-500">
                            {errores.telefono}
                        </p>
                    )}
                </div>

                {/* Dirección */}
                <div>
                    <label
                        htmlFor="direccion"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Dirección <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={datos.direccion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errores.direccion
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Calle, número, colonia"
                    />
                    {errores.direccion && (
                        <p className="mt-1 text-sm text-red-500">
                            {errores.direccion}
                        </p>
                    )}
                </div>

                {/* Departamento/Estado */}
                <div>
                    <label
                        htmlFor="departamento"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Departamento/Estado <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="departamento"
                        name="departamento"
                        value={datos.departamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errores.departamento
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                    />
                    {errores.departamento && (
                        <p className="mt-1 text-sm text-red-500">
                            {errores.departamento}
                        </p>
                    )}
                </div>

                {/* Código Postal y País */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="codigoPostal"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Código Postal <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="codigoPostal"
                            name="codigoPostal"
                            value={datos.codigoPostal}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                errores.codigoPostal
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }`}
                            placeholder="00000"
                        />
                        {errores.codigoPostal && (
                            <p className="mt-1 text-sm text-red-500">
                                {errores.codigoPostal}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="pais"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            País <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="pais"
                            name="pais"
                            value={datos.pais}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                errores.pais
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }`}
                        >
                            <option value="Guatemala">Guatemala</option>
                            <option value="México">México</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Panamá">Panamá</option>
                        </select>
                        {errores.pais && (
                            <p className="mt-1 text-sm text-red-500">
                                {errores.pais}
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormularioEnvio;
