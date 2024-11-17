// index.js (Backend)
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const db = require('./models');
var path = require('path');

// Configuración de la carpeta pública para almacenar imágenes
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de CORS
const corsOptions = {
    origin: "*",
};
app.use(cors(corsOptions));

// Parseo de solicitudes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sincronización con la base de datos
db.sequelize.sync({ force: false }) // Cambia a false si no quieres eliminar las tablas
  .then(() => {
    console.log("Database synchronized (tables recreated)");
  })
  .catch((err) => {
    console.error("Failed to synchronize database:", err);
  });

// Rutas
const userRoutes = require('./routes/user.routes');
const animalRoutes = require('./routes/animal.routes');
app.use('/api/users', userRoutes); // Registrar las rutas de usuarios
app.use('/api/animals', animalRoutes); // Registrar las rutas de animales

// Ruta principal
app.get("/", (req, res) => {
    res.json({ message: "Welcome to animals application." });
});

// Configuración del puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error" });
});
