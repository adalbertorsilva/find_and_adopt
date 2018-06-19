const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(bodyParser.json({limit: '10mb'}))

require('../routes')(app)

module.exports = app
