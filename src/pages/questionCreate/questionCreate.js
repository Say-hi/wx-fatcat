// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    timuArr: []
  },
  inputValue (e) {
    if (e.currentTarget.dataset.type === 'timu') {
      this.data.timuArr[e.currentTarget.dataset.outindex].timu = e.detail.value
    } else if (e.currentTarget.dataset.type === 'content') {
      this.data.timuArr[e.currentTarget.dataset.outindex].content = e.detail.value
    } else {
      this.data.timuArr[e.currentTarget.dataset.outindex].chooseArr[e.currentTarget.dataset.index].content = e.detail.value
    }
    this.setData({
      timuArr: this.data.timuArr
    })
  },
  delChoose (e) {
    this.data.timuArr[e.currentTarget.dataset.outindex].chooseArr.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      timuArr: this.data.timuArr
    })
  },
  addChoose (e) {
    this.data.timuArr[e.currentTarget.dataset.index].chooseArr.push({content: ''})
    this.setData({
      timuArr: this.data.timuArr
    })
  },
  addTiMU (e) {
    let type = e.currentTarget.dataset.type * 1
    let timuArr = this.data.timuArr
    if (type === 1) {
      timuArr.push({
        type: 1,
        timu: '',
        chooseArr: [{content: ''}]
      })
    } else if (type === 2) {
      timuArr.push({
        type: 2,
        timu: '',
        chooseArr: [{content: ''}]
      })
    } else {
      timuArr.push({
        type: 3,
        timu: '',
        content: ''
      })
    }
    this.setData({
      timuArr
    })
  },
  timuop (e) {
    if (e.currentTarget.dataset.type === 'up') {
      let up = this.data.timuArr.splice(e.currentTarget.dataset.outindex, 1)[0]
      this.data.timuArr.splice(e.currentTarget.dataset.outindex - 1, 0, up)
      this.setData({
        timuArr: this.data.timuArr
      })
    } else if (e.currentTarget.dataset.type === 'down') {
      let down = this.data.timuArr.splice(e.currentTarget.dataset.outindex, 1)[0]
      this.data.timuArr.splice(e.currentTarget.dataset.outindex * 1 + 1, 0, down)
      this.setData({
        timuArr: this.data.timuArr
      })
    } else if (e.currentTarget.dataset.type === 'del') {
      this.data.timuArr.splice(e.currentTarget.dataset.outindex, 1)
      this.setData({
        timuArr: this.data.timuArr
      })
    }
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
