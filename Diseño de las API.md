/api
 ├── /users
 │     ├── GET /users               → Obtener lista de usuarios
 │     ├── GET /users/:id           → Obtener usuario por ID
 │     ├── POST /users              → Crear un nuevo usuario
 │     ├── PUT /users/:id           → Actualizar datos del usuario
 │     └── DELETE /users/:id        → Eliminar un usuario
 │
 └── /sales
       ├── GET /sales               → Obtener todas las ventas
       ├── GET /sales/:id           → Obtener una venta específica
       ├── POST /sales              → Registrar una nueva venta
       └── GET /sales/user/:userId  → Ventas hechas por un usuario


