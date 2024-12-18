const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const userController = require('../controllers/user.controller');

// Middleware de validación
const { validateRegister } = require('../controllers/user.controller');

// Ruta para registrar un usuario
router.post('/register', validateRegister, userController.registerUser);

// Ruta para hacer login
router.post('/login', userController.loginUser);

// Ruta para obtener todos los usuarios
router.get("/", userController.findAll);

// Ruta para actualizar un usuario por ID
router.put("/:id", authenticateToken, userController.update);

// Ruta para eliminar un usuario por ID
router.delete("/:id", authenticateToken, userController.delete);

module.exports = router;
