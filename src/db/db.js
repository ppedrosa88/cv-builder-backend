const { db } = require('./connection');

async function dbConnection() {
    try {
        await db.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { dbConnection }