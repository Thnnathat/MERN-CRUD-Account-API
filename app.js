const express =  require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const authJwt = require('./helpers/jwt')

require('dotenv').config()
const api = process.env.API_URL

const port = 3000

app.use(cors())
app.use("*", cors())

// * Middleware

app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())

// * Routes
const userRouter = require('./routers/users')

app.use(`${api}/users`, userRouter)

// * Connect Datebase
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'MERN-CRUD-Account'
})
.then(() => {
    console.log("Database connection is ready.")
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log(`Server litening on port ${port}`)
    console.log(`http://localhost:${port}`)
})
