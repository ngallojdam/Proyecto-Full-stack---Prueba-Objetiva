module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define("animal", {
        gender: {
            type: Sequelize.STRING
        },
        race: {
            type: Sequelize.STRING      // Creamos el modelo
        }
    });

    return Animal;
}