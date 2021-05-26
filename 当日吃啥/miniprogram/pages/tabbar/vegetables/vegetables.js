// pages/tabbar/vegetables/vegetables.js
const recList = require("../../../js/list")
const util = require("../../../js/util")
var tempfilepath = ""
Page({

  data: {
    tempfilepath: "",
    rightShow: false,
    dropShow: false,
    indexShow: false,
    scrollTop: 1000,
    //定义索引字母数组
    arrId: recList.indexArr,
    list: recList.recList,
    a: "1",
  },

  onLoad: function () {
    
  },

  onShow: function () {
    
  },

  // 扫描菜品
  scanDishes: function () {
    let that = this
    new Promise((resolve, reject) => {
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
        that.getDishesResult(token, imgB64)
      })
    })
  },

  // 扫描蔬菜
  scanVeg: function () {
    let that = this
    new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          var tempFilePaths = res.tempFilePaths
          tempfilepath = res.tempFilePaths[0],
          console.log(res.tempFilePaths[0])
          // that.setData({tempfilepath:tempFilePaths[0]})
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
        that.getVegResult(token, imgB64)
      })
    })
  },

  getToken: function (callback) {
    let apiKey = "C9RTmGyhYhTZfkU2ZNcNEf3Q"
    let secKey = "znIPcjmI9XF16vkUksqfcGGjbqhfMj4f"
    let tokenUrl = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + apiKey + "&client_secret=" + secKey
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

  getDishesResult: function (token, imgB64) {
    wx.request({
      url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=" + token,                      //菜品识别
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
        let queryBean = JSON.stringify(res.data.result[0].name)
        console.log(queryBean + "ssss")
        wx.navigateTo({
          url: "../../detail/detail?queryBean=" + queryBean,
        })
      }
    })
  },
  
  getVegResult: function (token, imgB64) {
    wx.request({
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
        let queryBean = JSON.stringify(res.data.result[0].name)
        console.log(tempfilepath + "ssss")
        let  tempfilepathssss = JSON.stringify(tempfilepath)
        wx.navigateTo({
          url: "../../scan/scan?queryBean="+ queryBean +"&tempfilepathssss=" +tempfilepathssss,
        })
      }
    })
  },
})