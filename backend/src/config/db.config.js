const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('jyang', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

testConnection();

module.exports = sequelize;