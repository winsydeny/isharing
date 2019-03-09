const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')
cloud.init()
exports.main = (event, context) => {
  // const fileStream = fs.createReadStream(event.image)
  // return await cloud.uploadFile({
  //   cloudPath: '01.jpg',
  //   fileContent: fileStream,
  // }
   return cloud.uploadFile({
    cloudPath: 'example.png',
    filePath: '', // 文件路径
  })

  // return fileStream;
}