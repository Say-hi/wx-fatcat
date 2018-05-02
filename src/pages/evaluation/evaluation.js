// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    scoreArr: [
      {
        t: '商品质量',
        c: 4,
        tr: '非常好'
      },
      {
        t: '物流服务',
        c: 4,
        tr: '非常好'
      },
      {
        t: '站点服务',
        c: 4,
        tr: '非常好'
      }
    ],
    textArr: ['差', '一般', '还行', '好', '非常好']
  },
  starChoose (e) {
    this.data.scoreArr[e.currentTarget.dataset.oindex].c = e.currentTarget.dataset.index
    this.data.scoreArr[e.currentTarget.dataset.oindex].tr = this.data.textArr[e.currentTarget.dataset.index]
    this.setData({
      scoreArr: this.data.scoreArr
    })
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
