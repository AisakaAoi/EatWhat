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

function shuffle(arr, flag = false) {
  let newArr = []
  flag ? (newArr = arr) : (newArr = arr.slice(0))
  for (let i = 0; i < newArr.length; i++) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = newArr[i]
      newArr[i] = newArr[j]
      newArr[j] = temp
  }
  return newArr
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
  shuffle,
}