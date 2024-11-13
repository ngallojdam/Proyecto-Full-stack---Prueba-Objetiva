const express = require("express"); // importa la librería express
const cors = require("cors"); // Devolviendo el permiso CORS desde la API

var path = require('path'); // Se crea la carpeta backend/public/images y en el backend como carpeta publica 

const app = express(); // empezamos a usar express usando la constante app

// public directory
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions)); // Instalamos el paquete cors y editamos index.js para incluir el permiso para la URL del dominio de origen de nuestro servidor de desarrollo de Ionic

// parse requests of content-type - appplication/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlenconded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
// normal use. Doesn't delete the database data
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database
db.sequelize.sync({ }).then(() => {      // Usando .sync[{force:true}] borrará las tablas existentes y las creará de nuevo
    console.log("Drop and re-sync db.")             
})

// simple route
app.get("/", (req, res) => {                                // <= tenemos un end-point que escucha en http://localhost:8080/
    res.json({ message: "Welcome to animals application." }); // devolverá un mensaje en formato JSON
});

// Importamos las rutas en index.js
require("./routes/animal.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {                                // <= arrancamos la API puerto de escucha 8080
    console.log(`Server is running on port ${PORT}.`);
});