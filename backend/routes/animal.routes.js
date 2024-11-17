const express = require("express");
const router = express.Router();
const animalsController = require("../controllers/animal.controller.js");
const upload = require('../multer/upload');  // Middleware para el manejo de archivos
const authController = require("../controllers/auth.js");

// Crear un nuevo animal
router.post("/", upload.single('file'), animalsController.create);

// Obtener todos los animales
router.get("/", animalsController.findAll);

// Obtener un animal por ID
router.get("/:id", animalsController.findOne);

// Actualizar un animal por ID
router.put("/:id", upload.single('file'), animalsController.update);

// Eliminar un animal por ID
router.delete("/:id", animalsController.delete);

module.exports = router;

/*const express = require('express');
const router = express.Router();
const upload = require('../multer/upload'); // Asegúrate de que la ruta es correcta
const authController = require("../controllers/auth");

// Ruta para cargar el archivo de imagen
router.post("/", upload.single('file'), async (req, res) => {
    try {
        // Si la carga fue exitosa, procesamos la información del animal
        const newAnimal = new Animal({
            name: req.body.name,
            species: req.body.species,
            imageUrl: `/images/${req.file.filename}`, // La URL del archivo cargado
        });

        // Guardamos el nuevo animal en la base de datos
        await newAnimal.save();

        res.status(200).send({ message: 'Animal creado exitosamente', animal: newAnimal });
    } catch (error) {
        // Manejo de errores: si el error es de Multer (por tamaño de archivo o tipo no permitido)
        console.error(error);
        if (error instanceof multer.MulterError) {
            // Errores específicos de Multer
            return res.status(400).send({ error: error.message });
        } else if (error.message.includes('Tipo de archivo no válido')) {
            // Errores de tipo de archivo
            return res.status(400).send({ error: error.message });
        } else {
            // Otro tipo de error
            return res.status(500).send({ error: 'Hubo un error al procesar la solicitud' });
        }
    }
});

module.exports = router;*/

