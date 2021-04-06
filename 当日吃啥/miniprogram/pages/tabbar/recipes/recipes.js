// pages/tabbar/recipes/recipes.js
const recList = require("../../../js/recList")

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
    list: recList.list,
    a: "1",

    y: 0,

  },
  
  onLoad: function() {
    let that = this
    wx.getSystemInfo({
      success: res => {
        that.setData({
          windowHeight: res.windowHeight,
          indexTop: res.windowHeight / 2 - 200
        });
      }
    })
  },

  onShow: function () {

  },

  // 摄像头函数在此
  onCameraOn: function(){
    console.log("Camera_On");
  }, 

  touchstart: function(e) {
    this.setData({
      indexId: e.target.id,
      toView: e.target.id.toLowerCase(),
      indexy: e.touches[0].pageY,
      indexShow: true,
      indexEnglish: e.target.id
    })
  },

  touchmove: function(e) {
    y = getArrIndex(e.target.id);
    var indexY = e.touches[0].pageY;
    if (getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)) {
      this.setData({
        toView: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y).toLowerCase(),
        indexEnglish: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)
      })
    }
  },

  touchend: function(e) {
    this.setData({
      indexShow: false
    })
  },

  //获取touchstart字母数组角标
  getArrIndex: function (english) {
    // console.log(Page)
    for (var x = 0; x < indexArr.length; x++) {
      if (english == indexArr[x]) {
        return x;
      }
    }
  },

  //num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
  getArrEnglish: function (num, index) {
    var english = indexArr[index + num];
    if (!(1 > num + index > 26)) {
      return english;
    } else {
      return AAA;
    }
  },

})