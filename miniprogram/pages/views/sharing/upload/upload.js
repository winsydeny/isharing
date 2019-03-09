const {query,add,uploadfile} = require('../../utils/database.js');
const {loadfile} = require('../../utils/uploadfiles.js');
const {random} = require('../../utils/random.js');
const app = getApp();
Page({
  data: {
    picker: ['名著', '技术', '小说'],
    bookName: '',
    author: '',
    contact: '',
    recommend: '',
    category: '',
    index: '',
    image: '',
  },
  // scan barCode and get bookinfo from cloudFunction(getBookInfo)
  scan() {
    let that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success(res) {
        console.log(res);
        wx.cloud.callFunction({
          name: 'getBookInfo',
          data:{
            isbn:res.result
          },
          complete: res => {
            if (res.result.statusCode === 404) {
              that.setData({
                bookName: '',
                author:'',
                image:''
              })
              wx.showToast({
                title: 'NOTHING!',
              })
            } else {
              console.log(res);
              let rs = JSON.parse(res.result);
              that.setData({
                bookName: rs.title,
                author: rs.author[0],
                image: rs.image
              })
            }
          }
        })
        wx.showToast({
          title: 'success',
        })
      },
      fail(res) {
        wx.showToast({
          title: 'fail',
        })
        console.log(res);
      }
    })

  },
  PickerChange(e) {
    const that = this;
    console.log(e);
    this.setData({
      category: that.data.picker[e.detail.value]
    })
  },
  bookName(e) {
    this.setData({
      bookName: e.detail.value
    })

  },
  author(e) {
    this.setData({
      author: e.detail.value
    })
  },
  contact(e) {
    this.setData({
      contact: e.detail.value
    })
  },
  recommend(e) {
    this.setData({
      recommend: e.detail.value
    })
  },
  //choose iamge from device
  uploadImg(){
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
        const tempFilePaths = res.tempFilePaths;
        that.setData({ image:tempFilePaths })
      }
    })
  },

  // upload information about book
  upload() {
    const that = this.data;
    let rand = Math.floor(Math.random() * 10000000);
    
    loadfile(this.data.image[0], rand).then(res => {
      console.log(res.fileID);
      const books = {
        bookName: that.bookName,
        bookAuthor: that.author,
        bookUrl: res.fileID,
        recommend: that.recommend,
        categories: that.category
      }
      add(books).then(data => {
        wx.showModal({
          title: 'Tips',
          content: 'Sharing successful,thank you!',
        })
      }).catch(err => console.log('upload: '+ err))
      }).catch(err => console.log('image: ' + err));
    


    // let that = this.data;
    // const books = {
    //   bookName:that.bookName,
    //   bookAuthor:that.author,
    //   bookUrl:that.image,
    //   recommend:that.recommend
    // }
    // let rs = add(books);
    // rs.then(data => {
    //     console.log(data);
    //     wx.showModal({
    //       title: 'Tips',
    //       content: 'Sharing successful,thank you!',
    //     })
    // }).catch(error => {

    // })
  }

})