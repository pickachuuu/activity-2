const userModel = require('../models/userModel');

const register = (req, res) => {
    const {username, password} = req.body;

    const existingUser = userModel.findUser(username);
    if (existingUser){
        return res.status(400).json({message: 'Existing user with the same username exist'})
    }

    userModel.createUser(username, password);
    return res.status(201).json({message: 'Sucessfully created user'});
}


const login = (req, res) => {
    const {username, password} = req.body;

    const user = userModel.findUser(username);
    if (!user){
        return res.status(401).json({message: 'User not found'});
    }

    if (userModel.verifyPassword(username, password)){
        return res.status(201).json({message: 'Login sucessfully'})
    }
}


module.exports = {
    register,
    login
};