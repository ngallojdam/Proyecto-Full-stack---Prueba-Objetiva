// routes/auth.routes.js
const jwt = require('jsonwebtoken');  // Usaremos JWT para generar un token
const bcrypt = require('bcrypt');  // Para comparar las contraseñas hasheadas
//const User = require('../models/user.model');  // Asegúrate de que la ruta es correcta
const express = require('express');
const router = express.Router();


const { User } = require('../models'); // Asegúrate de tener el modelo User
//const User = require('../models/user.model');  // Asegúrate de importar el modelo de usuario


// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar el usuario por su correo en la base de datos
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // 2. Comparar la contraseña ingresada con el hash almacenado
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // 3. Generar el token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'miClaveSecreta', // Asegúrate de definir `JWT_SECRET` en .env
      { expiresIn: '1h' }
    );

    // 4. Respuesta exitosa con el token
    return res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    console.error("Error en el login:", err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;

// Ruta para iniciar sesión

/* router.post('/login', async (req, res) => {
    const { email, password } = req.body; 

    if (!email || !password) {
        return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
      }
  
    try {
      // Buscar al usuario por email
      const user = await User.findOne({ where: { email } });
      
      // Verificar si el usuario existe
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Verificar la contraseña
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }
  
      // Crear un token JWT (asegúrate de tener una clave secreta en tu .env)
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Responder con el token
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  module.exports = router; */

/* // Ruta para el login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por su correo electrónico
    const user = await User.findOne({ where: { email: email } });

    // Si no se encuentra el usuario
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comparar la contraseña recibida con la contraseña almacenada (usando bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Si las credenciales son válidas, generar un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Enviar el token como respuesta
    return res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al procesar el login' });
  }
});

module.exports = router;
 */