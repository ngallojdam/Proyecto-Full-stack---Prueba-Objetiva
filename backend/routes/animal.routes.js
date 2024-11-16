module.exports = (app) => {
    const express = require("express");
    const router = express.Router();
    const animals = require("../controllers/animal.controller.js");
    
    const upload = require('../multer/upload');  // Middleware para el manejo de archivos
    const auth = require("../controllers/auth.js");
  
    // Create a new Animal
    router.post("/", upload.single('file'), animals.create); // Usando upload.single para manejar la imagen
  
    // Retrieve all Animals
    router.get("/", animals.findAll);
  
    // Retrieve a single Animal with id
    router.get("/:id", animals.findOne);
  
    // Update a Animal with id
    router.put("/:id", upload.single('file'), animals.update); // También en PUT, se usa 'upload.single'
  
    // Delete a Animal with id
    router.delete("/:id", animals.delete);
  
    app.use('/api/animals', router);
  };
  