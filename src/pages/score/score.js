// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    list: []
  },
  // 关闭规则
  close () {
    if (this.data.small) return
    this.setData({
      small: true
    })
    setTimeout(() => {
      this.setData({
        show: false
      })
    }, 500)
  },
  show () {
    this.setData({
      show: true,
      small: false
    })
  },
  pointsList () {
    let that = this
    app.wxrequest({
      url: app.getUrl().pointsList,
      data: {
        p: ++that.data.page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          for (let v of res.data.data.list) {
            v.change_time = new Date(v.change_time * 1000).toLocaleString()
          }
          that.setData({
            rule: res.data.data.rule,
            list: that.data.list.concat(res.data.data.list),
            more: res.data.data.list.length < 10 ? 0 : 1
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
      options
    })
    this.pointsList()
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },
  onReachBottom () {
    if (!this.data.more) return app.setToast(this, {content: '没有更多信息了'})
    this.pointsList()
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
