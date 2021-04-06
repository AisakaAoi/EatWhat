// pages/tabbar/recipes/recipes.js
const vegList = require("../../../js/list")
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
    arrId: vegList.indexArr,
    indexArr: vegList.indexArr,
    list: vegList.vegList,
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

  // lx看这里，showDetail绑定对应数据
  showDetail: function () {
    console.log("showDetail")
  },

  //获取touchstart字母数组角标
  getArrIndex: function (english) {
    // console.log(Page)
    for (var x = 0; x < this.data.indexArr.length; x++) {
      if (english == this.data.indexArr[x]) {
        return x;
      }
    }
  },

  //num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
  getArrEnglish: function (num, index) {
    var english = this.data.indexArr[index + num];
    if (!(1 > num + index > 26)) {
      return english;
    } else {
      return AAA;
    }
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
    this.y = this.getArrIndex(e.target.id);
    var indexY = e.touches[0].pageY;
    if (this.getArrEnglish(Math.round((indexY - this.data.indexy) / 15), this.y)) {
      this.setData({
        toView: this.getArrEnglish(Math.round((indexY - this.data.indexy) / 15), this.y).toLowerCase(),
        indexEnglish: this.getArrEnglish(Math.round((indexY - this.data.indexy) / 15), this.y)
      })
    }
  },

  touchend: function(e) {
    this.setData({
      indexShow: false
    })
  }



})