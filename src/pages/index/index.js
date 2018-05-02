// 获取全局应用程序实例对象
const app = getApp()
let timer = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        url: '../asdf/adsf'
      },
      {
        img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        url: '../asdf/adsf'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        url: '../asdf/adsf'
      }
    ],
    indicatorColor: 'rgba(0, 0, 0, 0.1)',
    indicatorActiveColor: '#000000',
    show: true,
    tabArr: [
      {
        i: 'icon-31_xinpin',
        t: '今日上新',
        url: '../goods/goods?type=new'
      },
      {
        i: 'icon-tejia',
        t: '今日特价',
        url: '../goods/goods?type=special'
      },
      {
        i: 'icon-miaosha',
        t: '整点秒杀',
        url: '../killGoods/killGoods'
      },
      {
        i: 'icon-fensix',
        t: '拼团',
        url: '../bulkPurchase/bulkPurchase'
      }
    ],
    announcement: '阿斯顿佛啊圣诞节快发拉萨的空间发阿斯顿飞考虑将阿斯顿飞',
    killArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '阿斯顿佛啊圣诞节快发拉萨的空间发阿斯顿飞考虑将阿斯顿飞',
        salePrice: '100.00',
        oldPrice: '1000.00',
        salePercent: 0.4,
        saleCount: 500,
        startTime: '2018/04/18 18:00:00',
        endTime: '2018/04/25 19:00:10'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '阿斯顿佛啊圣诞节快发拉萨的空间发阿斯顿飞考虑将阿斯顿飞',
        salePrice: '9.00',
        oldPrice: '10.00',
        salePercent: 0.4,
        saleCount: 500,
        startTime: '2018/02/16 21:30:00',
        endTime: '2018/04/25 21:53:20'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '阿斯顿佛啊圣诞节快发拉萨的空间发阿斯顿飞考虑将阿斯顿飞',
        salePrice: '9.00',
        oldPrice: '10.00',
        salePercent: 0.4,
        saleCount: 500,
        startTime: '2018/02/16 18:00:00',
        endTime: '2018/04/25 19:00:08'
      }
    ]
  },
  // 关闭新人礼包
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
  // 打电话
  calls () {
    app.call(this.data.shopInfo[1].r)
  },
  // 秒杀逻辑
  setKill () {
    let that = this
    function kill () {
      let shutDown = 0
      for (let [i] of that.data.killArr.entries()) {
        let nowData = new Date().getTime() // 毫秒数
        // console.log('startTime', new Date(that.data.killArr[i].startTime))
        let startTime = new Date(that.data.killArr[i].startTime).getTime()
        let endTime = new Date(that.data.killArr[i].endTime).getTime()
        // console.log(nowData, startTime, endTime)
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
    // console.dir(app.data)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setKill()
    console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    clearInterval(timer)
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    clearInterval(timer)
    console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    console.log(' ---------- onPullDownRefresh ----------')
  }
})
