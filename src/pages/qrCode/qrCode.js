// 获取全局应用程序实例对象
const app = getApp()
const wxBarCode = require('../../utils/index')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsArr: [],
    code: ''
  },
  showQR (e) {
    this.setData({
      show: true,
      code: e.currentTarget.dataset.code
    })
    wxBarCode.qrcode('qrcode', e.currentTarget.dataset.code, 420, 420)
  },
  close () {
    this.setData({
      show: false
    })
  },
  getList () {
    let that = this
    app.wxrequest({
      url: app.getUrl().orderList,
      data: {},
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          for (let v of res.data.data.list) {
            v.add_time = new Date(v.add_time * 1000).toLocaleString()
          }
          that.setData({
            goodsArr: res.data.data.list
          })
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getList()
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
