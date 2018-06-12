// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allMoney: 0
  },
  getAll () {
    this.setData({
      all: this.data.allMoney
    })
  },
  // 提现
  confirm (e) {
    if (!e.detail.value.money) return app.setToast(this, {content: '请输入提现金额'})
    else if (e.detail.value.money > this.data.allMoney) return app.setToast(this, {content: '可提现金额不足'})
    // if (e.detail.value.money <= 0 || e.detail.value > this.data.allMoney) return app.setToast(this, {content: '请输入合理的提现金额'})
    let that = this
    app.wxrequest({
      url: app.getUrl().withdrawals,
      data: {
        money: e.detail.value.money
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          app.setToast(that, {content: '提现已受理'})
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  performance () {
    let that = this
    app.wxrequest({
      url: app.getUrl().performance,
      data: {},
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            allMoney: res.data.data.info.user_money || 0
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
    this.performance()
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
