const express = require('express')
const Router = express.Router()
const Url = require('../../models/url')

////將網址與隨機五碼存入資料庫
Router.post('/url',(req, res) => {
  const url = req.body.url
  let fiveCharacters = ''
  
  // 創出含有大小寫字母和數字的array 
  function generateCharecters() {
    const lowercase = [...Array(26)].map((_, i) => String.fromCharCode(i + 97)) 
    const uppercase = [...Array(26)].map((_, i) => String.fromCharCode(i + 65))
    const num = [...Array(10)].map((_, i) => i);
    const allCharecters = lowercase.concat(uppercase).concat(num)
    return allCharecters
  }
  // 從含有大小寫字母和數字的array中挑出五個字組成一組
  function pickCharacter(allChars) {
    let result = ''
    for(let i = 0; i < 5; i++) {
      result += allChars[Math.floor(Math.random() * allChars.length)]
    }
    return result
  }
  // 製作出不重複的5碼組合
  fiveCharacters = pickCharacter(generateCharecters())
  // 製作出縮短的網址
  const shortUrl = `http://localhost:3000/${fiveCharacters}`

  return Url.create({url, fiveCharacters})
    .then(() => res.render('index',{ shortUrl }))
})

module.exports = Router
