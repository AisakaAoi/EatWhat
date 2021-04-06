<<<<<<< Updated upstream
import list from '../../../js/recList.js'
//定义索引字母数组
var indexArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var y = 0;
//获取touchstart字母数组角标
function getArrIndex(english) {
  // console.log(Page)
  for (var x = 0; x < indexArr.length; x++) {
    if (english == indexArr[x]) {
      return x;
    }
  }
}
//num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
function getArrEnglish(num, index) {
  var english = indexArr[index + num];
  if (!(1 > num + index > 26)) {
    return english;
  } else {
    return AAA;
  }
}

=======
// pages/tabbar/recipes/recipes.js
const recList = require("../../../js/List")
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    arrId: indexArr,
    list: list
  },

=======
    //定义索引字母数组
    arrId: recList.indexArr,
    indexArr: recList.indexArr,
    list: recList.recList,
    a: "1",
    y: 0,

  },

  onLoad: function () {
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
  onCameraOn: function () {
    console.log("Camera_On");
  },
>>>>>>> Stashed changes

  touchstart: function (e) {
    this.setData({
      indexId: e.target.id,
      toView: e.target.id.toLowerCase(),
      indexy: e.touches[0].pageY,
      indexShow: true,
      indexEnglish: e.target.id
    })
  },
<<<<<<< Updated upstream
  touchmove: function(e) {
    y = getArrIndex(e.target.id);
=======

  touchmove: function (e) {
    this.y = this.getArrIndex(e.target.id);
>>>>>>> Stashed changes
    var indexY = e.touches[0].pageY;
    if (this.getArrEnglish(Math.round((indexY - this.data.indexy) / 15), this.y)) {
      this.setData({
        toView: this.getArrEnglish(Math.round((indexY - this.data.indexy) / 15), this.y).toLowerCase(),
        indexEnglish: this.getArrEnglish(Math.round((indexY - this.data.indexy) / 15), this.y)
      })
    }
  },
<<<<<<< Updated upstream
  touchend: function(e) {
    this.setData({
      indexShow: false
    })
  },
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          indexTop: res.windowHeight / 2 - 200
        });
      }
    })
  },

  onShow: function () {

  },
=======

  touchend: function (e) {
    this.setData({
      indexShow: false
    })
  }
>>>>>>> Stashed changes

  // 摄像头函数在此
  onCameraOn: function(){
    console.log("Camera_On");
  }
})