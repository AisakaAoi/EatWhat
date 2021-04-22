// pages/tabbar/recipes/recipes.js
const recList = require("../../../js/list")
const util = require("../../../js/util")

Page({

  data: {
    rightShow: false,
    dropShow: false,
    indexShow: false,
    toView: "e",
    scrollTop: 1000,
    indexId: "",
    indexy: "",
    indexEnglish: "",
    //定义索引字母数组
    arrId: recList.indexArr,
    indexArr: recList.indexArr,
    list: recList.recList,
    a: "1",
    y: 0,
    // 侧边栏实现
    filtrate: false,
    filterData: ["素菜", "荤菜", "面食", "小吃", "粥", "汤", "甜品", "饮品", "海鲜",
    "卤菜", "沙拉", "便当", "汉堡", "面包", "披萨"],
  },

  onLoad: function (options) {
    let that = this

    wx.getSystemInfo({
      success: res => {
        that.setData({
          windowHeight: res.windowHeight,
          indexTop: res.windowHeight / 2 - 200, 
        })
      }
    })
  },

  onShow: function () {

  },
  
  onCameraOn: function () {
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
      }
    })
  },

  // lx看这里，showDetail绑定对应数据
  showDetail: function (e) {
    console.log(e.target.dataset.src)
  },

  touchstart: function (e) {
    this.setData({
      indexId: e.target.id,
      toView: e.target.id.toLowerCase(),
      indexY: e.touches[0].pageY,
      indexShow: true,
      indexEnglish: e.target.id, 
    })
  },

  touchmove: function (e) {
    let y = this.getArrIndex(e.target.id)
    let indexY = e.touches[0].pageY
    if (this.getArrEnglish(Math.round((indexY - this.data.indexY) / 15), y)) {
      this.setData({
        toView: this.getArrEnglish(Math.round((indexY - this.data.indexY) / 15), y).toLowerCase(),
        indexEnglish: this.getArrEnglish(Math.round((indexY - this.data.indexY) / 15), y), 
      })
    }
  },

  touchend: function () {
    this.setData({
      indexShow: false,
    })
  },

  //获取touchstart字母数组角标
  getArrIndex: function (e) {
    for (let x = 0; x < this.data.indexArr.length; x++) {
      if (e == this.data.indexArr[x]) {
        return x
      }
    }
  },

  //num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
  getArrEnglish: function (num, index) {
    let e = this.data.indexArr[num + index]
    if (!(1 > num + index > 26)) {
      return e
    } else {
      return AAA
    }
  },

  // 侧边栏显示
  showFilter: function(){
    this.setData({
      filtrate: true
    });
    console.log(this.data.filtrate);
  },

  noneFilter: function() {
    this.setData({
      filtrate: false
    });
    console.log(this.data.filtrate);
  },

  // 获取筛选列表值
  selectFilter: function(e) {
    console.log(e.currentTarget.dataset.item);
  },
  
})