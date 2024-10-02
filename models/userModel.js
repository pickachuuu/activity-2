let users = []

const createUser = (username, password) => {
    const newUser = {
        id: users.length + 1, 
        username: username,
        password: password
    };

    users.push(newUser);
    // return newUser;
};

const findUser = (username) => {
    return users.find(user => user.username === username);
}

module.exports = {
    createUser
};