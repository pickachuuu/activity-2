const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const secretKey = 'test123'; // for testing purposes //

const register = (req, res) => {
    const {email, username, password} = req.body;
    const existingUser = userModel.findUser(username);

    if (existingUser){
        return res.status(400).json({message: 'Existing user with the same username exist'})
    }

    userModel.createUser(email, username, password);
    return res.status(201).json({message: 'Sucessfully created user'});
}


const login = (req, res) => {
    const { email, password } = req.body;
    const user = userModel.findUser(email);

    if (!user) {
    return res.status(401).json({ message: 'User not found' });
    }

    if (!userModel.verifyPassword(email, password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey);

    return res.status(200).json({ message: 'Login successful', token });
};

const getProfile = (req, res) => {
    const {email} = req.body;
    const user = userModel.findUser(email);

    if (!user){
        res.status(404).json({message: 'User not found'});
    }

    res.status(201).json({
        id: user.id,
        email: user.email,
        username: user.username
    });
}


module.exports = {
    register,
    login,
    getProfile
};