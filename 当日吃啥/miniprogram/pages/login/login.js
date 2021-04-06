// pages/login/login.js
Page({

  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
  },

  onLoad: function () {

  },

  onShow: function () {

  },

  // 用户授权
  getUserInfo: function (res) {
    if (res.detail.userInfo) {
      // 保存授权的用户信息
      wx.setStorageSync("userInfo", res.detail.userInfo)
      // 获取用户的openid并保存
      this.onGetOpenid()
      // 返回上一页
      wx.navigateBack()
    } else {
      // 用户按了拒绝按钮
      wx.showModal({
        title: "警告",
        content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
        showCancel: false,
        confirmText: "返回授权",
        success: res => {
          if (res.confirm) {
            // ------------------
            // 以后改成写入日志文件
            // ------------------
            console.log("用户点击了“返回授权”")
          }
        }
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: "login",
      data: {},
    })
    .then(res => {
      // 存入本地缓存和小程序缓存
      wx.setStorageSync("openid", res.result.openid)
    })
    .catch(err => {
      // ------------------
      // 以后改成写入日志文件
      // ------------------
      console.error("[云函数login] 调用失败", err)
    })
  },

})