const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

let dbName = process.env.DB_NAME;
let dbUser = process.env.DB_USER;
let dbPass = process.env.DB_PASS;
let dbHost = process.env.DB_HOST;

const db = new Sequelize(dbName, dbUser, dbPass, {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = { db };