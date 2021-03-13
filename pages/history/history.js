// logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    list: []
  },
  onShow() {
    this.setData({
      list: wx.getStorageSync('history')
    })
  },
  onTapItem(e) {
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}`,
    })
    app.globalData.curLang = {
      chs: e.currentTarget.dataset.chs,
      lang: e.currentTarget.dataset.lang,
      index: e.currentTarget.dataset.index
    }
  }

})
