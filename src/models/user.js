const { DataTypes } = require("sequelize");
const { db } = require("../db/connection");



const User = db.define('users', {
    name: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    linkedin: {
        type: DataTypes.STRING
    },
    github: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});



module.exports = User;