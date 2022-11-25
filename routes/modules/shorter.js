const express = require('express')
const Router = express.Router()
const Url = require('../../models/url')

////將網址與隨機五碼存入資料庫
Router.post('/url',(req, res) => {
  const urlFromClient = req.body.url
  let fiveCharacters = ''
  let shortUrl = ''
  
  Url.find({ url:urlFromClient }).lean()
    .then(data => {
      // 如果有在資料庫中找到相同url的資料，直接從資料庫中抓出先前生成的短網址 
      if (data[0]) {
        shortUrl = `http://localhost:3000/${data[0].fiveCharacters}`
      } else {
        // 如果沒有找到相同的url，則製作出短網址並存入資料庫
        fiveCharacters = pickCharacter(generateCharecters())
        shortUrl = `http://localhost:3000/redirect/${fiveCharacters}` 
        Url.create({url:urlFromClient, fiveCharacters})
      } 
    })
    .then(() => res.render('success',{ shortUrl }))
    .catch(err => console.log(err))

  ///若未申請過則需生成新的一組5碼組合
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
})

module.exports = Router



  // 直到生出沒用過的5碼組合前，要一直隨機產生5碼組合(先以兩碼來測試) 
  // 1.沒抓到不重複的組合前持續抓下去 
  //   function check(notVerifiedCharacters) {
//     Url.find({ fiveCharacters:notVerifiedCharacters })
//       .lean()
//       .then(data => {
//         // 若能在資料庫中找到擁有相同5碼的document，就重新產生5碼並再檢查一次
//         if(data[0]) {
//           console.log(notVerifiedCharacters+'用過了')
//           fiveCharacters = pickCharacter(generateCharecters())
//           console.log('新生成的兩碼是'+fiveCharacters)
//           check(fiveCharacters)
//         } 
//       })
  //   }
  // })
  // 2.隨機挑兩碼 
  //  function pickCharacter(allChars) {
  //   let result = ''
  //   for(let i = 0; i < 2; i++) {
  //     result += allChars[Math.floor(Math.random() * allChars.length)]
  //   }
  //   return result
  // }
  //   function generateCharecters() {
  //   return [0,1]
  // }
