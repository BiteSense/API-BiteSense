const { Sequelize } = require("sequelize");

const db = new Sequelize("bitesense-db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
