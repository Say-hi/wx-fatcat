// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    itemArr: [
      'asdfasdfsd',
      '阿斯顿发撒旦法',
      'asdf阿斯顿发生阿斯顿发'
    ],
    moneyArr: [5, 10, 20]
  },
  chooseFastPay (e) {
    this.setData({
      fastPayIndex: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    if (options.fixed) { // 固定付款
      this.setData({
        fixed: true
      })
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
