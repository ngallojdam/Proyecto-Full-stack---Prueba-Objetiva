// backend/controllers/user.controller.js
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Registrar usuario
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'your_secret_key', { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Error during login: ", error); // Aquí puedes ver el error específico
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
};

// Middleware de validación
const validateRegister = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Obtener todos los usuarios
const findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios.' });
  }
};

// Actualizar un usuario
const update = async (req, res) => {
  try {
    const user = await User.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Usuario actualizado correctamente.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario.' });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
};

// Exportar funciones
module.exports = { 
  registerUser, 
  loginUser, 
  validateRegister,
  findAll, 
  update, 
  delete: deleteUser
};
