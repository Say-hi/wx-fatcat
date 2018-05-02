// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    currentIndex: 0
  },
  scanCode () {
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log('扫码核销res', res)
      }
    })
  },
  confirm () {
    // todo 确认核销
    wx.showToast({
      title: '核销成功'
    })
    this.maskChange()
  },
  confirmInput () {
    wx.showToast({
      title: '核销成功'
    })
    this.MaskTwoChange()
  },
  maskChange (e) {
    (e && e.currentTarget.dataset.id) && this.setData({writeOffId: e.currentTarget.dataset.id})
    this.setData({
      mask: !this.data.mask
    })
  },
  MaskTwoChange (e) {
    this.setData({
      mask: (e && e.currentTarget.dataset.type) === 'close' ? !this.data.mask : false,
      mask_two: !this.data.mask_two
    })
  },
  call (e) {
    app.call(e.currentTarget.dataset.phone)
  },
  chooseTab (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
  search (e) {
    if (!e.detail.value.searchtext) return app.setToast(this, {content: '请输入搜索内容'})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      currentIndex: options.type
    })
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
