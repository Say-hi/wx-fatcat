// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    typeChoose: 1,
    imgArr: []
  },
  // 图款类型选择
  chooseType (e) {
    this.setData({
      typeChoose: e.currentTarget.dataset.index
    })
  },
  confirm (e) {
    if (e.detail.value.money < 0 || e.detail.value.money > this.data.options.money) return app.setToast(this, {content: '请输入合理的退款金额'})
    if (!e.detail.value.desc.trim().length) return app.setToast(this, {content: '请输入退货理由'})
    let that = this
    app.wxrequest({
      url: app.getUrl().refundOrder,
      data: {
        refund_type: that.data.typeChoose,
        describe: e.detail.value.desc,
        refund_money: e.detail.value.money || 0,
        order_id: that.data.options.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          wx.showToast({
            title: '已受理',
            mask: true
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          })
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  upImage () {
    let that = this
    if (this.data.imgArr.length >= 3) return app.setToast(that, {content: '最多上传3张照片'})
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        // console.log('图片上传', res)
        app.wxUpload({
          url: app.getUrl().refund_order_img,
          filePath: res.tempFilePaths[0],
          formData: {
            order_id: that.data.options.id || 1
          },
          success (res2) {
            res2 = JSON.parse(res2.data)
            if (res2.status === 200) {
              that.data.imgArr.push(res2.data.image_url)
              that.setData({
                imgArr: that.data.imgArr
              })
            } else {
              app.setToast(that, {content: res2.msg})
            }
          }
        })
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
