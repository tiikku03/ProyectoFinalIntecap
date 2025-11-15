/*

Recibir la petición (req).
Validar datos (directamente o con un middleware).
Llamar a los servicios/modelos para hacer la lógica de negocio.
Formar y enviar la respuesta JSON.
Manejar errores de forma estándar.


import * as nombreService from "../services/nombre.service.js";

export const accion = async (req, res) => {
  try {
    const data = await nombreService.accion(req.body);

    return res.status(200).json({
      success: true,
      message: "Acción realizada correctamente",
      data,
      error: null,
    });

  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
      error: err.code || "SERVER_ERROR",
      data: null,
    });
  }
};

*/