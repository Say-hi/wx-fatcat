// 获取全局应用程序实例对象
// const app = getApp()
let timer = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    killArr: [
      {
        title: '阿斯顿发送到发多少发',
        sale_price: '123.41',
        old: '123',
        sale_count: '123',
        id: 123,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        startTime: '2018/04/16 18:00:00',
        salePercent: 0.4,
        endTime: '2018/04/17 19:00:00'
      },
      {
        title: '阿斯顿发送到发多少发',
        sale_price: '123.41',
        old: '123',
        sale_count: '123',
        id: 123,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        startTime: '2018/04/16 18:00:00',
        salePercent: 0.4,
        endTime: '2018/04/16 19:00:00'
      },
      {
        title: '阿斯顿发送到发多少发',
        sale_price: '123.41',
        old: '123',
        sale_count: '123',
        id: 123,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        startTime: '2018/04/16 18:00:00',
        salePercent: 0.4,
        endTime: '2018/04/16 19:00:00'
      },
      {
        title: '阿斯顿发送到发多少发阿斯顿发送到发多少发阿斯顿发送到发多少发阿斯顿发送到发多少发',
        sale_price: '123.41',
        old: '123',
        sale_count: '123',
        id: 123,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        startTime: '2018/04/16 18:00:00',
        salePercent: 0.4,
        endTime: '2018/04/16 19:00:00'
      }
    ]
  },
  // 获取数据
  getIndex () {
    let that = this
    app.wxrequest({
      url: app.getUrl().index,
      data: {
        act: 'fs'
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            killArr: res.data.data.FSList
          })
        } else {
          app.setToast(that, {content: res.data.mdg})
        }
      }
    })
  },
// 秒杀逻辑
  setKill () {
    let that = this
    function kill () {
      let shutDown = 0
      for (let [i] of that.data.killArr.entries()) {
        let nowData = new Date().getTime() // 毫秒数
        let startTime = new Date(that.data.killArr[i].startTime).getTime()
        let endTime = new Date(that.data.killArr[i].endTime).getTime()
        if (nowData < startTime) { // 未开始
          that.data.killArr[i].status = 1
          that.data.killArr[i].h = Math.floor((startTime - nowData) / 3600000)
          that.data.killArr[i].m = Math.floor((startTime - nowData) % 3600000 / 60000)
          that.data.killArr[i].s = Math.floor((startTime - nowData) % 60000 / 1000)
        } else if (nowData > startTime && nowData < endTime) { // 进行中
          that.data.killArr[i].status = 2
          that.data.killArr[i].h = Math.floor((endTime - nowData) / 3600000)
          that.data.killArr[i].m = Math.floor((endTime - nowData) % 3600000 / 60000)
          that.data.killArr[i].s = Math.floor((endTime - nowData) % 60000 / 1000)
        } else { // 已结束
          if (that.data.killArr[i].status === 3) {
            ++shutDown
            continue
          }
          that.data.killArr[i].status = 3
          that.data.killArr[i].h = '已'
          that.data.killArr[i].m = '结'
          that.data.killArr[i].s = '束'
        }
        that.setData({
          killArr: that.data.killArr
        })
      }
      if (shutDown === that.data.killArr.length) clearInterval(timer)
    }
    kill()
    timer = setInterval(() => {
      kill()
    }, 1000)
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
    this.setKill()
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    clearInterval(timer)
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    clearInterval(timer)
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
