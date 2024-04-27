const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const http = require('http')
const user = require('./routes/user')
const app = express()
const server = http.createServer(app)


app.use(cors())
app.use(express.json())
dotenv.config()

require('./database/connexion')

app.use('/user', user)

server.listen(process.env.PORT, () => {
    console.log(`server connected ${process.env.PORT}`)
})