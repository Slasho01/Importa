const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
  native: false,
});

const modelDefiners = [];

// Función recursiva para leer modelos en carpetas y subcarpetas
const readModels = (folderPath) => {
  fs.readdirSync(folderPath)
    .forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // Si es una carpeta, llamamos recursivamente a la función para leer modelos en esa carpeta
        readModels(filePath);
      } else if (file.slice(-3) === '.js') {
        // Si es un archivo JavaScript en la carpeta, lo agregamos a los modelDefiners
        modelDefiners.push(require(filePath));
      }
    });
};

// Llamamos a la función inicialmente con la ruta de la carpeta 'models'
readModels(path.join(__dirname, '/models'));

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Log de los modelos cargados
console.log(sequelize.models);

// Destructuring de los modelos
const { Users, ClientInfo, Rol, /*Sessions,*/ Empresa, Bodega, FacturacionData, PreAlerta } = sequelize.models;
// Aca vendrian las relaciones
// En tu modelo de Users
Users.hasOne(ClientInfo, { foreignKey: 'userId' });
// En tu modelo de ClientInfo
ClientInfo.belongsTo(Users, { foreignKey: 'userId' });
// En tu modelo de Users
Users.hasOne(FacturacionData, { foreignKey: 'userId' });
// En tu modelo de FacturacionData
FacturacionData.belongsTo(Users, { foreignKey: 'userId' });
// En tu modelo de Users
Users.hasMany(PreAlerta, { foreignKey: 'userId' });
// En tu modelo de PreAlerta
PreAlerta.belongsTo(Users, { foreignKey: 'userId' });
// En tu modelo de Rol
Rol.hasMany(Users, { foreignKey: 'roleId' });
// En tu modelo de Users
Users.belongsTo(Rol, { foreignKey: 'roleId' });
// En tu modelo de Users
/*Users.hasMany(Sessions, { foreignKey: 'userId' });
// En tu modelo de Sessions
Sessions.belongsTo(Users, { foreignKey: 'userId' });*/
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./DataBase.js');
}