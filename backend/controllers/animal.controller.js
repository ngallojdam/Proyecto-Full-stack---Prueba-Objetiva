const db = require("../models");
const Animal = db.animals;          // Creamos el controlador
const Op = db.Sequelize.Op;

// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request         // Creamos el detalle del controlador para crear un animal
    if (!req.body.gender || !req.body.race) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Animal
    const animal = {
        gender: req.body.gender,
        race: req.body.race,
        createdAt: req.body.createdAt || new Date(),
        updatedAt: req.body.updatedAt || new Date()
    };

    // Save Animal in the database
    Animal.create(animal)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the animal."
            });
        });
};

// Retrieve all Animals from the database
exports.findAll = (req, res) => {       // Creamos el detalle del controlador para mostrar todas las bicicletas
    Animal.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving animals."
            });
        });
};

// Find a single Animal with an id
exports.findOne = (req, res) => {
}

// Update a Animal by the id in the request
exports.update = (req, res) => {
};

// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
};