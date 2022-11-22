const express = require('express')
const Router = express.Router()

const shorter = require('./modules/shorter')
Router.use('/', shorter)

module.exports = Router