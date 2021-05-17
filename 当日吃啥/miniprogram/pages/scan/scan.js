// pages/scan/scan.js
const db = wx.cloud.database()

Page({
 
  data: {
    
    rex: "",
   
  },

  onLoad: function (options) {
    let that = this
    let ans =[]

    let queryBean = JSON.parse(options.queryBean)
    let tempfilepath =JSON.parse(options.tempfilepathssss)

    that.setData({
      tmeppic: tempfilepath,
      name: queryBean
    })

    db.collection("veg").where({
      veg_name: queryBean,
    }).get()
    .then(res => {
      for(let i = 0; i < res.data.length; i++) {
        db.collection("menu").where({
          menu_name:res.data[i].menu_name
        }).get()
        .then(res=>{
          ans.push(res.data)
          that.setData({
            anss : ans,
          })
        })
      }
      that.setData({
        rex : res.data
      })
    })
  },

  find: function (e) {
    let queryBean = JSON.stringify(e.target.dataset.item.menu_name)
    wx.navigateTo({
      url: "../detail/detail?queryBean=" + queryBean,
    })
  },

})