// Creamos las rutas correspondientes a los end-points

module.exports = app => {
    const animals = require("../controllers/animal.controller.js");
    var upload = require('../multer/upload');

    var router = require("express").Router();

    // Create a new Animal
    router.post("/", upload.single('file'), animals.create);    // upload.single('file') se ejecuta después de recibir la petición de post del 
                                                                // frontend y antes de que el controlador cree un animal

    // Retrieve all Animals
    router.get("/", animals.findAll);

    // Retrieve a single Animal with id
    router.get("/:id", animals.findOne);

    // Update a Animal with id
    router.put("/:id", animals.update);

    // Delete a Animal with id
    router.delete("/:id", animals.delete);

    app.use('/api/animals', router);
};