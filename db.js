// const { Sequelize } = require('sequilize');
const DataStore = require('nedb');
const db = new DataStore({ filename: 'database', autoload: true });

module.exports.db;