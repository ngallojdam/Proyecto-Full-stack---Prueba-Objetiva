const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const authController = require("../controllers/auth.js");

// Crear un nuevo usuario
router.post("/", userController.create);

// Obtener todos los usuarios
router.get("/", userController.findAll);

// Obtener un usuario por ID
router.get("/:id", userController.findOne);

// Actualizar un usuario por ID
router.put("/:id", userController.update);

// Iniciar sesión de usuario (autenticación)
router.post("/signin", authController.signin);

module.exports = router;
