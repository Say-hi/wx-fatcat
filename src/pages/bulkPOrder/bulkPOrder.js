// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    page: 0,
    list: []
  },
  setFuck () {
    app.setFuck(this)
  },
  chooseTab (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      list: [],
      page: 0
    })
    this.getData()
  },
  delOrder (e) {
    wx.showToast({
      title: '模拟删除'
    })
  },
  getData () {
    let that = this
    app.wxrequest({
      url: app.getUrl().teamOrderList,
      data: {
        status: that.data.currentIndex * 1 + 1,
        p: ++that.data.page
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
  // 提醒发货
  orderMsg (e) {
    let that = this
    app.wxrequest({
      url: app.getUrl().orderMsg,
      data: {
        order_id: e.currentTarget.dataset.id,
        pickup_id: e.currentTarget.dataset.pid
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          app.setToast(that, {content: '已提醒商家发货'})
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
    this.getData()
    // TODO: onLoad
  },
  onReachBottom () {
    if (!this.data.more) return app.setToast(this, {content: '没有更多信息了'})
    this.getData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },
  onShareAppMessage (e) {
    return {
      title: `这里有好货，快来参团吧`,
      imageUrl: `${e.target.dataset.src}`,
      path: `/pages/goodsDetail/goodsDetail?type=bulkP&id=${e.target.dataset.id}`
    }
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
