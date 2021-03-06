// pages/tabbar/mycenter/mycenter.js
Page({

  data: {
    arrowurl: "/images/mycenter/arrow.png",
    orderItems: [
      {
        id: 0,
        name: "我的收藏",
        imageurl: "/images/mycenter/favorite.png"
      },
      {
        id: 1,
        name: "意见反馈",
        imageurl: "/images/mycenter/advice.png"
      },
      {
        id: 2,
        name: "使用帮助",
        imageurl: "/images/mycenter/help.png"
      },
      {
        id: 3,
        name: "关于我们",
        imageurl: "/images/mycenter/aboutus.png"
      },
    ],
  },

  onLoad: function () {

  },

  onShow: function () {

  },

  toFavorite: function () {
    wx.navigateTo({
      url: '../../favorite/favorite',
    })
  },

  toHelp: function () {
    wx.navigateTo({
      url: '../../help/helpcenter/helpcenter',
    })
  },

  toAboutUs: function () {
    wx.navigateTo({
      url: '../../about/about',
    })
  },

})