const db = require("../models");
const Animal = db.Animal; // Asegúrate de usar "Animal" como está definido en models/index.js
const Op = db.Sequelize.Op;

// Obtener todos los animales
exports.findAll = (req, res) => {
    Animal.findAll()
        .then(data => {
            res.send(data);
})
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving animals."
            });
        });
};

// Crear un nuevo animal
exports.create = (req, res) => {
    if (!req.body.gender || !req.body.race) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const animal = {
        gender: req.body.gender,
        race: req.body.race,
        createdAt: req.body.createdAt || new Date(),
        updatedAt: req.body.updatedAt || new Date()
    };

    Animal.create(animal)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the animal."
            });
        });
};

// Obtener un animal por ID
//exports.findOne = (req, res) => { /* lógica */ };
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

// Actualizar un animal
//exports.update = (req, res) => { /* lógica */ };
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

// Eliminar un animal
//exports.delete = (req, res) => { /* lógica */ };
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
