# Guía de Despliegue en Railway - Paso a Paso

Esta guía te ayudará a desplegar tu proyecto completo (Backend, Frontend y Base de datos MySQL) en Railway.

## Preparación Inicial

### 1. Crear cuenta en Railway
- Ve a [railway.app](https://railway.app)
- Haz clic en "Start a New Project"
- Inicia sesión con tu cuenta de GitHub (recomendado) o Email

### 2. Subir tu proyecto a GitHub (si aún no lo has hecho)
```bash
# Si no has inicializado git, hazlo ahora:
git init
git add .
git commit -m "Preparado para despliegue en Railway"

# Crea un repositorio en GitHub y luego:
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

## Parte 1: Desplegar la Base de Datos MySQL

### Paso 1: Crear el servicio de MySQL
1. En Railway, haz clic en "New Project"
2. Selecciona "Deploy MySQL"
3. Railway creará automáticamente una base de datos MySQL
4. Espera a que el servicio esté en estado "Active" (círculo verde)

### Paso 2: Obtener credenciales de la base de datos
1. Haz clic en el servicio MySQL que acabas de crear
2. Ve a la pestaña "Variables"
3. Verás las siguientes variables (Railway las crea automáticamente):
   - `MYSQL_URL` (esta es la que usaremos)
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

4. **IMPORTANTE**: Copia el valor de `MYSQL_URL` - lo necesitarás para el backend

## Parte 2: Desplegar el Backend

### Paso 3: Crear el servicio del Backend
1. En el mismo proyecto de Railway, haz clic en "New Service"
2. Selecciona "GitHub Repo"
3. Autoriza a Railway para acceder a tus repositorios
4. Selecciona tu repositorio del proyecto
5. Railway detectará automáticamente que es un proyecto Node.js

### Paso 4: Configurar el Root Directory del Backend
1. Haz clic en el servicio del Backend que acabas de crear
2. Ve a "Settings"
3. Busca la sección "Root Directory"
4. Cambia el valor a: `Backend`
5. Guarda los cambios

### Paso 5: Configurar variables de entorno del Backend
1. En el servicio del Backend, ve a la pestaña "Variables"
2. Haz clic en "New Variable" y agrega las siguientes:

```
DATABASE_URL = [pega aquí el MYSQL_URL que copiaste en el Paso 2]
PORT = 3000
NODE_ENV = production
```

3. **MUY IMPORTANTE**: Para conectar el backend con MySQL:
   - Haz clic en "Add Reference"
   - Selecciona el servicio MySQL
   - Esto creará automáticamente la variable `DATABASE_URL` con la referencia

### Paso 6: Configurar el comando de inicio
1. En "Settings" del servicio Backend
2. Busca "Custom Start Command"
3. Déjalo vacío (Railway usará automáticamente `npm start` de tu package.json)

### Paso 7: Deploy del Backend
1. Railway comenzará a desplegar automáticamente
2. Ve a la pestaña "Deployments" para ver el progreso
3. Espera a que veas "Success" (toma 2-5 minutos)
4. Una vez completado, ve a "Settings" y busca "Generate Domain"
5. Haz clic en "Generate Domain" para obtener una URL pública
6. **COPIA ESTA URL** - será algo como: `https://tu-proyecto-production.up.railway.app`

### Paso 8: Ejecutar migraciones de Prisma
1. En el servicio Backend, ve a la pestaña "Deployments"
2. La migración se ejecutará automáticamente con el script `build` que agregamos
3. Si necesitas ejecutar las migraciones manualmente:
   - Ve a la pestaña "Logs"
   - Verifica que las migraciones se hayan ejecutado correctamente

## Parte 3: Desplegar el Frontend

### Paso 9: Crear el servicio del Frontend
1. En el mismo proyecto de Railway, haz clic en "New Service"
2. Selecciona "GitHub Repo"
3. Selecciona el mismo repositorio (sí, el mismo)
4. Railway creará otro servicio

### Paso 10: Configurar el Root Directory del Frontend
1. Haz clic en el servicio del Frontend
2. Ve a "Settings"
3. Busca "Root Directory"
4. Cambia el valor a: `FrontEnd`
5. Guarda los cambios

### Paso 11: Configurar variables de entorno del Frontend
1. En el servicio del Frontend, ve a "Variables"
2. Haz clic en "New Variable" y agrega:

```
VITE_API_URL = [pega aquí la URL del Backend que copiaste en el Paso 7]
```

Ejemplo: `VITE_API_URL = https://tu-backend-production.up.railway.app`

### Paso 12: Configurar comandos de build
1. En "Settings" del servicio Frontend
2. Busca "Build Command" y déjalo en: `npm run build` (Railway lo detecta automáticamente)
3. Busca "Start Command" y cámbialo a: `npm run preview`

**ALTERNATIVA (Recomendada)**: Configurar con servidor estático:
1. Primero, necesitas agregar un servidor estático al frontend
2. Agrega `serve` como dependencia en el package.json del frontend (lo haré después)
3. Start Command: `npx serve -s dist -p $PORT`

### Paso 13: Deploy del Frontend
1. Railway comenzará a desplegar automáticamente
2. Espera a que veas "Success" en "Deployments"
3. Ve a "Settings" y haz clic en "Generate Domain"
4. Esta será la URL pública de tu aplicación
5. **GUARDA ESTA URL** - ¡es tu sitio web en vivo!

## Parte 4: Configurar CORS en el Backend

### Paso 14: Actualizar CORS para permitir tu frontend
1. Necesitamos actualizar el archivo `server.js` del backend
2. En tu código local, modifica la configuración de CORS:

```javascript
// En lugar de:
app.use(cors());

// Usa esto:
app.use(cors({
  origin: [
    'https://tu-frontend-production.up.railway.app', // URL de Railway
    'http://localhost:5173' // Para desarrollo local
  ],
  credentials: true
}));
```

3. Haz commit y push de los cambios
4. Railway detectará el cambio y redesplegará automáticamente

## Parte 5: Poblar la Base de Datos (Opcional)

Si necesitas agregar datos iniciales a tu base de datos:

### Opción 1: Desde tu computadora local
```bash
# Copia la DATABASE_URL de Railway
# Créala como variable de entorno temporal:
set DATABASE_URL=mysql://user:pass@host:port/db

# Ejecuta tus seeds o inserts
npx prisma db seed
```

### Opción 2: Usando un cliente MySQL
1. Usa las credenciales de Railway (MYSQL_HOST, MYSQL_USER, etc.)
2. Conéctate con MySQL Workbench o DBeaver
3. Ejecuta tus scripts SQL

## Verificación Final

### Checklist de Verificación:
- [ ] MySQL está en estado "Active" (verde) en Railway
- [ ] Backend está en estado "Active" y tiene un dominio generado
- [ ] Frontend está en estado "Active" y tiene un dominio generado
- [ ] Variables de entorno configuradas correctamente en Backend
- [ ] Variables de entorno configuradas correctamente en Frontend
- [ ] CORS configurado para permitir el dominio del frontend
- [ ] Migraciones de Prisma ejecutadas correctamente
- [ ] Puedes acceder a la URL del frontend y ver tu aplicación

### Probar tu aplicación:
1. Abre la URL del frontend en tu navegador
2. Intenta registrarte o iniciar sesión
3. Verifica que los productos se carguen correctamente
4. Prueba agregar productos al carrito
5. Revisa los logs en Railway si algo no funciona

## Solución de Problemas Comunes

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` esté configurada en el Backend
- Asegúrate de usar la referencia al servicio MySQL

### Error: "Failed to fetch" en el Frontend
- Verifica que `VITE_API_URL` apunte a la URL correcta del Backend
- Asegúrate de que CORS esté configurado correctamente

### Migraciones no se ejecutan
- Ve a "Deployments" > "Logs" del Backend
- Busca errores relacionados con Prisma
- Verifica que `prisma` esté en dependencies (no solo devDependencies)

### La aplicación no carga
- Revisa los logs en la pestaña "Logs" de cada servicio
- Verifica que los dominios estén generados
- Asegúrate de que todos los servicios estén en "Active"

## Costos y Límites

Railway ofrece:
- **Plan Hobby**: $5 de crédito gratis mensual
- El uso se calcula por hora de ejecución
- Aproximadamente 500 horas de servicio pequeño por mes
- Para producción seria, considera el plan Pro ($20/mes)

## Próximos Pasos

Una vez desplegado:
1. Configura un dominio personalizado (opcional)
2. Configura variables de entorno de producción (claves secretas, etc.)
3. Monitorea el uso en el dashboard de Railway
4. Configura alertas y notificaciones

## Comandos Útiles

### Ver logs en tiempo real:
En Railway, ve a la pestaña "Logs" de cada servicio

### Redesplegar manualmente:
En "Deployments", haz clic en los tres puntos y selecciona "Redeploy"

### Rollback a una versión anterior:
En "Deployments", selecciona un deployment anterior y haz clic en "Redeploy"

---

¡Listo! Tu aplicación ahora está en vivo en Railway. 🎉

**URLs de tu proyecto:**
- Backend API: https://[tu-backend].up.railway.app
- Frontend Web: https://[tu-frontend].up.railway.app
- MySQL: Conectado internamente en Railway
