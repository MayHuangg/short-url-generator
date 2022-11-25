const express = require('express')
const app = express()
const mongoose = require('./config/mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

// 裝已使用過的5碼組合
// let usedSet = []

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

// 使req.body得以被取得
app.use(bodyParser.urlencoded({ extended: true }))

// 引入routes
app.use(routes)

// set static files
app.use(express.static('public'))

// ////將網址與隨機五碼存入資料庫
const Url = require('./models/url')

////藉由5碼組合找出對應的資料
app.get('/:characterSet', (req, res) => {
  const characterSet = req.params.characterSet
  return Url.find({ fiveCharacters:characterSet })
    .lean()
    .then(urldata => res.redirect(urldata[0].url))
})

