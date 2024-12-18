// backend/models/user.model.js
const bcrypt = require('bcrypt');  // Asegúrate de importar bcrypt

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  // Método de gancho (hook) para encriptar la contraseña antes de crear un nuevo usuario
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10); // Genera un 'salt' para la encriptación
    user.password = await bcrypt.hash(user.password, salt);  // Encripta la contraseña
  });

  // Método de instancia para comparar la contraseña
  User.prototype.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);  // Compara la contraseña proporcionada con la guardada
  };

  return User;
};
