require('dotenv/config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rutasUsuario = require('./routes/rutasUsuarios.js');
const rutasResenas = require('./routes/rutasResenas.js');
const rutasWishlist = require('./routes/rutasWishlist.js');
const rutasPedidos = require('./routes/rutasPedidos.js')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(cors());
app.use(express.json()); 

app.use('/usuarios', rutasUsuario);

app.use('/resenas', rutasResenas);

app.use('/pedidos', rutasPedidos)

app.use('/wishlist', rutasWishlist); 

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
