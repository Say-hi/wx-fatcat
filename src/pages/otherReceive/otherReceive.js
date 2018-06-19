// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    basedomain: app.data.basedomain,
    moneyArr: [5, 10, 20]
  },
  chooseFastPay (e) {
    this.setData({
      fastPayIndex: e.currentTarget.dataset.index,
      fastPayMoney: this.data.moneyArr[e.currentTarget.dataset.index]
    })
  },
  // 用户支付
  otherPay (res, e) {
    let that = this
    app.wxrequest({
      url: app.getUrl().payByOrderTa,
      data: {
        order_id: that.data.options.id,
        pay_type: res.tapIndex === 0 ? 1 : res.tapIndex === 1 ? 4 : '',
        pay_money: e.detail.value.money
      },
      success (res2) {
        wx.hideLoading()
        if (res2.data.status === 200) {
          if (res.tapIndex === 0) {
            app.wxpay(Object.assign({
              success (payRes) {
                if (payRes.errMsg === 'requestPayment:ok') {
                  wx.showToast({
                    title: '代付成功',
                    mask: true
                  })
                  setTimeout(() => {
                    wx.reLaunch({
                      url: '../index/index'
                    })
                  }, 1400)
                }
              },
              fail () {
                wx.showToast({
                  title: '支付失败'
                })
              }
            }, res2.data.data))
          } else if (res.tapIndex === 1) {
            wx.showToast({
              title: '代付成功',
              mask: true
            })
            setTimeout(() => {
              wx.reLaunch({
                url: '../index/index'
              })
            }, 1400)
          }
        } else {
          app.setToast(that, {content: res2.data.msg})
        }
      }
    })
  },
  payMoneyPer () {
    let that = this
    let e = {
      detail: {
        value: {
          money: that.data.orderInfo.daifuOrder.per_money
        }
      }
    }
    this.inputPay(e)
  },
  inputPay (e) {
    let that = this
    if (e.detail.value.money <= 0) return app.setToast(this, {content: '请输入代付金额'})
    wx.showActionSheet({
      itemList: ['微信支付', '猫豆支付'],
      itemColor: '#333',
      success (res) {
        if (res.tapIndex !== 0 && res.tapIndex !== 1) return app.setToast(that, {content: '取消了代付'})
        that.otherPay(res, e)
      },
      fail () { app.setToast(that, {content: '取消了代付'}) }
    })
  },
  orderTa (id) {
    this.setData({
      needUserInfo: true
    })
    let that = this
    app.wxrequest({
      url: app.getUrl().orderTa,
      data: {
        order_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            orderInfo: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  MaskGetUserInfo (e) {
    if (e.detail.iv) {
      app.wxlogin(this.orderTa, this.data.options.id)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    console.log('options', options)
    this.setData({
      options
    })
    if (app.gs('userInfo')) {
      this.setData({
        needUserInfo: true
      })
      app.wxlogin(this.orderTa, options.id)
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
