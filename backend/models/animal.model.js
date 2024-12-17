module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define("animal", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        race: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return Animal;
};
