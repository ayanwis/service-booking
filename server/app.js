const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRoute')
const cookieParser = require('cookie-parser')
const globalErroHandler = require('./controllers/errorController')

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// 2) ROUTES
app.use('/api/v1/users', userRouter)

app.use(globalErroHandler)
module.exports = app
