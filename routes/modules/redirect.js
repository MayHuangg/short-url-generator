const express = require('express')
const Router = express.Router()
const Url = require('../../models/url')

 ////藉由5碼組合找出對應的資料
Router.get('/:characterSet', (req, res) => {
  const characterSet = req.params.characterSet
  return Url.find({ fiveCharacters: characterSet })
    .lean()
    .then(urldata => res.redirect(urldata[0].url))
})

module.exports = Router
