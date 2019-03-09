
const db = wx.cloud.database()
/**
 * 
 * @param {add} obj 
 */
const add = obj => {
  console.log(obj);
   return db.collection('Books').add({
      data: {
        bookAuthor:obj.bookAuthor,
        bookName:obj.bookName,
        bookUrl:obj.bookUrl,
        like:0,
        views:0,
        categories: obj.categories,
        recommend:obj.recommend
        
      },
    });
}
/**
 * 
 * @param {query} obj 
 */
const query =  (params) => {
 if(params === 'undefined'){
   return db.collection('Books').where({
     // _openid: "oUC5c5a - tWJBtWuObSIzEuil6Xgo"
   }).skip(5).limit(5).get();
 }else{
   return db.collection('Books').where({
     // _openid: "oUC5c5a - tWJBtWuObSIzEuil6Xgo"
   }).get();
 }
 

}

const remove = (obj) => {
  
    if (this.data.counterId) {
      db.collection('collections').doc(this.data.counterId).remove({
        success: res => {
         
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
}



module.exports = {add,query}