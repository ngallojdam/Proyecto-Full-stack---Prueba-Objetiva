const db = require("../models");
const Animal = db.animals;          // Creamos el controlador
const Op = db.Sequelize.Op;

// Create and Save a new Animal
exports.create = async (req, res) => {
    // Validate request         // Creamos el detalle del controlador para crear un animal
    if (!req.body.gender || !req.body.race) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Animal
    const animal = {
        gender: req.body.gender,
        race: req.body.race,
        createdAt: req.body.createdAt || new Date(),
        updatedAt: req.body.updatedAt || new Date(),
        filename: req.file ? req.file.filename : ""     // Sólo se modifica esta línea es para guardar en la BBDD el nombre que tendrá el fichero 
                                                        // de imagen subido
    };

    try {
        // Save Animal in the database
        const data = await Animal.create(animal);
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the animal."
        });
    }
};
      
// Retrieve all Animals from the database
exports.findAll = async (req, res) => {       // Creamos el detalle del controlador para mostrar todas las bicicletas
    try {
        const animal = await Animal.findAll();
        res.status(200).send(animals);
        }catch(err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving animals."
            });
        }
};

// Find a single Animal with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const animal = await Animal.findByPk(id);
        if (!animal) {
            return res.status(404).send({
                message: `Cannot find Animal with id=${id}.`
            });
        }
        res.send(animal);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Animal with id=" + id
        });
    }
};

// Update a Animal by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const num = await Animal.update(req.body, { where: { id } });
        if (num === 1) {
            res.send({ message: "Animal was updated successfully." });
        } else {
            res.send({
                message: `Cannot update Animal with id=${id}. Maybe Animal was not found or req.body is empty!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Animal with id=" + id
        });
    }
};

/// Delete a Animal with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const num = await Animal.destroy({ where: { id } });
        if (num === 1) {
            res.send({ message: "Animal was deleted successfully!" });
        } else {
            res.send({
                message: `Cannot delete Animal with id=${id}. Maybe Animal was not found!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Animal with id=" + id
        });
    }
};
