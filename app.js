const express = require('express')
const morgan = require('morgan')
const itemRouter = require('./routes/itemRoutes')
const usersRouter = require('./routes/userRoutes')
const app = express()
app.use(express.json())

app.use(morgan('dev'))
app.use('/api/v1/shL', itemRouter);
app.use('/api/v1/shl/users', usersRouter);

module.exports = app;