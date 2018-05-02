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
  chooseTab (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
  delOrder (e) {
    wx.showToast({
      title: '模拟删除'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      type: options.type
    })
    if (options.type !== '5') {
      this.setData({
        currentIndex: options.type
      })
      app.setBar('退货退款')
    }
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
