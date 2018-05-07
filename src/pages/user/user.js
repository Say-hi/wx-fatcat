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
        num: 1
      },
      {
        ico: 'icon-daifahuo1',
        t: '待发货',
        num: 123
      },
      {
        ico: 'icon-daifahuo',
        t: '待收货'
      },
      {
        ico: 'icon-icon-receive',
        t: '已收货'
      },
      {
        ico: 'icon-shouhou',
        t: '退款/售后'
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
        url: '../sendWorker/sendWorker'
      },
      {
        ico: 'icon-3',
        t: '代理端',
        url: '../proxy/proxy'
      }
    ]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.setData({
      userInfo: app.gs('userInfo')
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