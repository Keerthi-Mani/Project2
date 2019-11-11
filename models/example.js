module.exports = function (sequelize, DataTypes) {
  var Evasion = sequelize.define("evasion", {

    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    contact_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_relation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Evasion;
};