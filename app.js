const express = require('express')
const app = express()
const userRoutes = require('./routes/user');
const rateLimiter = require('./middleware/rateLimiter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', rateLimiter, userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

