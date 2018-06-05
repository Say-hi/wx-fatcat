// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  // 是否隐藏商品信息切换
  showGoods (e) {
    this.setData({
      showGoods: e.detail.value ? 1 : 0
    })
  },
  // 是否指定平分人数
  samePay (e) {
    this.setData({
      sameP: e.detail.value ? 1 : 0
    })
  },
  inputValue (e) {
    let money = 0
    if (e.detail.value > 0) {
      money = (this.options.calculateMoney / e.detail.value).toFixed(2)
      if (money <= 0.01) {
        money = 0.01
      }
    }
    this.setData({
      payPeople: e.detail.value,
      peoplePay: money
    })
  },
  // 生成代付订单
  shareOrder () {
    let that = this
    if (this.data.sameP === 1) {
      if (!this.data.payPeople) return app.setToast(that, {content: '请指定付款人数'})
    }
    app.wxrequest({
      url: app.getUrl().createDaifuOrder,
      data: {
        order_id: that.data.options.id,
        per_money: that.data.sameP === 1 ? that.data.peoplePay : 0,
        is_hiden: that.data.showGoods || 0,
        d_order_type: that.data.sameP === 1 ? 1 : 2,
        total_num: that.data.sameP === 1 ? that.data.payPeople : 0
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            sendOrder: res.data.data
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
    this.setData({
      options,
      userInfo: app.gs('userInfo'),
      menuArr: app.gs('otherPayInfo')
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
  onShareAppMessage () {
    return {
      title: `快来帮${this.data.userInfo.nickName}代付吧`,
      path: `/pages/otherReceive/otherReceive?id=${this.data.options.id}`
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
