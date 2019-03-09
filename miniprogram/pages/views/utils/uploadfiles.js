const loadfile = (url,id) => {
  return wx.cloud.uploadFile({
    cloudPath: `bookspic/${id}.jpg`,
    filePath: url // 文件路径
  })
}
module.exports = {loadfile}