const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

router.post("/usuarios", usuarioController.create);
router.get("/usuarios", usuarioController.getAll);

module.exports = router; 