const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { dbConnection } = require('../db/db');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/auth',
        }

        // Middlewares
        this.connectDB();
        this.middlewares();
        this.routes();

    }

    async connectDB() {
        try {
            await dbConnection();
        } catch (error) {
            throw new Error(error)
        }
    }

    middlewares() {
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.text());
        this.app.use(cookieParser())
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/authRouter'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

}

module.exports = Server;