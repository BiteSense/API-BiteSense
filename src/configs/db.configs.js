const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DB_NAME || "bitesense-db", process.env.DB_USER || "root", process.env.DB_PASS || "", {
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
});

module.exports = db;
