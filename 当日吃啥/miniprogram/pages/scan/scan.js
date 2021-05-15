const db = wx.cloud.database();
const _ = db.command;
// pages/scan/scan.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    
    rex: "",
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let ans =[];
    let that = this
    console.log(options)
    let queryBean = JSON.parse(options.queryBean);
    let tempfilepath =JSON.parse(options.tempfilepathssss) ;

    // console.log(queryBean)
    that.setData({
      tmeppic:tempfilepath,
      name:queryBean
    })
    db.collection("veg")
         .where({
          veg_name: queryBean,
         })
        .get()
        .then(res => {
          for(var i = 0;i<res.data.length;i++)
          {
            db.collection("menu")
            .where({
              menu_name:res.data[i].menu_name
            })
            .get()
            .then(res=>{
              ans.push(res.data)
 
              that.setData({
                anss : ans,
                
              })
            })
          }
          that.setData({
            rex : res.data
          })
        })   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  find:function(e){
    console.log(e.target.dataset.item.menu_name)
    let queryBean = JSON.stringify(e.target.dataset.item.menu_name)
    console.log(queryBean+"aaa")
    wx.navigateTo({
      url: "../detail/detail?queryBean=" + queryBean,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})