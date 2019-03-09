const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfos:[],
    canIUse:true
  },
  goto(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: `./${url}/${url}`,
    })
  },  
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          
          wx.getUserInfo({
            success(res) {
              
              that.setData({ userInfos:res.userInfo,canIUse:false });
              // app.globalData.user = res.userInfo;
              // wx.setStorage({
              //   key: 'user',
              //   data: res.userInfo
              // })
              // console.log(res.userInfo)
            },
            fail (err) {
              console.log(err);
            }

          })
        }
      }
    });


    wx.cloud.callFunction({
    name: 'getOpenId',
      complete: res => {
        app.globalData.openid = res.result.openid;
      }
    })



    // console.log(app);
  },

 

  onShow () {
    // console.log('123');
  },
  bindGetUserInfo(e) {
    
    // console.log(wx.canIUse('button.open-type.getUserInfo'))
  }
})