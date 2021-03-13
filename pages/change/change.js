// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    curLang: {},
    langList: app.globalData.langList
  },
  onShow: function () {
    this.setData({ 'curLang': app.globalData.curLang })
  },
  onTapItem(e) {
    let langObj = e.currentTarget.dataset
    wx.setStorageSync('curLang', langObj)
    this.setData({'curLang': langObj})
    app.globalData.curLang = langObj
    wx.switchTab({ url: '/pages/index/index'})
  },
})
