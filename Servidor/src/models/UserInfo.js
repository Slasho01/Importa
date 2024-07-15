const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('UserInfo', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, { timestamps: false });
};
