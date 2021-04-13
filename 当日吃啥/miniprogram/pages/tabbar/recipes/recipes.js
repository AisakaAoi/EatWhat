// pages/tabbar/recipes/recipes.js
const recList = require("../../../js/list")
Page({

  data: {
    imgB64: '',
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

  },
  ////////////////////////////////////////////////////////////////   下面是菜谱识别
  onCameraOn: function () {
    this.chooseImg();
    this.foodTap()

  },
  chooseImg: function () {
    let that = this;
    that.setData({
      ishow: false,
      content: ''
    });
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        that.getB64ByUrl(tempFilePaths);
        that.setData({
          img: tempFilePaths
        });
      }
    })
  },
  getB64ByUrl: function (url) {
    let that = this;
    const FileSystemManager = wx.getFileSystemManager();
    FileSystemManager.readFile({
      filePath: url,
      encoding: 'base64',
      success(res) {
        that.setData({
          imgB64: res.data
        });
      }
    })
  },
  foodTap: function () {
    let that = this;
    const imgB64 = that.data.imgB64;
    if (!imgB64) {
      wx.showToast({
        title: '请上传图片',
      })
      return;
    };
    that.getToken(function (token) {
      that.getResult(token);
    });
  },
  getToken: function (callback) {
    let that = this;
    var apiKey = 'C9RTmGyhYhTZfkU2ZNcNEf3Q';    
    var secKey = 'znIPcjmI9XF16vkUksqfcGGjbqhfMj4f';    
    var tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secKey}`; 
    wx.request({
    url: tokenUrl,        
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success(res) {
        var token = res.data.access_token;
        return callback(token);
      }
    });
  },
  getResult: function (token) {
    let that = this;
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=' + token,//菜品识别
      // url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/classify/ingredient?access_token=' + token,//蔬菜识别
      method: "post",
      data: {
        image: that.data.imgB64,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.result[0].name)
      }
    });
  },

/////////////////////////////////////////////////////////////////////////////////////////
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
  showDetail: function (e) {
    console.log(e.target.dataset.src)
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
  

  touchstart: function (e) {
    this.setData({
      indexId: e.target.id,
      toView: e.target.id.toLowerCase(),
      indexy: e.touches[0].pageY,
      indexShow: true,
      indexEnglish: e.target.id
    })
  },

  touchmove: function (e) {
    this.y = this.getArrIndex(e.target.id);
    var indexY = e.touches[0].pageY;
    if (this.getArrEnglish(Math.round((indexY - this.data.indexy) / 15), this.y)) {
      this.setData({
        toView: this.getArrEnglish(Math.round((indexY - this.data.indexy) / 15), this.y).toLowerCase(),
        indexEnglish: this.getArrEnglish(Math.round((indexY - this.data.indexy) / 15), this.y)
      })
    }
  },

  touchend: function (e) {
    this.setData({
      indexShow: false
    })
  },
  
})