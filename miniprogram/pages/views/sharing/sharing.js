const app = getApp();
const db = require('../utils/database.js');
Page({
  data: {
    books: [],
    cpbooks: [],
    loadProgress: 0,
    nodatas: false,
    loading: false
  },
  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading...',
      mask: true
    })
    this.query();

  },

  onPullDownRefresh: function () {
    this.query();
  },
  onReachBottom: function () {
    this.setData({ loading: true })

  },
  //search bookName or author
  itemSearch(evt) {

    let temp = this.data.books.filter(val => {
      return val.bookName.match(evt.detail.value);
    });
    if (!temp.length) {

      this.setData({ nodatas: true })
    }
    this.setData({ books: temp });




    if (evt.detail.value === "") {
      const cp = this.data.cpbooks;
      console.log(cp)

      this.setData({ books: cp })
    }
  },


  //query data form database
  query() {

    const db = wx.cloud.database()
    db.collection('Books').where({}).limit(5).get({
      success: res => {
        this.setData({
          books: res.data
        })
        this.cacheFile(res.data);
        console.log('[数据库] [查询记录] 成功: ', res)
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })


  },

  // go to upload
  upload() {
    wx.navigateTo({
      url: './upload/upload',
    });
  },
  comment(e) {
  },
  // cache booksinformations with cpbooks
  cacheFile(data) {
   
    this.setData({ cpbooks: data })
  },

  loadmore() {
    const that = this;
    db.query().then(res => {
      let newbook = that.data.books;
      if (that.isover(res.data)){
        res.data.forEach(ele => newbook.push(ele));

        that.setData({
          books: newbook,
          cpbooks: newbook
        });
      }else{
        wx.showToast({
          title: '无更多数据',
        })
      }

      
    }).catch(err => console.log(err));
  },

  isover (data) {
    let currentdata = this.data.books;
    if(currentdata[currentdata.length-1]._id === data[data.length-1]._id){
      return false;
    }
    return true;
    // console.log(data[data.length-1]._id);

  }
})