const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false // unless you like the logs
});

module.exports = db;