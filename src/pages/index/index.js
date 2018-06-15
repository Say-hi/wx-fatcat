// 获取全局应用程序实例对象
const app = getApp()
let timer = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
        url: '../goods/goods?type=so'
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
    if (timer) clearInterval(timer)
    function kill () {
      let shutDown = 0
      for (let [i] of that.data.killArr.entries()) {
        let nowData = new Date().getTime() // 毫秒数
        // console.log('startTime', new Date(that.data.killArr[i].startTime))
        let startTime = that.data.killArr[i].start_time * 1000
        let endTime = that.data.killArr[i].end_time * 1000
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

  getLocation () {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        app.su('userLocation', res)
        that.getIndex()
      }
    })
  },

  getIndex () {
    let that = this
    app.wxrequest({
      url: app.getUrl().index,
      data: {
        act: 'index',
        latitude: that.data.latitude || '',
        longitude: that.data.longitude || ''
      },
      success (res) {
        wx.hideLoading()
        // console.log(res)
        if (res.data.status === 200) {
          that.setData({
            bannerArr: res.data.data.ad1List,
            bannerArr2: res.data.data.ad2List,
            announcement: res.data.data.noticeList[0].title,
            newGoodsList: res.data.data.newGoodsList,
            killArr: res.data.data.FSList,
            SOGList: res.data.data.SOGList
          })
          that.setKill()
          for (let v of res.data.data.cpl) {
            v.use_start_time = new Date(v.use_start_time).toLocaleString()
            v.use_end_time = new Date(v.use_end_time).toLocaleString()
          }
          that.setData({
            cpl: res.data.data.cpl
          })
          let count = 0
          setInterval(() => {
            if (count >= res.data.data.noticeList.length) {
              count = 0
            }
            that.setData({
              announcement: res.data.data.noticeList[count].title
            })
            count++
          }, 5000)
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },

  MaskGetUserInfo (e) {
    if (e.detail.iv) {
      this.setData({
        needUserInfo: false
      })
      app.wxlogin(this.getLocation)
    }
  },

  setFuck () {
    app.setFuck(this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.setFuck()
    /*eslint-disable*/
    this.setData({
      show: app.gs('userInfo') ? false : true
    })
    if (!app.gs('userInfo')) {
      this.setData({
        needUserInfo: true
      })
      app.wxlogin(this.getLocation)
    } else {
      this.getLocation()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setKill()
    // console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    clearInterval(timer)
    // console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    clearInterval(timer)
    // console.log(' ---------- onUnload ----------')
  },
  onShareAppMessage () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // console.log(' ---------- onPullDownRefresh ----------')
  }
})
