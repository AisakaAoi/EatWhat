// pages/tabbar/vegetables/vegetables.js
// pages/tabbar/recipes/recipes.js
const recList = require("../../../js/list")
const util = require("../../../js/util")

Page({

  data: {
    rightShow: false,
    dropShow: false,
    indexShow: false,
    scrollTop: 1000,
    //定义索引字母数组
    arrId: recList.indexArr,
    list: recList.recList,
    a: "1",
    
  },
    // 扫描菜品
  scanDishes: function () {
    let that = this
    new Promise((resolve, reject) => {
      // chooseImg
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0],
            encoding: "base64",
            success: res => {
              resolve(res.data)
            }
          })
        }
      })
    })
    .then(imgB64 => {
      util.showLoading("识别中")
      that.getToken(function (token) {
        that.getResult(token, imgB64)
      })
    })
  },
    // 扫描蔬菜
  scanVeg: function () {
    let that = this
    new Promise((resolve, reject) => {
      // chooseImg
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0],
            encoding: "base64",
            success: res => {
              resolve(res.data)
            }
          })
        }
      })
    })
    .then(imgB64 => {
      util.showLoading("识别中")
      that.getToken(function (token) {
        that.getResult1(token, imgB64)
      })
    })
  },

  getToken: function (callback) {
    var apiKey = "C9RTmGyhYhTZfkU2ZNcNEf3Q"
    var secKey = "znIPcjmI9XF16vkUksqfcGGjbqhfMj4f"
    var tokenUrl = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + apiKey + "&client_secret=" + secKey
    wx.request({
      url: tokenUrl,        
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: res => {
        let token = res.data.access_token
        return callback(token)
      }
    })
  },

  getResult: function (token, imgB64) {
    wx.request({
      url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=" + token,                      //菜品识别
      // url: "https://aip.baidubce.com/rest/2.0/image-classify/v1/classify/ingredient?access_token=" + token,    //蔬菜识别
      method: "post",
      data: {
        image: imgB64,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data.result[0].name)
        var queryBean = JSON.stringify(res.data.result[0].name)
        console.log(queryBean+"ssss")
        wx.navigateTo({
          url: '../../detail/detail?queryBean='+queryBean,
        })

      }
    })
  },
  
  getResult1: function (token, imgB64) {
    wx.request({
      // url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=" + token,                      //菜品识别
      url: "https://aip.baidubce.com/rest/2.0/image-classify/v1/classify/ingredient?access_token=" + token,    //蔬菜识别
      method: "post",
      data: {
        image: imgB64,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data.result[0].name)
      }
    })
  },
})