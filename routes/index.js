const express = require('express')
const Router = express.Router()

const shorter = require('./modules/shorter')
Router.use('/url', shorter)

const redirect = require('./modules/redirect')
Router.use('/', redirect)

module.exports = Router
