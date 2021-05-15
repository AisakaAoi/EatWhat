const db = wx.cloud.database()
let that = this
// pages/favorite/favorite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let open_id=wx.getStorageSync("openid");
    db.collection("favorite")
         .where({
          username: open_id,
         })
        .get()
        .then(res => {
          console.log(res.data)
          this.setData({
            rec: res.data
          })
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  find:function(e){
    console.log(e.currentTarget.dataset.item)
    let queryBean = JSON.stringify(e.currentTarget.dataset.item)
    console.log(queryBean+"aaa")
    wx.navigateTo({
      url: "../detail/detail?queryBean=" + queryBean,
    })
  }
})