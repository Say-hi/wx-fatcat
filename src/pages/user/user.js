// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderArr: [
      {
        ico: 'icon-qianbao',
        t: '待付款',
        num: 0
      },
      {
        ico: 'icon-daifahuo1',
        t: '待发货',
        num: 0
      },
      {
        ico: 'icon-daifahuo',
        t: '待收货',
        num: 0
      },
      {
        ico: 'icon-icon-receive',
        t: '已收货',
        num: 0
      },
      {
        ico: 'icon-shouhou',
        t: '退款/售后',
        num: 0
      }
    ],
    operationArr: [
      {
        ico: 'icon-pintuanzhuanqu',
        t: '我的拼团',
        url: '../bulkPOrder/bulkPOrder'
      },
      {
        ico: 'icon-youhuiquan',
        t: '我的优惠券',
        url: '../coupon/coupon'
      },
      {
        ico: 'icon-QR',
        t: '我的取货码',
        url: '../qrCode/qrCode'
      },
      {
        ico: 'icon-dizhi',
        t: '我的地址'
      },
      {
        ico: 'icon-huoliutongzhi',
        t: '送货员',
        url: ''
      },
      {
        ico: 'icon-3',
        t: '代理端',
        url: ''
      }
    ]
  },
  setFuck () {
    app.setFuck(this)
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
  noOperation () {
    app.setToast(this, {content: '您无相关权限,请联系管理员开通'})
  },
  // 获取用户信息
  getUserInfo () {
    let that = this
    app.wxrequest({
      url: app.getUrl().userInfo,
      data: {},
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.data.orderArr[0].num = res.data.data.user.waitPay
          that.data.orderArr[1].num = res.data.data.user.waitSend
          that.data.orderArr[2].num = res.data.data.user.waitReceive
          that.data.orderArr[3].num = res.data.data.user.uncomment_count
          that.data.operationArr[4].url = res.data.data.user.is_deliver * 1 !== 0 ? '../sendWorker/sendWorker' : ''
          that.data.operationArr[5].url = res.data.data.user.is_proxy * 1 !== 0 ? '../proxy/proxy' : ''
          that.setData({
            userInfo: res.data.data.user,
            orderArr: that.data.orderArr,
            operationArr: that.data.operationArr
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
    this.setFuck()
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
    this.getUserInfo()
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
