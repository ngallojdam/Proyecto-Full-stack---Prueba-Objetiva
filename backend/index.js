// backend/index.js
require('dotenv').config();

const express = require("express"); // Importa la librería express
const app = express(); // Creamos la aplicación de Express
const cors = require("cors"); // Para habilitar CORS
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes"); // Importamos las rutas de usuario
const authRoutes = require("./routes/auth.routes"); // Importa las rutas de autenticación

// Opciones de CORS para permitir la solicitud desde Ionic
//var corsOptions = {
 // origin: "http://localhost:8100",
//};
//app.use(cors(corsOptions)); // Aplicamos las opciones de CORS para permitir solicitudes desde Ionic

// Usar CORS para habilitar solicitudes desde cualquier origen
app.use(cors());

// Middleware para parsear las solicitudes en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión con la base de datos usando Sequelize
const db = require("./models");

// Sincronizamos la base de datos
db.sequelize
  .sync() // Sincroniza las tablas (no elimina los datos)
  .then(() => {
    console.log("Base de datos sincronizada.");
  })
  .catch((err) => {
    console.log("Error al sincronizar la base de datos: " + err.message);
  });

  

// Rutas de bienvenida y de usuarios
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación." });
});

// Rutas de autenticación
app.use("/api", authRoutes);  // Ruta para el login

// Rutas de usuarios
app.use("/api/users", userRoutes);

// Manejador de errores genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Ha ocurrido un error en el servidor." });
});

// Establecemos el puerto y escuchamos las solicitudes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});

// Importamos las rutas de animales
require("./routes/animal.routes")(app);