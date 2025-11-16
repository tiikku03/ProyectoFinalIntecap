/*

Responsabilidad: Validar datos que llegan del cliente (req.body, req.params, req.query).
        -> Validaciones de entrada
        -> Reglas estrictas
        -> Tipos y restricciones
        -> Schemas exportados


import { z } from "zod";

export const nombreSchema = z.object({
  campo1: z.string(),
  campo2: z.number().min(1),
  campo3: z.string().optional(),
});


*/