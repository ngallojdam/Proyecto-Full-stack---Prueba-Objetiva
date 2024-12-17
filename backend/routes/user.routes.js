// backend/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateRegister } = require('../controllers/user.controller'); // Importa el middleware correctamente

// Ruta para registrar un usuario
router.post('/register', validateRegister, userController.registerUser);

// Ruta para hacer login
router.post('/login', userController.loginUser); // Usar el controlador correcto

module.exports = router;

