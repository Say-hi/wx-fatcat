// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    currentIndex: 0,
    list: [],
    page: 0,
    typeArr: ['', 'WAITPAY', 'WAITSEND', 'WAITRECEIVE', 'FINISH']
  },
  scanCode () {
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log('扫码核销res', res)
      }
    })
  },
  // 核销订单
  orderConfirm (code) {
    let that = this
    app.wxrequest({
      url: app.getUrl().orderConfirm,
      data: {
        pickup_code: code
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          wx.showToast({
            title: '核销成功'
          })
          that.MaskTwoChange()
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  confirm (e) {
    // todo 确认核销
    this.orderConfirm(e.currentTarget.dataset.code)
    this.maskChange()
  },
  confirmInput (e) {
    this.orderConfirm(e.detail.value.code)
  },
  maskChange (e) {
    (e && e.currentTarget.dataset.id) && this.setData({writeOffId: e.currentTarget.dataset.id, code: e.currentTarget.dataset.code})
    this.setData({
      mask: !this.data.mask
    })
  },
  MaskTwoChange (e) {
    this.setData({
      mask: (e && e.currentTarget.dataset.type) === 'close' ? !this.data.mask : false,
      mask_two: !this.data.mask_two
    })
  },
  call (e) {
    app.call(e.currentTarget.dataset.phone)
  },
  chooseTab (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      list: [],
      page: 0
    })
    this.proxyOrderList()
  },
  search (e) {
    if (!e.detail.value.searchtext) return app.setToast(this, {content: '请输入搜索内容'})
  },
  cancel (e) {
    let that = this
    app.wxrequest({
      url: app.getUrl().cancel,
      data: {
        order_id: e.currentTarget.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status * 1 === 1) {
          wx.showToast({
            title: '取消成功',
            mask: true
          })
          setTimeout(() => {
            if (that.data.type !== '5') that.getOrderList(that.data.typeArr[that.data.currentIndex])
            else that.getreturnGoodsList()
          }, 1400)
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  sendMsg (e) {
    let that = this
    app.wxrequest({
      url: app.getUrl().proxySendMsg,
      data: {
        order_id: e.currentIndex.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          wx.showToast({
            title: '发送成功',
            mask: true
          })
          setTimeout(() => {

          }, 1400)
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  proxyOrderList () {
    let that = this
    app.wxrequest({
      url: app.getUrl().proxyOrderList,
      data: {
        type: that.data.typeArr[that.data.currentIndex],
        page: ++that.data.page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            list: that.data.list.concat(res.data.data.list),
            more: res.data.data.list.length < 10 ? 0 : 1
          })
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  onReachBottom () {
    if (!this.data.more) return app.setToast(this, {content: '没有更多订单了'})
    this.proxyOrderList()
  },
  sendOrder (e) {
    let that = this
    app.wxrequest({
      url: app.getUrl().proxyDelivery,
      data: {
        order_id: e.currentIndex.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
           wx.showToast({
             title: '该订单发货',
             mask: true
           })
          setTimeout(() => {
             let e = {
               currentTarget: {
                 dataset: {
                   index: that.data.currentIndex
                 }
               }
             }
             that.chooseTab(e)
          }, 1400)
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
      currentIndex: options.type
    })
    this.proxyOrderList()
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
