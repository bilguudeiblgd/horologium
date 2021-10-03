const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

const usersRouter = require('./routes/users.js');
const subjectsRouter = require('./routes/subjects.js');
const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login.js')
app.use('/users', usersRouter);
app.use('/users/subjects', subjectsRouter);
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
// "localhost:5000"

app.get('/', (req,res) => {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html")
    );
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})