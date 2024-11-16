const express = require("express"); // Importa la librería express
const bodyParser = require('body-parser'); // Importa body-parser para procesar datos de formulario
const cors = require("cors"); // Configuración de permisos CORS desde la API
const app = express(); // Inicializa la aplicación express
const db = require('./models'); // Importa los modelos definidos con Sequelize
var path = require('path'); // Importa path para trabajar con rutas de archivos

// Configuración de la carpeta pública para almacenar imágenes
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de CORS: Permitir solicitudes desde cualquier origen
const corsOptions = {
    origin: "*", // Cambiar "*" por una URL específica para mayor seguridad en producción
};
app.use(cors(corsOptions)); // Instalamos el paquete cors y editamos index.js para incluir el permiso para la URL del dominio de origen de nuestro servidor de desarrollo de Ionic

// Parseo de solicitudes de tipo application/json
app.use(express.json());

// Parseo de solicitudes de tipo aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true})); // Usar `bodyParser` si necesitas compatibilidad con datos codificados en formularios

// Sincronización con la base de datos
// Uso normal: Sin eliminar los datos existentes en las tablas
db.sequelize.sync();

// Desarrollo: Eliminar tablas existentes y volver a crearlas
    // db.sequelize.sync({ force:true }).then(() => {      // Usando .sync[{force:true}] borrará las tablas existentes y las creará de nuevo
        //console.log("Drop and re-sync db.")             
    //})

// Ruta principal: Punto de entrada de la API
app.get("/", (req, res) => {                                // <= tenemos un end-point que escucha en http://localhost:8080/
    res.json({ message: "Welcome to animals application." }); // devolverá un mensaje en formato JSON
});

// Importamos las rutas definidas para animales
require("./routes/animal.routes")(app);

// Configuración del puerto y puesta en marcha del servidor
const PORT = process.env.PORT || 8080; // Usa el puerto definido en las variables de entorno o el 8080 por defecto
app.listen(PORT, () => {                                
    console.log(`Server is running on port ${PORT}.`);
});