// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseIndex: -1,
    chargeArr: [
      {
        m: 50,
        t: 54
      },
      {
        m: 50,
        t: 54
      },
      {
        m: 50,
        t: 54
      }
    ]
  },
  // 选择快速充值
  chooseFastMoney (e) {
    this.setData({
      chooseIndex: e.currentTarget.dataset.index
    })
    // todo chargeMoney
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      userMoney: options.userMoney || 0
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
