// pages/tabbar/recommend/recommend.js
Page({

  data: {
    region: ['广东省', '佛山市', '南海区'],
    temperature: ["多云","26","℃"],
    rb_text: ["冷", "牛肉丸汤粉"],
    imgurl: "/images/recommend/niurou.jpeg"
  },

  onLoad: function () {
    
  },

  onShow: function () {

  },
// 实现选择城市改变region数据
  bindRegionChange: function(e){
    console.log("picker changing", e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.bindRegionWeather()
  },
// 用于实现根据所选城市显示天气数据
  bindRegionWeather: function(){
    console.log(this.data.region[0], this.data.region[1], this.data.region[2])
  // 此处修改天气数值 0:天气 1:气温 
    this.setData({
      // temperature[0]:
      // temperature[1]:
    })
  }
})