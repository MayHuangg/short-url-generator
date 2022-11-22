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

// ////將網址與隨機五碼存入資料庫
const Url = require('./models/url')
// app.post('/url',(req, res) => {
//   const url = req.body.url
//   let fiveCharacters = ''
  
//   // 創出含有大小寫字母和數字的array 
//   function generateCharecters() {
//     const lowercase = [...Array(26)].map((_, i) => String.fromCharCode(i + 97)) 
//     const uppercase = [...Array(26)].map((_, i) => String.fromCharCode(i + 65))
//     const num = [...Array(10)].map((_, i) => i);
//     const allCharecters = lowercase.concat(uppercase).concat(num)
//     return allCharecters
//   }
//   // 從含有大小寫字母和數字的array中挑出五個字組成一組
//   function pickCharacter(allChars) {
//     let result = ''
//     for(let i = 0; i < 5; i++) {
//       result += allChars[Math.floor(Math.random() * allChars.length)]
//     }
//     return result
//   }
//   // 製作出不重複的5碼組合
//   fiveCharacters = pickCharacter(generateCharecters())
//   // 製作出縮短的網址
//   const shortUrl = `http://localhost:3000/${fiveCharacters}`

//   return Url.create({url, fiveCharacters})
//     .then(() => res.render('index',{ shortUrl }))
// })

////藉由5碼組合找出對應的資料
app.get('/:characterSet', (req, res) => {
  const characterSet = req.params.characterSet
  return Url.find({ fiveCharacters:characterSet })
    .lean()
    .then(urldata => res.redirect(urldata[0].url))
})
