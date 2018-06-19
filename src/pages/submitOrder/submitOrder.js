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
    timeArr: [
      '站点常规配送时间',
      '00:00-01:00',
      '01:00-02:00',
      '02:00-03:00',
      '03:00-04:00',
      '04:00-05:00',
      '05:00-06:00',
      '06:00-07:00',
      '07:00-08:00',
      '08:00-09:00',
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00',
      '18:00-19:00',
      '19:00-20:00',
      '20:00-21:00',
      '21:00-22:00',
      '22:00-23:00',
      '23:00-00:00'
    ],
    shopArr: [{pickup_name: '选择您附近的门店地址'}]
  },
  fuckScore (e) {
    this.setData({
      fuck_score: e.detail.value
    })
    this.calculateMoney()
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
    let that = this
    wx.showActionSheet({
      itemList: ['微信支付', '猫豆支付', '找人代付'],
      itemColor: '#333',
      success (res) {
        that.submitOrder(res)
      }
    })
  },
  // 计算价格
  calculateMoney () {
    let money = (this.data.useCoupon ? this.data.fuck_score ? this.data.allMoney - this.data.useCoupon.del - this.data.userInfo.pay_points / 100 : this.data.allMoney - this.data.useCoupon.del : this.data.fuck_score ? this.data.allMoney - this.data.userInfo.pay_points / 100 : this.data.allMoney).toFixed(2)
    if (money <= 0) {
      money = '0.00'
    }
    this.setData({
      calculateMoney: money
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
      this.setData({
        timeText: parseInt(lost / 60) === 0 ? lost % 60 + '秒' : parseInt(lost / 60) + '分' + lost % 60 + '秒'
      })
    }, 100)
  },
  // 获取购物车列表
  getCarList (options) {
    let that = this
    let data = {}
    this.setData({
      options
    })
    if (options.type === 'buyNow') {
      data = Object.assign({action: 'buy_now', goods_id: options.id, goods_num: options.num})
    } else if (options.type === 'bulkpBuy' && options.group_by * 1 === 1) {
      data = Object.assign({action: 'buy_now', group_buy: 0, goods_id: options.id, team_id: options.prom_id, goods_num: options.num})
    } else if (options.type === 'bulkpBuy' && options.group_by * 1 !== 1) {
      data = Object.assign({action: 'buy_now', group_buy: 1, goods_id: options.id, team_id: options.prom_id, goods_num: options.num})
    }
    app.wxrequest({
      url: app.getUrl().cart2,
      data,
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            menuArr: res.data.data.cartList,
            sendMoney: res.data.data.cartPriceInfo.shipping_price || 0, // 送货费
            allMoney: res.data.data.cartPriceInfo.total_fee * 1 || 0, // 商品当前总价
            userInfo: res.data.data.user,
            delivery_time: that.data.timeArr[that.data.timeIndex],
            allCount: res.data.data.cartPriceInfo.goods_num,
            shopArr: that.data.shopArr.concat(res.data.data.pickupList),
            coupon: res.data.data.userCartCouponList
          })
          that.calculateMoney()
        } else {
          console.log(res.data.msg.msg)
          if (res.data.msg.status === 0) {
            app.setToast(that, {content: res.data.msg.msg})
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          } else {
            app.setToast(that, {content: res.data.msg})
          }
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
  submitOrder (res) {
    let that = this
    let data = {
      address: that.data.addressInfo.provinceName + that.data.addressInfo.cityName + that.data.addressInfo.countyName + that.data.addressInfo.detailInfo,
      consignee: that.data.addressInfo.userName,
      mobile: that.data.addressInfo.telNumber,
      pay_points: that.data.fuck_score ? that.data.userInfo.pay_points : 0,
      act: 'submit_order',
      user_note: that.data.userNote || '',
      deliver_type: that.data.active,
      coupon_id: app.gs('useCoupon').cid || '',
      pickup_id: that.data.shopArr[that.data.shopIndex].pickup_id
    }
    if (that.data.options.type === 'buyNow') { // 立即购买
      data = Object.assign({
        action: 'buy_now',
        goods_id: that.data.options.id,
        goods_num: that.data.options.num
      }, data)
    } else if (that.data.options.type === 'bulkpBuy') { // 拼团
      data = Object.assign({
        action: 'buy_now',
        goods_id: that.data.options.id,
        goods_num: that.data.options.num,
        group_buy: that.data.options.group_by * 1 === 1 ? '0' : '1',
        team_id: that.data.options.prom_id
      }, data)
    }
    app.wxrequest({
      url: app.getUrl().cart3,
      data,
      success (res2) {
        wx.hideLoading()
        if (res2.data.status === 200) {
          that.setData({
            orderInfo: res2.data.data.order
          })
          if (res.tapIndex === 2) {
            app.su('otherPayInfo', that.data.menuArr)
            wx.redirectTo({
              url: '../otherPay/otherPay?id=' + res2.data.data.order.order_id + `&calculateMoney=${res2.data.data.order.order_amount || that.data.calculateMoney}`
            })
          } else if (res.tapIndex === 0) {
            that.wechatPay()
          } else if (res.tapIndex === 1) {
            that.catPay()
          }
        } else {
          app.setToast(that, {content: res2.data.msg})
        }
      }
    })
  },
  // 微信支付
  wechatPay () {
    let that = this
    app.wxrequest({
      url: app.getUrl().payByOrder,
      data: {
        order_id: that.data.orderInfo.order_id,
        pay_type: 1
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          app.wxpay(Object.assign({
            success (payRes) {
              if (payRes.errMsg === 'requestPayment:ok') {
                wx.showToast({
                  title: '支付成功',
                  mask: true
                })
                wx.removeStorageSync('goodsStorage')
                wx.removeStorageSync('useCoupon')
                let url = that.data.options.type === 'bulkpBuy' ? '../bulkPOrder/bulkPOrder' : '../order/order?type=2'
                setTimeout(() => {
                  wx.redirectTo({
                    url
                  })
                }, 1400)
              }
            },
            fail () {
              wx.showToast({
                title: '支付失败'
              })
            }
          }, res.data.data))
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  // 猫豆支付
  catPay () {
    let that = this
    app.wxrequest({
      url: app.getUrl().payByOrder,
      data: {
        order_id: that.data.orderInfo.order_id,
        pay_type: 2
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          wx.showToast({
            title: '支付成功',
            mask: true
          })
          wx.removeStorageSync('goodsStorage')
          wx.removeStorageSync('useCoupon')
          let url = that.data.options.type === 'bulkpBuy' ? '../bulkPOrder/bulkPOrder' : '../order/order?type=2'
          setTimeout(() => {
            wx.redirectTo({
              url
            })
          }, 1400)
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  // 设置红包缓存
  setCoupon () {
    app.su('setCoupon', this.data.coupon)
  },
  // 设置使用红包
  useCoupon () {
    this.setData({
      useCoupon: app.gs('useCoupon') || null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    /*eslint-disable*/
    // new Date(new Date().getTime() + 1500000)
    // type=bulkpBuy&id=3&num=87&group_by=1&prom_id=1
    this.setData({
      options
    })
    this.setData({
      lostTime: options.type === 'second' ? true : false,
      // menuArr: app.gs('goodsStorage'),
      sendTime: new Date(new Date().getTime() + 1500000).toLocaleString(),
      allMoney: options.money || 0
    })
    if (options.time) {
      this.showLostTime(options.time)
    }
    this.getCarList(options)
    // this.calculateMoney()
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
    this.useCoupon()
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
    wx.removeStorageSync('useCoupon')
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
