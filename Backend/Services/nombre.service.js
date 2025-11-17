/*
Responsabilidad: Toda la lógica de negocio. Aquí van consultas DB,
-> validaciones, cálculos, integraciones, JWT, etc.
-> Lógica de negocio
-> Consultas a base de datos
-> Creación de tokens
-> Validaciones internas
-> Manejo de errores con


import { db } from "../db/connection.js"; // Prisma / Mongoose / MySQL
import { createToken } from "../utils/jwt.js";

export const accion = async (data) => {
  const registro = await db.modelo.findUnique({
    where: { id: data.id },
  });

  if (!registro) {
    throw {
      status: 404,
      message: "Registro no encontrado",
      code: "NOT_FOUND",
    };
  }

  // Lógica de negocio
  const token = createToken({ id: registro.id });

  return { registro, token };
};
*/
