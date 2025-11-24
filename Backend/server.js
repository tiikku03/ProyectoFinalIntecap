require("dotenv/config");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rutasUsuario = require("./routes/rutasUsuarios.js");
const rutasResenas = require("./routes/rutasResenas.js");
const rutasWishlist = require("./routes/rutasWishlist.js");
const rutasProductos = require("./routes/rutasProductos.js");
const rutasPedidos = require("./routes/rutasPedidos.js");
const rutasPagos = require("./routes/rutasPagos.js");
const rutasCarrito = require("./routes/rutasCarrito.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

/*
https://proyectofinalintecap-production.up.railway.app/
https://proyectofinal-backend-production-f665.up.railway.app//productos/leerproductos?page=1
https://proyectofinal-backend-production-f665.up.railway.app//usuarios/crearusuario
*/

app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}));


app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
}));


app.use(express.json());

app.use("/usuarios", rutasUsuario);

app.use("/resenas", rutasResenas);

app.use("/pedidos", rutasPedidos);

app.use("/wishlist", rutasWishlist);

app.use("/carrito", rutasCarrito);

app.use("/productos", rutasProductos);

app.use("/pagos", rutasPagos);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
