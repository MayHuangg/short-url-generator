const express = require('express')
const app = express()
const mongoose = require('./config/mongoose')
const exphbs = require('express-handlebars')

// listen on server
const port = 3000
app.listen(port, () => {
  console.log(`listen on port: ${port}`)
})

// set templete engine 
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/',(req, res) => {
  res.render('index')
})