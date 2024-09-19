require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');
const errorHandler = require("./helpers/errorHandler");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

sequelize.authenticate()
    .then(() => console.log('Connected to the database successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Unable to sync database:', err));
