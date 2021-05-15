// pages/login/login.js
Page({

  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
  },

  onLoad: function () {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },

  onShow: function () {

  },

  getUserProfile: function () {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        // 获取用户的openid并保存
        this.onGetOpenid()
        // 保存授权的用户信息
        wx.setStorageSync("userInfo", res.userInfo)
        // 返回上一页
        // wx.navigateBack()
        wx.switchTab({
          url: "../tabbar/recommend/recommend",
        })
      },
      fail: _ => {
        // 用户按了拒绝按钮
        this.getUserRefuse()
      }
    })
  },

  // 用户授权
  getUserInfo: function (res) {
    if (res.detail.userInfo) {
      // 获取用户的openid并保存
      this.onGetOpenid()
      // 保存授权的用户信息
      wx.setStorageSync("userInfo", res.detail.userInfo)
      // 返回上一页
      wx.navigateBack()
    } else {
      // 用户按了拒绝按钮
      this.getUserRefuse()
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
      console.log(res.result.openid)
    })
    .catch(err => {
      // ------------------
      // 以后改成写入日志文件
      // ------------------
      console.error("[云函数login] 调用失败", err)
    })
  },

  getUserRefuse: function () {
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
  },

})