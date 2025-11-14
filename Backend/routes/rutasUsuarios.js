const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();

router.use(express.json());

router.post("/crearusuario", async (req, res) => {
  try {
    //recibiendo informacion del nuevo usuario
    const { nombre, apellido, correo, contraseña } = req.body;

    if (!nombre || !apellido || !correo || !contraseña) {
      return res.status(400).send("Faltan datos obligatorios");
    }

    //validar si ya existe el correo
    let localizandoUsuario = await prisma.usuarios.findUnique({
      where: { email: correo },
    });
    console.log(localizandoUsuario);

    if (localizandoUsuario) {
      return res.status(400).send("El correo ya esta registrado");
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // creando el  nuevo usuario
    await prisma.usuarios.create({
      data: {
        nombre: nombre,
        apellido: apellido,
        email: correo,
        contrase_a: hashedPassword,
      },
    });

    res.send("Usuario creado correctamente");
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).send("Error interno del servidor al crear el usuario.");
  }
});

// ===================================================================
// AUTORIZAR USUARIO
// ===================================================================

router.post("/autorizarusuario", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) {
      return res.status(400).send("Faltan datos obligatorios");
    }
    let usuario = await prisma.usuarios.findFirst({
      where: { email: correo },
    });
    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }
    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contrase_a);

    if (!isPasswordValid) {
      return res.status(401).send("Contraseña incorrecta");
    }

    return res.status(200).json({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.email,
    });
  } catch (error) {
    console.error("Error al autorizar usuario:", error);
    res.status(500).send("Error interno del servidor al autorizar el usuario.");
  }
});


// ===================================================================
// ELIMINAR USUARIO
// ===================================================================

router.delete("/eliminarusuario/:id", async (req, res) => {
  const idUsuario = parseInt(req.params.id);

  try {
    await prisma.usuarios.delete({
      where: {
        id_usuario: idUsuario,
      },
    });

    res.status(200).json({ message: `Usuario con ID ${idUsuario} eliminado correctamente.` });
  } catch(error){
    res.status(500).json({ error: "Error interno del servidor al eliminar el usuario." });
  }
});




module.exports = router;
