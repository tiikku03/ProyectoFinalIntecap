# Historial de Pedidos - Documentación

## Descripción
Sistema completo para que cada usuario pueda ver y gestionar su historial de pedidos personalizado.

## Componentes

### 1. TarjetaPedido.jsx
Muestra la información resumida de cada pedido individual.

**Props:**
- `pedido` (Object): Objeto con la información del pedido

**Características:**
- Número de pedido formateado (ORD-12345678)
- Estado con colores distintivos
- Fecha del pedido
- Dirección de envío
- Método de pago
- Total del pedido
- Botón "Ver Detalles" que redirige a la página de confirmación

### 2. ListaPedidos.jsx
Renderiza la lista completa de pedidos del usuario.

**Props:**
- `pedidos` (Array): Array de objetos de pedidos
- `cargando` (Boolean): Estado de carga
- `error` (String): Mensaje de error si hay algún problema

**Estados:**
- Loading: Muestra spinner de carga
- Error: Muestra mensaje de error
- Sin pedidos: Muestra mensaje motivacional
- Con pedidos: Renderiza las tarjetas de pedidos

### 3. FiltrosPedidos.jsx
Permite filtrar pedidos por estado.

**Props:**
- `estadoSeleccionado` (String): Estado actualmente seleccionado
- `onCambiarEstado` (Function): Callback para cambiar el estado

**Filtros disponibles:**
- Todos
- Pendiente (amarillo)
- Procesando (azul)
- Enviado (morado)
- Entregado (verde)
- Cancelado (rojo)

## Página Principal

### HistorialPedidos.jsx
Página principal que integra todos los componentes.

**Funcionalidades:**
- Autenticación requerida (redirige a /login si no está autenticado)
- Carga automática de pedidos del usuario autenticado
- Estadísticas rápidas (Total, Pendientes, Entregados)
- Filtrado dinámico por estado
- Manejo de errores

**URL de acceso:** `/historial-pedidos`

## API Backend

### Endpoint: GET /api/pedidos/usuario/:idUsuario

**Descripción:** Obtiene todos los pedidos de un usuario específico

**Parámetros:**
- `idUsuario` (path param): ID del usuario
- `estado` (query param, opcional): Filtrar por estado específico

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Pedidos del usuario obtenidos correctamente",
  "data": {
    "pedidos": [...],
    "total": 5
  }
}
```

**Características:**
- Filtra por ID de usuario automáticamente
- Incluye detalles de productos en cada pedido
- Ordenados por fecha descendente (más recientes primero)
- Soporte para filtrado por estado

## Seguridad

- Solo usuarios autenticados pueden acceder
- Cada usuario solo ve sus propios pedidos
- Validación de usuario en el backend mediante ID

## Uso

1. El usuario inicia sesión
2. Navega a "Mis Pedidos" desde el menú de usuario
3. Ve sus pedidos con estadísticas
4. Puede filtrar por estado
5. Puede ver detalles de cada pedido

## Integración con el sistema

- Usa el contexto de autenticación (`useAuth`)
- Se integra con la página de confirmación para ver detalles
- Enlazado desde el menú de usuario (UserModal)
