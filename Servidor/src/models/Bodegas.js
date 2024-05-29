const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Bodega', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};