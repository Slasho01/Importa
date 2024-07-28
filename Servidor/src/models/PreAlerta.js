const { DataTypes } = require('sequelize');
const cuid = require('cuid');
module.exports = (sequelize) => {
  sequelize.define('PreAlerta', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => cuid(),
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    origen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    volumen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};
