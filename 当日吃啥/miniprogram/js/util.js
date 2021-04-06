function gotoLogin() {
    if (!wx.getStorageSync("openid")) {
      wx.navigateTo({
        url: "/pages/login/login",
      })
      showErrorToast("请登录")
    }
  }
  
  function showLoading(title) {
    wx.showLoading({
      title: title,
    })
  }
  
  function navigateTo(url) {
    wx.navigateTo({
      url: url,
    })
  }
  
  function switchTab(url) {
    wx.switchTab({
      url: url,
    })
  }
  
  function showSuccessToast(title) {
    wx.showToast({
      title: title,
      icon: "success",
    })
  }
  
  function showErrorToast(title) {
    wx.showToast({
      title: title,
      icon: "error",
    })
  }
  
  function showNoneToast(title) {
    wx.showToast({
      title: title,
      icon: "none",
    })
  }
  
  function initStorageSync(key, value) {
    if (!wx.getStorageSync(key)) {
      wx.setStorageSync(key, value)
    }
  }
  
  module.exports = {
    gotoLogin,
    showLoading,
    navigateTo,
    switchTab,
    showSuccessToast,
    showErrorToast,
    showNoneToast,
    initStorageSync,
  }