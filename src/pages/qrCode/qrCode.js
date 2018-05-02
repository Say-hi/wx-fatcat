// 获取全局应用程序实例对象
// const app = getApp()
const wxBarCode = require('../../utils/index')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsArr: [
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: 'aaaaaaaaaaa',
        time: '2017-12-08 10:50',
        code: 'aaaaaaaaaaa'
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '123421342134',
        time: '2017-12-08 10:50',
        code: '123421342134'
      }
    ],
    code: '201722481024'
  },
  showQR (e) {
    this.setData({
      show: true,
      code: e.currentTarget.dataset.code
    })
    wxBarCode.qrcode('qrcode', e.currentTarget.dataset.code, 420, 420)
  },
  close () {
    this.setData({
      show: false
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
