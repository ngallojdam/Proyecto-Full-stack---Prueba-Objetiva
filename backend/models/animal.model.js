module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define("animal", {
        gender: {
            type: Sequelize.STRING
        },
        race: {
            type: Sequelize.STRING      // Creamos el modelo
        },
        filename: {
            type: Sequelize.STRING      // El nombre dle fichero es lo único que se guardará en la BBDD. Para ello incluimos el campo filename
        }
    });

    return Animal;
}