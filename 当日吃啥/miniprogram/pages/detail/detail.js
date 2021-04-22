// pages/detail/detail.js
Page({

  data: {
    detailName: "鸡蛋腐竹蘑菇锅",
    time: "约20～30分钟",
    difficulty: "零厨艺",
    numOf: 3,
    listData: [{
      "material": "腐竹（泡发）",
      "quantity": 250,
      "unit": "g"
    },
    {
      "material": "鸡蛋",
      "quantity": 2,
      "unit": "个"
    },
    {
      "material": "白玉菇",
      "quantity": 100,
      "unit": "g"
    },
    {
      "material": "小葱",
      "quantity": 2,
      "unit": "根"
    }
  ],
    step: [
      "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
      "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
      "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
      "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
      "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
      "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
    ],
  },

  onLoad: function () {

  },

  onShow: function () {

  },

  numAdd: function(){
    let num = this.data.numOf;
    this.setData({
      numOf: num+1
    })
    console.log(this.data.numOf)
  },

  numRed: function() {
    let num = this.data.numOf;
    this.setData({
      numOf: num-1
    })
    console.log(this.data.numOf)
  },

})