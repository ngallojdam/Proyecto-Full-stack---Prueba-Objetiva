const db = require("../models");
const Animal = db.animal;          // Creamos el controlador
const Op = db.Sequelize.Op;

// Create and Save a new Animal
exports.create = (req, res) => {
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

    // Save Animal in the database
    Animal.create(animal).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the animal."
            })
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
    const id = req.params.id;

    Animal.findByPk(id) // Usamos findByPk para buscar por ID
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot find Animal with id=${id}.`
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Animal with id=" + id
            });
        });
};

// Update a Animal by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Animal.update(req.body, { where: { id: id } }) // Actualiza el animal según el ID
        .then(num => {
            if (num[0] === 1) {
                res.send({
                    message: "Animal was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Animal with id=${id}. Maybe Animal was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Animal with id=" + id
            });
        });
};


/// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Animal.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num === 1) {
            res.send({
                message: "Animal was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Animal with id=${id}. Maybe Animal was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Animal with id=" + id
        });
    });
};
