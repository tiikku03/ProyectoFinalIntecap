/*

Responsabilidad: Se ejecutan antes de entrar al controlador.
Se usan para validar datos, autenticar, verificar permisos, etc.
        -> Validaciones previas
        -> Autenticación
        -> Manejo de permisos
        -> Sanitización

        
export const nombreMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      message: "Token requerido",
      error: "NO_TOKEN",
      data: null,
    });
  }

  next(); // continuar al siguiente middleware o controlador
};


*/