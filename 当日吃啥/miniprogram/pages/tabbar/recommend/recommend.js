// pages/tabbar/recommend/recommend.js
const db = wx.cloud.database()
const util = require("../../../js/util")

Page({

  data: {
    search_city: "",
    imgsrc: 100,
    region: ["广东省", "佛山市", "南海区"],
    weather: ["", "", "℃"],
  },

  onLoad: function () {
    // 获取页面高度
    wx.getSystemInfo({
      success: res => {
        this.setData({
          windowHeight: res.windowHeight,
        })
      }
    })
    // 读取天气
    this.bindRegionWeather()
  },

  onShow: function () {
    let that = this
    let temp = setInterval(() => {
      if (that.data.weather[0] != "") {
        db.collection("menu")
        // .where({
        //   Suit_wea: that.data.weather[0],
        // })
        .get()
        .then(res => {
          let temp = res.data
          // 洗牌
          temp = util.shuffle(temp)
          that.setData({
            rec: temp
          })
        })
        clearInterval(temp)
      }
    }, 1000)
  },

  // 实现选择城市改变region数据
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
    })
    // 读取天气
    this.bindRegionWeather()
  },

  // 用于实现根据所选城市显示天气数据
  bindRegionWeather: function () {
    this.setData({
      search_city: this.data.region[1],
    })
    // 调用天气api
    this.getWeather(this.data.search_city)
  },

  // 根据城市获取天气预报
  getWeather: function (city) {
    let that = this
    let key = "f7430b9f1d314857854a1ac3c16d2f32"
    util.showLoading("修改天气中")
    //获取实况天气
    wx.request({
      url: "https://free-api.heweather.net/s6/weather/now?key=" + key + "&location=" + city,
      success: res => {
        if (res.data.HeWeather6[0].status == "unknown location") {
          util.showNoneToast("抱歉！没有该城市的天气预报")
          return
        }
        that.setData({
          city: city,
          "weather[0]" : res.data.HeWeather6[0].now.cond_txt,
          "weather[1]": res.data.HeWeather6[0].now.tmp,
        })
      },
      complete: _ => {
        wx.hideLoading()
      }
    }),
    this.onShow()
  },

  find: function() {

  },

  // 绑定收藏函数
  onFavoriteClick: function(){
    console.log("Clicking Heart")
  },

})