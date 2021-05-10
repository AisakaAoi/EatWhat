// pages/tabbar/recommend/recommend.js
const db = wx.cloud.database()
const util = require("../../../js/util")

Page({

  data: {
    search_city: "",
    imgsrc: 100,
    region: ["", "", ""],
    weather: ["", "", "℃"],
  },

  onLoad: function () {
    let that = this
    // 获取页面高度
    wx.getSystemInfo({
      success: res => {
        this.setData({
          windowHeight: res.windowHeight,
        })
      }
    })

    // 获取当地地点
    wx.getSetting({
      success: res => {
        // 初始化或者已经授权过了（初始化时，调用getLocation会自动弹框询问）
        if (res.authSetting["scope.userLocation"] !== false) {
          // 调用wx.getLocation的API
          that.getLocationRequest()
        }
        // 读取天气
        let temp = setInterval(() => {
          if (that.data.region[0] != "") {
            this.bindRegionWeather()
            clearInterval(temp)
          }
        }, 1000)
      }
    })

    // 读取天气
    // this.bindRegionWeather()

    let temp = setInterval(() => {
      if (that.data.weather[0] != "") {
        db.collection("menu")
        // .where({
        //   Suit_wea: that.data.weather[0],
        // })
        .get()
        .then(res => {
          let data = res.data
          // 洗牌
          data = util.shuffle(data)
          that.setData({
            rec: data
          })
        })
        clearInterval(temp)
      }
    }, 1000)
  },

  onShow: function () {
    
  },

  getLocationRequest: function () {
    let that = this
    wx.getLocation({
      type: "wgs84",
      success: res => {
        let latitude = res.latitude
        let longitude = res.longitude
        that.getLocal(latitude, longitude)
      },
      fail: res => {
        console.log("fail" + JSON.stringify(res))
      }
    })
  },

  getLocal: function (latitude, longitude) {
    let that = this
    wx.request({     
      url: "http://api.map.baidu.com/reverse_geocoding/v3/?ak=mEUqB6cTeu9CsjDGt0CrPcdYKPAeWKUh&output=json&coordtype=gcj02&location=" + latitude + "," + longitude,
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: ops => {
        console.log("定位城市：", ops.data.result.addressComponent.province)
        console.log("定位城市：", ops.data.result.addressComponent.city)
        console.log("定位城市：", ops.data.result.addressComponent.district)
        that.setData({
          "region[0]": ops.data.result.addressComponent.province,
          "region[1]": ops.data.result.addressComponent.city,
          "region[2]": ops.data.result.addressComponent.district,
        })
      },
      fail: _ => {
        console.log(_)
        wx.showModal({
          title: "信息提示",
          content: "请求失败",
          showCancel: false,
          confirmColor: "#f37938",
        })
      }
    })
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

        // 暂时的刷新推荐页面
        that.setData({
          rec: util.shuffle(that.data.rec),
        })

      },
      complete: _ => {
        wx.hideLoading()
      }
    })
  },

  find: function(e) {
    console.log(e.target.dataset.src)
    let queryBean = JSON.stringify(e.target.dataset.src)
    wx.navigateTo({
      url: "../../detail/detail?queryBean=" + queryBean,
    })
  },

  // 绑定收藏函数
  onFavoriteClick: function(){
    console.log("Clicking Heart")
  },

})