// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [],
    lists: [],
    currentIndex: 0,
    page: 0
  },
  maskChange (e) {
    this.setData({
      mask: !this.data.mask,
      mskId: e.currentTarget.dataset.id || null
    })
  },
  chooseTab (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      lists: [],
      page: 0
    })
    this.getMissionList(e.currentTarget.dataset.index * 1 + 1)
  },
  getMissionList (end = 1) {
    let that = this
    app.wxrequest({
      url: app.getUrl().taskUserList,
      data: {
        is_end: end,
        p: ++this.data.page
      },
      success (res) {
        wx.hideLoading()
        // if (res.data.status === 200) {
        if (res.data.data.taskUserList.length) {
          for (let v of res.data.data.taskUserList) {
            v.add_time = new Date(v.add_time * 1000).toLocaleDateString()
          }
          // }
          that.setData({
            lists: that.data.lists.concat(res.data.data.taskUserList),
            more: res.data.data.taskUserList < 10 ? 0 : 1
          })
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  // taskImageUpload () {
  //   let that = this
  //   app.wxrequest({
  //     url: app.getUrl().taskImageUpload,
  //     data: {
  //
  //     }
  //   })
  // },
  upImage () {
    let that = this
    if (this.data.imgArr.length >= 4) return app.setToast(that, {content: '最多上传4张照片'})
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        // console.log('图片上传', res)
        app.wxUpload({
          url: app.getUrl().taskImageUpload,
          filePath: res.tempFilePaths[0],
          formData: {
            id: that.data.mskId || 1
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
  onLoad () {
    this.getMissionList()
    // TODO: onLoad
  },
  onReachBottom () {
    if (!this.data.more) return app.setToast(this, {content: '没有更多信息了'})
    this.getMissionList()
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
