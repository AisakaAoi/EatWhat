// pages/tabbar/recommend/recommend.js
const db = wx.cloud.database()
const util = require("../../../js/util")

Page({

  data: {
    search_city: "",
    imgsrc: 100,
    region: ["广东省", "广州市", "越秀区"],
    weather: ["", "", "℃"],
    img_fav_a:["/images/recommend/favorite.png","/images/recommend/favorite.png","/images/recommend/favorite.png","/images/recommend/favorite.png","/images/recommend/favorite.png"],
    img_fav: "/images/recommend/favorite.png",
    img_fav_white: "/images/recommend/favorite_1.png",
  },

  onLoad: function () {
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
      },
     })
    
    let open_id = wx.getStorageSync("openid")
    
    if(open_id.length == 0) {
      wx.navigateTo({
        url:"../../login/login"
      })
    }
    
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
        //   Suit_wea:that.data.weather[0],
        // })
        .limit(5)
        .get()
        .then(res => {
          let data = res.data
          // 洗牌
          data = util.shuffle(data)
          // console.log(data)
          let open_id = wx.getStorageSync("openid")
          for(let j = 0;j<data.length;j++)
          {
            //  console.log(data[j].menu_name)
              db.collection('favorite')
              .where({
                username :open_id,
                menu_name : data[j].menu_name
              })
              .get()
              .then(res=>{
                if(res.data.length!=0)
                {
                    this.setData({
                      ["img_fav_a[" + j + "]"]: this.data.img_fav_white
                    })
                }
                
              })
          }



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
        console.log(ops.data.result.addressComponent)
 
        that.setData({
          "region[0]": ops.data.result.addressComponent.province,
          "region[1]": ops.data.result.addressComponent.city,
          "region[2]": ops.data.result.addressComponent.district,
        })
      },
      fail: _ => {
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
          "weather[0]": res.data.HeWeather6[0].now.cond_txt,
          "weather[1]": res.data.HeWeather6[0].now.tmp,
        })

        // 暂时的刷新推荐页面
        if (that.data.rec != null) {
          that.setData({
            rec: util.shuffle(that.data.rec),
          })
        }
      },
      complete: _ => {
        wx.hideLoading()
      }
    })
  },

  find: function(e) {
    let queryBean = JSON.stringify(e.target.dataset.src)
    wx.navigateTo({
      url: "../../detail/detail?queryBean=" + queryBean,
    })
  },

  // 绑定收藏函数
  onFavoriteClick: function(e){
    console.log(e.target.dataset.index)
      let open_id = wx.getStorageSync("openid")
      db.collection('favorite').where({
        username : open_id,
        menu_name: e.currentTarget.dataset.item.menu_name, 
      }).get()
      .then(res => {
        if (res.data.length == 0) {
          db.collection('favorite').add({
            data:{
              username: open_id,
              menu_pic:e.currentTarget.dataset.item.menu_pic,
              menu_name:e.currentTarget.dataset.item.menu_name,
              menu_effect:e.currentTarget.dataset.item.menu_effect,
            }
          }).then(res=>{
            this.setData({
              ["img_fav_a[" + e.target.dataset.index + "]"]: this.data.img_fav_white
              
            })
            util.showSuccessToast("收藏菜品成功")
          })
        } else {
          util.showSuccessToast("菜品已经收藏")
        }
      })
  },

  searchProduct: function(e) {
    let that = this
    if (e.detail.value == "") {
      db.collection("menu").get()
      .then(res => {
        let data = res.data
        that.setData({
          rec: data
        })
      })
    }
    db.collection("menu").where({
      menu_name: e.detail.value,
    }).get()
    .then(res => {
      let data = res.data
      that.setData({
        rec: data
      })
    })
  },


})