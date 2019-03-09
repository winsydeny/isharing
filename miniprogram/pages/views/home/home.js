const db = require("../utils/database.js");
const app = getApp();

Page({
    data:{
      swiperUrl:[]
    },
    onLoad () {
      console.log(app);
      const that = this;
      db.query().then(res => {
          console.log(res);
          let arr = [];
          res.data.forEach(el => {
            if(el.bookUrl instanceof Array){
              arr.push(el.bookUrl[0]);
            }else{
              arr.push({'img':el.bookUrl});
            }
          })
          that.setData({ swiperUrl:arr });
           console.log(this.data.swiperUrl)
      }).catch(err => console.log(err))


      

    },
    onShow () {
      console.log(this.data.swiperUrl)
    }
    
})