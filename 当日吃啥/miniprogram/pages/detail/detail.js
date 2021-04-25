// pages/detail/detail.js
const db = wx.cloud.database();
const _ = db.command;
Page({

  data: {
    detailName: "",
    Suit_wea: "约20～30分钟",
    type: "",
    menu_effect:"",
    numOf: 3,
    step: [],
    listData: [],
  },

  onLoad: function (options) {
    let queryBean = JSON.parse(options.queryBean);
    console.log(queryBean)
    
    //查找菜谱
    db.collection("menu").where({
      menu_name: queryBean,
    }).get()
    .then(res => {
      console.log(res.data[0])
      this.setData({
        detailName:res.data[0].menu_name,
        type:res.data[0].menu_type,
        step:res.data[0].menu_step,
        menu_effect : res.data[0].menu_effect,
        Suit_wea:res.data[0].Suit_wea,
        menu_pic:res.data[0].menu_pic,
        // cfList:res.data
      })
    }),

    //查找材料
    db.collection("veg").where({
      menu_name: queryBean,
    }).get()
    .then(res => {
      console.log(res.data)
      this.setData({
        listData:res.data,
        // cfList:res.data,
      })
    })
  },

  onShow: function () {

  },

  numAdd: function () {
    let num = this.data.numOf
    this.setData({
      numOf: num + 1,
    })
    console.log(this.data.numOf)
  },

  numRed: function () {
    let num = this.data.numOf
    this.setData({
      numOf: num - 1,
    })
    console.log(this.data.numOf)
  },

})