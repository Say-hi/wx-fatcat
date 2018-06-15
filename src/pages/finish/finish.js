// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  call () {
    app.call(this.data.info.pickup_phone)
  },
  // 复制订单编号
  copyNumber (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.num,
      success () {
        wx.showToast({
          title: '已复制'
        })
      }
    })
  },
  getData (id) {
    let that = this
    app.wxrequest({
      url: app.getUrl().orderDetail,
      data: {
        order_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          res.data.data.order_info.add_time = new Date(res.data.data.order_info.add_time * 1000).toLocaleString()
          res.data.data.order_info.pay_time = new Date(res.data.data.order_info.pay_time * 1000).toLocaleString()
          that.setData({
            info: res.data.data.order_info,
            teamInfo: res.data.data.team_info,
            teamUserList: res.data.data.team_user_list
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
    this.getData(options.id)
    app.setFuck(this)
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
