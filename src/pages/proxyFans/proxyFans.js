// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
  },

  // 获取我的粉丝
  getFans (keyword) {
    let that = this
    app.wxrequest({
      url: app.getUrl().fansList,
      data: {
        keyword
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            list: res.data.data.fans_list
          })
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  search (e) {
    if (!e.detail.value.searchtext) return app.setToast(this, {content: '请输入搜索内容'})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
