// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allMoney: 0,
    src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
  },
  // 菜单页数量选择
  chooseMenuNum (e) {
    if (e.currentTarget.dataset.type === 'del') {
      --this.data.menuArr[e.currentTarget.dataset.index].num
    } else {
      if (!this.data.menuArr[e.currentTarget.dataset.index].num) {
        this.data.menuArr[e.currentTarget.dataset.index].num = 1
      } else {
        ++this.data.menuArr[e.currentTarget.dataset.index].num
      }
    }
    this.setData({
      menuArr: this.data.menuArr
    })
    this.calculatorMoney()
  },
  // 确认订单
  confirm () {
    wx.navigateTo({
      url: `../submitOrder/submitOrder?money=${this.data.allMoney}`
    })
  },
  // 删除当前物品
  del (e) {
    this.data.menuArr.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      menuArr: this.data.menuArr
    })
    this.calculatorMoney()
  },
  // 编辑
  setting () {
    this.setData({
      editor: !this.data.editor
    })
  },
  // 计算总价格
  calculatorMoney () {
    let allMoney = 0
    app.su('goodsStorage', this.data.menuArr)
    for (let v of app.gs('goodsStorage')) {
      if (v.num && v.checked) {
        allMoney += v.num * v.salePrice
      }
    }
    this.setData({
      allMoney
    })
  },
  // 选择所有
  chooseAll (must) {
    if (must === 'must') {
      // console.log(1)
      for (let v of this.data.menuArr) {
        v['checked'] = true
      }
      this.setData({
        all: true,
        menuArr: this.data.menuArr
      })
    } else {
      // console.log(2)
      for (let v of this.data.menuArr) {
        v['checked'] = !this.data.all
      }
      this.setData({
        all: !this.data.all,
        menuArr: this.data.menuArr
      })
    }
    this.calculatorMoney()
  },
  // 多项选择
  choose (e) {
    this.data.menuArr[e.currentTarget.dataset.index].checked = !this.data.menuArr[e.currentTarget.dataset.index].checked
    for (let [i, v] of this.data.menuArr.entries()) {
      if (!v.checked) {
        this.setData({
          all: false,
          menuArr: this.data.menuArr
        })
        this.calculatorMoney()
        return
      }
      if (i === this.data.menuArr.length - 1) {
        this.setData({
          all: true,
          menuArr: this.data.menuArr
        })
      }
    }
    this.calculatorMoney()
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
    if (app.gs('goodsStorage')) {
      this.setData({
        menuArr: app.gs('goodsStorage')
      })
      this.chooseAll('must')
    } else {
      this.setData({
        menuArr: []
      })
    }
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

