// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 2,
    sendMoney: 0,
    timeIndex: 0,
    shopIndex: 0,
    timeArr: ['12:00-14:00', '14:00-16:00', '12:00-14:00', '14:00-16:00'],
    shopArr: [{pickup_name: '选择您附近的门店地址'}]
  },
  fuckScore (e) {
    this.setData({
      fuck_score: e.detail.value
    })
  },
  bindPickerChange (e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },
  bindShopPickerChange (e) {
    this.setData({
      shopIndex: e.detail.value * 1
    })
  },
  chooseSendType (e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  // 选择地址
  chooseAddress () {
    let that = this
    wx.chooseAddress({
      success (res) {
        if (res.telNumber) { // 获取信息成功
          wx.setStorageSync('addressInfo', res)
          that.setData({
            needSetting: false,
            addressInfo: res
          })
        }
      },
      fail () {
        wx.getSetting({
          success (res) {
            if (!res.authSetting['scope.address']) {
              that.setData({
                needSetting: true
              })
              app.setToast(that, {content: '需授权获取地址信息'})
            }
          }
        })
      }
    })
  },
  // 获取设置
  openSetting () {
    let that = this
    wx.openSetting({
      success (res) {
        // console.log(res)
        if (res.authSetting['scope.address']) {
          that.setData({
            needSetting: false
          })
          that.chooseAddress()
        }
      }
    })
  },
  // 选择支付方式
  choosePay () {
    if (!this.data.shopIndex) return app.setToast(this, {content: '请选择您附近的门店地址'})
    if (!this.data.addressInfo) return app.setToast(this, {content: '请选择您的收货地址'})
    wx.showActionSheet({
      itemList: ['微信支付', '猫豆支付', '找人代付'],
      itemColor: '#333',
      success (res) {
        console.log(res.tapIndex)
        wx.showToast({
          title: '模拟支付成功'
        })
        if (res.tapIndex === 2) {
          wx.redirectTo({
            url: '../otherPay/otherPay?id=123'
          })
        } else {
          wx.redirectTo({
            url: '../order/order?type=2'
          })
        }
        wx.removeStorageSync('goodsStorage')
        wx.removeStorageSync('useCoupon')
      }
    })
  },
  // 计算价格
  calculateMoney () {
    this.setData({
      calculateMoney: this.data.useCoupon ? this.data.allMoney * 1 + this.data.sendMoney * 1 - this.data.useCoupon.del : this.data.allMoney * 1 + this.data.sendMoney * 1
    })
  },
  // 倒计时
  showLostTime (startTime) {
    let endTime = startTime * 1000 + 900000 // 超时15分钟
    let timer = setInterval(() => {
      if (endTime - new Date().getTime() <= 0) {
        // todo 取消订单
        clearInterval(timer)
        app.setToast(this, {content: '该订单超时支付已取消'})
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
        return
      }
      let lost = parseInt((endTime - (new Date().getTime())) / 1000)
      // let m = parseInt(lost / 60)
      // let s = lost % 60
      this.setData({
        timeText: parseInt(lost / 60) === 0 ? lost % 60 + '秒' : parseInt(lost / 60) + '分' + lost % 60 + '秒'
      })
    }, 100)
  },
  // 获取购物车列表
  getCarList () {
    let that = this
    app.wxrequest({
      url: app.getUrl().cart2,
      data: {},
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            menuArr: res.data.data.cartList,
            sendMoney: res.data.data.cartPriceInfo.shipping_price || 0,
            userInfo: res.data.data.user,
            allCount: res.data.data.cartPriceInfo.goods_num,
            shopArr: that.data.shopArr.concat(res.data.data.pickupList)
          })
          that.calculateMoney()
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  inputValue (e) {
    this.setData({
      userNote: e.detail.value
    })
  },
  // 提交订单
  submitOrder () {
    let that = this
    app.wxrequest({
      url: app.getUrl().cart3,
      data: {
        address: that.data.addressInfo.provinceName + that.data.addressInfo.cityName + that.data.addressInfo.countyName + that.data.addressInfo.detailInfo,
        consignee: that.data.addressInfo.userName,
        mobile: that.data.addressInfo.telNumber,
        pay_points: that.data.fuck_score ? that.data.userInfo.pay_points : 0,
        act: 'submit_order',
        user_note: that.data.userNote || ''
      },
      success (res) {
        wx.hideLoading()
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    /*eslint-disable*/
    // new Date(new Date().getTime() + 1500000)
    this.setData({
      lostTime: options.type === 'second' ? true : false,
      menuArr: app.gs('goodsStorage'),
      sendTime: new Date(new Date().getTime() + 1500000).toLocaleString(),
      allMoney: options.money || 0
    })
    if (options.time) {
      this.showLostTime(options.time)
    }
    this.getCarList()
    // this.calculateMoney()
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
    // if (app.gs('useCoupon')) {
    //   this.setData({
    //     useCoupon: app.gs('useCoupon')
    //   })
    // }
    // if (app.gs('addressInfo')) {
    //   this.setData({
    //     addressInfo: app.gs('addressInfo')
    //   })
    // }
    // this.calculateMoney()
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
    wx.removeStorageSync('useCoupon')
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
