// Creamos las rutas correspondientes a los end-points

module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const animals = require("../controllers/animal.controller.js");
    
    if (!animals || typeof animals.findAll !== 'function') {
        throw new Error('El controlador de animales no está definido correctamente.');
    }

    console.log(animals); 

    // Retrieve all Animals
    router.get("/", animals.findAll);

    // Create a new Animal
    router.post("/", animals.create);

    // Retrieve a single Animal with id
    router.get("/:id", animals.findOne);    
   
    // Update a Animal with id
    router.put("/:id", animals.update);

    // Delete a Animal with id
    router.delete("/:id", animals.delete);

    app.use('/api/animals', router);
};