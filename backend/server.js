require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const userRoutes = require("./routes/user.routes");
const animalRoutes = require("./routes/animal.routes");

// Configuración CORS para permitir solicitudes solo desde orígenes específicos
const corsOptions = {
  origin: ['http://localhost:8100', 'http://another-origin.com'],
};
app.use(cors(corsOptions));

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para usuarios y animales
app.use('/api/users', userRoutes);
app.use('/api/animals', animalRoutes);

// Conexión a la base de datos con Sequelize
const db = require("./models");
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Failed to synchronize database:", err);
  });

// Middleware de autenticación JWT (general)
app.use(function (req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  // Verificación de JWT
  const jwtToken = token.replace('Bearer ', '');
  jwt.verify(jwtToken, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    } else {
      req.user = user;
      req.token = jwtToken;
      next();
    }
  });
});

// Ruta para crear un animal (requiere token JWT)
app.post('/api/animals/create', (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { gender, race } = req.body;
    if (!gender || !race) {
      return res.status(400).json({ error: 'Gender and race are required' });
    }

    db.animal.create({ gender, race })
      .then(animal => {
        res.status(201).json({
          message: 'Animal created successfully',
          animal: animal
        });
      })
      .catch(error => {
        console.error('Error creating animal:', error);
        res.status(500).json({ error: 'Error creating animal' });
      });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server started on: ${port}`);
});
