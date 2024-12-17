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
exports.findOne = (req, res) => { /* lógica */ };

// Actualizar un animal
exports.update = (req, res) => { /* lógica */ };

// Eliminar un animal
exports.delete = (req, res) => { /* lógica */ };
