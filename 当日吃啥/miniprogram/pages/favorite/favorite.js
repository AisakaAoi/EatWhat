// pages/favorite/favorite.js
const db = wx.cloud.database()

Page({

  data: {

  },

  onLoad: function () {
    let that = this
    let open_id = wx.getStorageSync("openid")
    db.collection("favorite").where({
      username: open_id,
    }).get()
    .then(res => {
      that.setData({
        rec: res.data
      })
    })
  },

  onShow: function () {

  },

  find: function (e) {
    let queryBean = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: "../detail/detail?queryBean=" + queryBean,
    })
  },

})