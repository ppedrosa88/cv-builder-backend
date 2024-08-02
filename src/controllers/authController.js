const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function getAllUsers(req, res) {

    try {
        const users = await User.findAll();

        if (!users) {
            return res.status(404).send({ message: 'No users' });
        }
        return res.send(users);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}

async function getUser(req, res) {

    try {

        const { id } = req.params;
        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) {
            return res.status(400).send({ message: 'User id is required' });
        }

        if (id !== decoded.id) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        delete user.dataValues.password;

        return res.send(user);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}

async function createUser(req, res) {

    try {

        const { name, surname, email, password, linkedin, github } = req.body;

        if (!name || !surname || !email || !password) {
            return res.status(400).send({ message: 'Name, surname, email and password fields are required' });
        }

        const newUser = {
            id: uuidv4(),
            name,
            surname,
            email,
            password: await bcrypt.hash(password, 10),
        }
        if (linkedin) newUser.linkedin = linkedin;
        if (github) newUser.github = github;

        console.log(newUser)
        const user = await User.create(newUser);

        if (!user) {
            return res.status(500).send({ message: 'Error creating user' });
        }

        await user.save();
        delete user.dataValues.password

        return res.send(user);

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message });
    }

}

async function updateUser(req, res) {

    try {

        const { id } = req.params;
        const { authorization } = req.headers;
        const { body } = req;

        if (!id) {
            return res.status(400).send({ message: 'User id is required' });
        }

        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(id, decoded.id)
        if (id !== decoded.id) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(id);

        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }

        await user.update(body);
        await user.save();
        delete user.dataValues.password

        return res.send(user);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}

async function deleteUser(req, res) {

    try {

        const { id } = req.params;
        const { authorization } = req.headers;

        if (!id) {
            return res.status(400).send({ message: 'User id is required' });
        }

        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (id !== decoded.id) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(id);


        await user.update({ status: false });
        await user.save();

        return res.send({ message: 'User deleted' });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }


}

async function loginUser(req, res) {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Credentials are required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const userVerified = await bcrypt.compare(password, user.password);

        if (!userVerified) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.send({ token });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}


module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
}