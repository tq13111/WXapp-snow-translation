// pages/index/index.js
import translate from '../../utils/api'
const app = getApp()
Page({
  data: {
    hideClearIcon: false,
    query: '',
    result: [],
    curLang: {},
  },
  onLoad: function (options) {
    if (options.query) {
      this.setData({
        query: options.query
      })
    }
  },
  onShow: function (options) {
    this.setData({
      'curLang': app.globalData.curLang
    })
    this.onConfirm()

  },
  onInput: function (e) {
    this.setData({
      'query': e.detail.value
    })
    if (this.data.query.length > 0) {
      this.setData({
        'hideClearIcon': false
      })
    } else {
      this.setData({
        'hideClearIcon': true
      })
    }
  },
  onTapClose(e) {
    this.setData({
      hideClearIcon: true,
      query: ''
    })
  },
  onConfirm() {
    if (!this.data.query) return
    translate(this.data.query, {
        from: 'auto',
        to: this.data.curLang.lang
      })
      .then((data) => {
        this.setData({
          result: data.trans_result
        })
        let history = wx.getStorageSync("history") || [];
        if (history.length > 0) {
          history.forEach((item,index) => {
            if (item.result === data.trans_result[0].dst) {
              history.splice(index, 1)
            }
          })
        }
        history.unshift({
          query: this.data.query,
          result: data.trans_result[0].dst,
          curLang: this.data.curLang
        });
        history.length = history.length > 10 ? 10 : history.length;
        wx.setStorageSync("history", history);
      })
  }

})
