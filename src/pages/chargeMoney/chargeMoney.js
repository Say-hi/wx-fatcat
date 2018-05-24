// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseIndex: -1,
    chargeArr: [
      {
        m: 0.01,
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
      chooseIndex: e.currentTarget.dataset.index,
      inputMoney: this.data.chargeArr[e.currentTarget.dataset.index].m
    })
    // todo chargeMoney
  },
  chargeMoney (money) {
    let that = this
    app.wxrequest({
      url: app.getUrl().payByAccount,
      data: {
        money
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          let obj = {
            success (res) {
              if (res.errMsg === 'requestPayment:ok') {
                wx.showToast({
                  title: '充值成功'
                })
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              } else {
                wx.showToast({
                  title: '充值失败'
                })
              }
            },
            fail () {
              wx.showToast({
                title: '充值失败'
              })
            }
          }
          app.wxpay(Object.assign(res.data.data, obj))
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  charge (e) {
    if (e.detail.value.inputmoney <= 0) return app.setToast(this, {content: '请输入购买金额'})
    this.chargeMoney(e.detail.value.inputmoney)
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
