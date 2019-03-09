// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const request = require('request-promise')
cloud.init()

// 云函数入口函数
exports.main = (event, context) => {
  let res = request('https://api.douban.com/v2/book/isbn/' + event.isbn)
  .then(data => {
     return data
  })
  .catch(error => {
     return error;
  })
  return res;
}