// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'money',
    userMoney: '0.00',
    page: 0,
    lists: [],
    show: false
  },
  show () {
    this.setData({
      show: !this.data.show
    })
  },
  charge (e) {
    this.setData({
      show: false
    })
  },
  // 获取交易流水
  getData (p) {
    let that = this
    app.wxrequest({
      url: app.getUrl().accountList,
      data: {
        // type: 1,
        // p
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          // if (res.data.data.lists.length) {
          //   for (let v of res.data.data.lists) {
          //     v.add_time = new Date(v.add_time * 1000).toLocaleString()
          //   }
          // }
          // that.setData({
          //   lists: that.data.lists.concat(res.data.data.lists),
          //   userMoney: res.data.data.user_money,
          //   more: res.data.data.lists.length < 10 ? 0 : 1
          // })
          that.setData({
            lists: res.data.data.list,
            userMoney: res.data.data.user_money
            // more: res.data.data.lists.length < 10 ? 0 : 1
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
      userMoney: options.money
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
    this.setData({
      page: 0,
      lists: []
    })
    this.getData(++this.data.page)
    // TODO: onShow
  },
  // onReachBottom () {
  //   if (!this.data.more) return app.setToast(this, {content: '没有更多数据啦~'})
  //   this.getData(++this.data.page)
  // },
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
