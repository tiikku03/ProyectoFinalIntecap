require('dotenv/config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rutasUsuario = require('./routes/rutasUsuarios.js');
const rutasResenas = require('./routes/rutasResenas.js');
const rutasWishlist = require('./routes/rutasWishlist.js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(cors());
app.use(express.json()); 

// para usar las rutas de usuario.js
app.use('/usuarios', rutasUsuario);

// para usar las rutas de resenas.js
app.use('/resenas', rutasResenas);

// para usar las rutas de wishlist.js
app.use('/wishlist', rutasWishlist);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
