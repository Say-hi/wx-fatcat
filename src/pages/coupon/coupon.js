// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    currentIndex: 0,
    page: 0
  },
  chooseTab (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      page: 0,
      couponList: []
    })
    this.getCoupon()
  },
  chooseCoupon (e) {
    if (this.data.type === 'order') {
      app.su('useCoupon', this.data.couponList[e.currentTarget.dataset.index])
      wx.navigateBack({
        delta: 1
      })
    }
  },
  getCoupon () {
    let that = this
    app.wxrequest({
      url: app.getUrl().coupon,
      data: {
        type: that.data.currentIndex,
        p: ++that.data.page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          for (let v of res.data.data.coupon_list) {
            v.use_start_time = new Date(v.use_start_time * 1000).toLocaleDateString()
            v.use_end_time = new Date(v.use_end_time * 1000).toLocaleDateString()
          }
          that.setData({
            couponList: that.data.couponList.concat(res.data.data.coupon_list),
            more: res.data.data.coupon_list.length < 10 ? 0 : 1
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
  onLoad (options) {
    if (options.type === 'order') {
      this.setData({
        type: options.type
      })
      let s = app.gs('setCoupon')
      for (let v of s) {
        v.coupon.use_start_time = new Date(v.coupon.use_start_time * 1000).toLocaleDateString()
        v.coupon.use_end_time = new Date(v.coupon.use_end_time * 1000).toLocaleDateString()
      }
      this.setData({
        couponList: s || [],
        needUseCoupon: true
      })
    } else {
      this.getCoupon()
    }
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },
  onReachBottom () {
    if (!this.data.more) return app.setToast(this, {content: '没有更多信息了'})
    this.getCoupon()
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
    wx.removeStorageSync('setCoupon')
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
