// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'proxyMyDetail',
    page: 0,
    list: []
  },
  // 提现明细
  withdrawalsList () {
    let that = this
    app.wxrequest({
      url: app.getUrl().withdrawalsList,
      data: {
        p: ++that.data.page
      },
      success (res) {
        wx.hideLoading()
        for (let v of res.data.data.list) {
          v.create_time = new Date(v.create_time * 1000).toLocaleString()
        }
        that.setData({
          TiBaiWan: res.data.data.total_money || 0,
          list: that.data.list.concat(res.data.data.list),
          more: res.data.data.list.length < 10 ? 0 : 1
        })
      }
    })
  },
  // 推广
  tgList () {
    let that = this
    app.wxrequest({
      url: app.getUrl().tgList,
      data: {},
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          for (let v of res.data.data.list) {
            for (let s of v.list) {
              s.add_time = new Date(s.add_time * 1000).toLocaleString()
            }
          }
          that.setData({
            tgList: res.data.data.list
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
    app.setBar(options.type)
    if (options.type === '提现明细') {
      this.setData({
        show: true
      })
      this.withdrawalsList()
    } else {
      this.tgList()
    }
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },
  onReachBottom () {
    if (!this.data.more) return app.setToast(this, {content: '没有更多数据啦~'})
    this.withdrawalsList()
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
