const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js')
require('./DataBase.js'); // Importa solo la inicialización de la base de datos

const server = express();

server.name = 'API';

// Configuración de CORS
server.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true,
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}));

// Configuración de express.json() en lugar de bodyParser
server.use(express.json({ limit: '50mb' }));

server.use(cookieParser());
server.use(morgan('dev'));

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;