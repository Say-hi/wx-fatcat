// 获取全局应用程序实例对象
const app = getApp()
let timer = null
let timer2 = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabChooseNow: '2',
    tabChooseNow2: '1',
    page: 0,
    tipsArr: ['门店自提', '送货上门', '质量保证', '企业认证'],
    nowStartArr: [
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'asdf',
        need: 123,
        endTime: '2018/04/25 16:18:50',
        price: 456
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'asdf',
        need: 123,
        endTime: '2018/04/28 16:18:50',
        price: 456
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'asdf',
        need: 123,
        endTime: '2018/04/17 16:38:00',
        price: 456
      }
    ],
    videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
  },
  onlyPic () {
    this.setData({
      onlyPic: !this.data.onlyPic
    })
  },
  // 顶栏切换
  tabChoose (e) {
    if (e.currentTarget.dataset.index === this.data.tabChooseNow) return
    this.setData({
      tabChooseNow: e.currentTarget.dataset.index
    })
  },
  // 顶栏切换
  tabChoose2 (e) {
    if (e.currentTarget.dataset.index === this.data.tabChooseNow2) return
    this.setData({
      tabChooseNow2: e.currentTarget.dataset.index
    })
  },
  // 放大图片
  showImage (e) {
    let showArray = []
    for (let v of this.data.bannerArr) {
      showArray.push(v.image_url)
    }
    app.showImg(e, showArray)
  },
  // 秒杀逻辑
  setKill () {
    let that = this
    function kill () {
      let nowData = new Date().getTime() // 毫秒数
      let startTime = that.data.goodsInfo.start_time * 1000
      let endTime = that.data.goodsInfo.end_time * 1000
      if (nowData < startTime) { // 未开始
        that.data.goodsInfo.status = 1
        that.data.goodsInfo.h = Math.floor((startTime - nowData) / 3600000)
        that.data.goodsInfo.m = Math.floor((startTime - nowData) % 3600000 / 60000)
        that.data.goodsInfo.s = Math.floor((startTime - nowData) % 60000 / 1000)
      } else if (nowData > startTime && nowData < endTime) { // 进行中
        that.data.goodsInfo.status = 2
        that.data.goodsInfo.h = Math.floor((endTime - nowData) / 3600000)
        that.data.goodsInfo.m = Math.floor((endTime - nowData) % 3600000 / 60000)
        that.data.goodsInfo.s = Math.floor((endTime - nowData) % 60000 / 1000)
      } else { // 已结束
        that.data.goodsInfo.status = 3
        that.data.goodsInfo.h = '已'
        that.data.goodsInfo.m = '结'
        that.data.goodsInfo.s = '束'
      }
      that.setData({
        goodsInfo: that.data.goodsInfo
      })
      if (that.data.goodsInfo.status === 3) clearInterval(timer)
    }
    kill()
    timer = setInterval(() => {
      kill()
    }, 1000)
  },
  // 倒计时
  lostTime () {
    let that = this
    function kill () {
      let shutDown = 0
      for (let [i] of that.data.nowStartArr.entries()) {
        let nowData = new Date().getTime() // 毫秒数
        let endTime = that.data.nowStartArr[i].end_time
        if (nowData < endTime) { // 进行中
          that.data.nowStartArr[i].status = 2
          that.data.nowStartArr[i].h = Math.floor((endTime - nowData) / 3600000)
          that.data.nowStartArr[i].m = Math.floor((endTime - nowData) % 3600000 / 60000)
          that.data.nowStartArr[i].s = Math.floor((endTime - nowData) % 60000 / 1000)
        } else { // 已结束
          if (that.data.nowStartArr[i].status === 3) {
            ++shutDown
            continue
          }
          that.data.nowStartArr[i].status = 3
          that.data.nowStartArr[i].h = '已'
          that.data.nowStartArr[i].m = '结'
          that.data.nowStartArr[i].s = '束'
        }
        that.setData({
          nowStartArr: that.data.nowStartArr
        })
      }
      if (shutDown === that.data.nowStartArr.length) clearInterval(timer)
    }
    kill()
    timer2 = setInterval(() => {
      kill()
    }, 1000)
  },
  // 返回首页
  backIndex () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  // 分享选择
  shareShow () {
    let that = this
    let time = 0
    if (this.data.shareChoose) {
      this.setData({
        small: true
      })
      time = 600
    } else {
      this.setData({
        small: false
      })
    }
    setTimeout(() => {
      that.setData({
        shareChoose: !that.data.shareChoose
      })
    }, time)
  },
  // 关闭图片分享
  closeImg () {
    this.setData({
      shareChoose: true,
      showCanvas: false
    })
  },
  // 获取分享的图片
  getSharePic () {
    this.setData({
      showCanvas: !this.data.showCanvas
    })
    this.getCanvasSize()
  },
  // 获取canvas元素px值
  getCanvasSize () {
    let that = this
    wx.showLoading({
      title: '获取分享图片...'
    })
    setTimeout(function () {
      wx.createSelectorQuery().select('#qwe').fields({
        size: true
      }, function (res) {
        that.drawCanvas(res.width, res.height)
      }).exec()
    }, 50)
  },
  // canvas绘制分享图片
  drawCanvas (ctxW, ctxH) {
    let that = this
    let bannerImg = null
    let qrCode = null
    // let three = null
    // let four = null
    app.downLoad(that.data.bannerArr[0].image_url)
      .then((res) => {
        bannerImg = res
        return app.downLoad(that.data.bannerArr[0].image_url)
      })
      .then((res2) => {
        qrCode = res2
        return that.asdf({ctxW, ctxH, bannerImg, qrCode})
      })
  },
  asdf ({ctxW, ctxH, bannerImg, qrCode}) {
    let that = this
    if (bannerImg === 0 || qrCode === 0) return this.drawCanvas()
    wx.hideLoading()
    let ctx = wx.createCanvasContext('myCanvas')
    let XS = that.data.windowWidth / 375
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(0, 0, ctxW, ctxH)
    ctx.drawImage(bannerImg, ctxW / 2 - 90 * XS, 15 * XS, 180 * XS, 170 * XS)
    ctx.setFontSize(18 * XS)
    ctx.setFillStyle('#000000')
    ctx.setTextAlign('left')
    ctx.setTextBaseline('middle')
    ctx.fillText(that.data.goodsInfo.goods_remark.slice(0, 8) + '...', ctxW / 2 - 90 * XS, 170 * XS + 30)
    ctx.setFontSize(22 * XS)
    ctx.setFillStyle('#ff4344')
    ctx.setTextAlign('left')
    ctx.setTextBaseline('middle')
    ctx.fillText('￥' + that.data.goodsInfo.shop_price, ctxW / 2 - 90 * XS, 170 * XS + 60)
    ctx.setFillStyle('#f9f9f9')
    ctx.fillRect(ctxW / 2 - 90 * XS, 170 * XS + 80, ctxW - 30 * XS, 2)
    ctx.setFontSize(14 * XS)
    ctx.setFillStyle('#999999')
    ctx.setTextAlign('left')
    ctx.setTextBaseline('middle')
    ctx.fillText('长按识别小程序码访问', ctxW / 2 - 90 * XS, 170 * XS + 100)
    ctx.drawImage(qrCode, ctxW - 60 * XS, 170 * XS + 110, 50 * XS, 50 * XS)
    ctx.draw()
  },
  // 保存图片到用户相册
  saveImgToUser () {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success () {
            wx.showToast({
              title: '图片保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  // 购买弹窗
  closeBuy (e) {
    if (this.data.type === 'kill' && this.data.goodsInfo.status === 3) return app.setToast(this, {content: '秒杀活动已结束'})
    if (this.data.type === 'special' && !this.data.goodsInfo.activity_is_on) return app.setToast(this, {content: '亲，本商品特价活动已结束'})
    let that = this
    let time = 0
    if (this.data.buy) {
      this.setData({
        small: true
      })
      time = 600
    } else {
      this.setData({
        small: false
      })
    }
    setTimeout(() => {
      that.setData({
        buyType: e ? e.currentTarget.dataset.type || '' : '',
        buy: !that.data.buy
      })
    }, time)
  },
  // 数量选择
  chooseMenuNum (e) {
    if (e.currentTarget.dataset.type === 'del') {
      if (this.data.goodsInfo.num === 1) return
      --this.data.goodsInfo.num
    } else {
      if (!this.data.goodsInfo.num) {
        this.data.goodsInfo.num = 1
      } else {
        if (this.data.goodsInfo.buy_limit <= this.data.goodsInfo.num) return app.setToast(this, {content: `亲，每人限购${this.data.goodsInfo.buy_limit}件哦`})
        if (this.data.goodsInfo.store_count <= this.data.goodsInfo.num) return app.setToast(this, {content: '超出库存啦'})
        ++this.data.goodsInfo.num
      }
    }
    this.setData({
      goodsInfo: this.data.goodsInfo
    })
  },
  // 将选择的物品放置缓存
  setGoodsStorage () {
    let that = this
    let vv = that.data.goodsInfo
    let goodsStorage = app.gs('goodsStorage') || []
    if (!goodsStorage.length) {
      goodsStorage.push(vv)
    } else {
      for (let [i, m] of goodsStorage.entries()) {
        if (m.goods_id === vv.goods_id) { // 缓存中存在该项,重新赋值，跳出循环
          goodsStorage[i] = vv
          break
        } else if (i === goodsStorage.length - 1) {
          goodsStorage.push(vv)
        }
      }
    }
    app.su('goodsStorage', goodsStorage)
  },
  // 将物品添加至后台购物车
  addToCar () {
    let that = this
    app.wxrequest({
      url: app.getUrl().addCar,
      data: {
        goods_id: that.data.goodsInfo.goods_id,
        goods_num: that.data.goodsInfo.num || 1
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 1) {
          that.closeBuy()
        } else if (res.data.status === -4) {
          app.setToast(that, {content: res.data.msg})
          that.closeBuy()
        }
      }
    })
  },
  // 购买确认
  buyConfirm () {
    if (this.data.buyType === 'car') {
      this.addToCar()
    } else {
      app.su('goodsStorageNow', this.data.goodsInfo)
    }
  },
  showVideo () {
    this.setData({
      videoShow: !this.data.videoShow
    })
  },
  getGoodsInfo (id) {
    let that = this
    if (this.data.type === 'bulkP') {
      wx.getLocation({
        type: 'gcj02 ',
        success (res) {
          app.wxrequest({
            url: app.getUrl().goodsInfo,
            data: {
              id,
              lat: res.latitude,
              log: res.longitude
            },
            success (res) {
              wx.hideLoading()
              if (res.data.status === 200) {
                app.WP('introduce', 'html', res.data.data.goods.goods_content, that, 5)
                that.setData({
                  goodsInfo: res.data.data.goods,
                  bannerArr: res.data.data.goodsImagesList,
                  commentStatistics: res.data.data.commentStatistics
                })
                that.getComment(1)
                if (that.data.type === 'kill') {
                  that.setKill()
                } else if (that.data.type === 'bulkP') {
                  that.lostTime()
                }
              } else {
                app.setToast(that, {content: res.data.msg})
              }
            }
          })
        },
        fail (res) {
          console.log('err', res)
          app.setToast(that, {content: '未授权地理位置信息，无法获取附近的拼团'})
        }
      })
    } else {
      app.wxrequest({
        url: app.getUrl().goodsInfo,
        data: {
          id
        },
        success (res) {
          wx.hideLoading()
          if (res.data.status === 200) {
            app.WP('introduce', 'html', res.data.data.goods.goods_content, that, 5)
            that.setData({
              goodsInfo: res.data.data.goods,
              bannerArr: res.data.data.goodsImagesList,
              commentStatistics: res.data.data.commentStatistics
            })
            that.getComment(1)
            if (that.data.type === 'kill') {
              that.setKill()
            } else if (that.data.type === 'bulkP') {
              that.lostTime()
            }
          } else {
            app.setToast(that, {content: res.data.msg})
          }
        }
      })
    }
  },
  getComment (commentType) {
    let that = this
    app.wxrequest({
      url: app.getUrl().ajaxComment,
      data: {
        goods_id: that.data.goodsInfo.goods_id,
        commentType,
        p: that.data.page++
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          console.log(res)
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
      type: options.type || 'bulkP'
    })
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
    this.getGoodsInfo(options.id)
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
    clearInterval(timer)
    clearInterval(timer2)
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    clearInterval(timer)
    clearInterval(timer2)
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  },
  // 分享朋友
  onShareAppMessage () {
    let that = this
    return {
      title: '您的好友向您分享了好产品',
      path: `pages/goodsDetail/goodsDetail?type=${that.data.type}?id=${that.data.goodsInfo.goods_id}`,
      imageUrl: that.data.bannerArr[0].image_url
    }
  }
})
