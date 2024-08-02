const express = require('express');
const { getAllUsers, createUser, getUser, updateUser, deleteUser, loginUser } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.get('/', getAllUsers);
authRouter.post('/', createUser);
authRouter.get('/:id', getUser);
authRouter.patch('/:id', updateUser);
authRouter.delete('/:id', deleteUser);

authRouter.post('/login', loginUser);

module.exports = authRouter;
