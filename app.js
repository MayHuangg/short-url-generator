const express = require('express')
const app = express()
require('./config/mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

// listen on server
const port = 3000
app.listen(port, () => {
  console.log(`listen on port: ${port}`)
})

// set templete engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

// 使req.body得以被取得
app.use(bodyParser.urlencoded({ extended: true }))

// 引入routes
app.use(routes)

// set static files
app.use(express.static('public'))
