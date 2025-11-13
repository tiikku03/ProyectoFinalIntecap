const express = remquire('express');
const router = express.Router();
const jsonParser = express.json();

router.use(jsonParser);


router.post("/crearUsuario", (req, res) => {
    const nuevoUsuario = req.body;
    
});

module.exports = router;