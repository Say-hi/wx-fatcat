// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    top_img: '../../images/proxy_top.png',
    orderArr: [
      {
        ico: 'icon-qianbao',
        t: '待付款',
        num: 1
      },
      {
        ico: 'icon-daifahuo1',
        t: '已付款',
        num: 123
      },
      {
        ico: 'icon-mendianzitidaihexiaosvg',
        t: '待核销'
      },
      {
        ico: 'icon-icon-receive',
        t: '已核销'
      }
    ],
    operation: [
      {
        i: 'icon-msnui-task-inverse',
        t: '任务中心',
        url: '../proxyMission/proxyMission'
      },
      {
        i: 'icon-fensix',
        t: '我的粉丝',
        url: '../proxyFans/proxyFans'
      },
      {
        i: 'icon-jiangbei',
        t: '业绩排行榜',
        url: '../proxyRanking/proxyRanking'
      },
      {
        i: 'icon-wenjuantiaocha',
        t: '问卷调查',
        url: '../question/question'
      }
    ]
  },
  performance () {
    let that = this
    app.wxrequest({
      url: app.getUrl().performance,
      data: {},
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            proxyInfo: res.data.data.info
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
    this.performance()
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
