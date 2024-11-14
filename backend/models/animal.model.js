module.exports = (sequelize, DataTypes) => {
    const Animal = sequelize.define("Animal", {
      name: {
        type: DataTypes.STRING,
      },
      
    });
    return Animal;
  };
  