const express = require('express')
const Router = express.Router()

const shorter = require('./modules/shorter')
Router.use('/', shorter)

const redirect = require('./modules/redirect')
Router.use('/redirect', redirect)

module.exports = Router