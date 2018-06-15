// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allMoney: 0,
    menuArr: []
  },
  setFuck () {
    app.setFuck(this)
  },
  // 修改购物车商品数量
  changeGoodsNum (e) {
    let that = this
    app.wxrequest({
      url: app.getUrl().changeNum,
      data: {
        id: that.data.menuArr[e.currentTarget.dataset.index].id,
        goods_num: e.currentTarget.dataset.type === 'del' ? --that.data.menuArr[e.currentTarget.dataset.index].goods_num : ++that.data.menuArr[e.currentTarget.dataset.index].goods_num
      },
      success (res) {
        wx.hideLoading()
        that.data.flag = false
        if (res.data.status === 200) {
          that.setData({
            menuArr: that.data.menuArr
          })
          that.calculatorMoney()
        } else {
          e.currentTarget.dataset.type === 'del' ? ++that.data.menuArr[e.currentTarget.dataset.index].goods_num : --that.data.menuArr[e.currentTarget.dataset.index].goods_num
          that.setData({
            menuArr: that.data.menuArr
          })
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  // 菜单页数量选择
  chooseMenuNum (e) {
    if (this.data.flag) return
    this.data.flag = true
    this.changeGoodsNum(e)
    // this.setData({
    //   menuArr: this.data.menuArr
    // })
  },
  // 将物品添加至后台购物车
  addToCar (v, i) {
    let that = this
    app.wxrequest({
      url: app.getUrl().addCar,
      data: {
        goods_id: v.goods_id,
        goods_num: v.num
      },
      success (res) {
        wx.hideLoading()
        if (i * 1 === that.data.menuArr.length - 1) {
          console.log('last')
        }
      }
    })
  },
  // 修改购物车选中状态
  AsyncUpdateCart () {
    let that = this
    let cart = []
    for (let v of that.data.menuArr) {
      cart.push({
        id: v.id,
        goods_num: v.goods_num,
        selected: v.selected
      })
    }
    app.wxrequest({
      url: app.getUrl().AsyncUpdateCart,
      // header: 'application/json',
      data: {
        cart: JSON.stringify(cart)
      },
      success (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.status === 1) {
          wx.navigateTo({
            url: `../submitOrder/submitOrder?money=${res.data.result.total_fee}`
          })
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  // 确认订单
  confirm () {
    // for (let [i, v] of this.data.menuArr.entries()) {
    //   this.addToCar(v, i)
    // }
    this.AsyncUpdateCart()
  },
  // 获取购物车列表
  getCarList () {
    let that = this
    app.wxrequest({
      url: app.getUrl().carList,
      data: {},
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            menuArr: res.data.data.cartList
          })
          that.calculatorMoney()
          for (let v of res.data.data.cartList) {
            if (v.selected * 1 === 0) return
          }
          that.setData({
            all: true
          })
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  // 删除购物车商品
  del (e) {
    let that = this
    app.wxrequest({
      url: app.getUrl().delete,
      data: {
        id: that.data.menuArr[e.currentTarget.dataset.index].id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.data.menuArr.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            menuArr: that.data.menuArr
          })
          that.calculatorMoney()
        } else {
          app.setToast(that, {content: res.data.msg})
        }
      }
    })
  },
  // // 删除当前物品
  // del (e) {
  //
  // },
  // 编辑
  setting () {
    this.setData({
      editor: !this.data.editor
    })
  },
  // 计算总价格
  calculatorMoney () {
    let allMoney = 0
    // app.su('goodsStorage', this.data.menuArr)
    // for (let v of app.gs('goodsStorage')) {
    //   if (v.num && v.checked) {
    //     allMoney += v.num * v.shop_price
    //   }
    // }
    for (let v of this.data.menuArr) {
      if (v.goods_num && !!v.selected) {
        allMoney += v.goods_num * v.goods_price
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
        v['selected'] = 1
      }
      this.setData({
        all: true,
        menuArr: this.data.menuArr
      })
    } else {
      // console.log(2)
      for (let v of this.data.menuArr) {
        v['selected'] = this.data.all ? 0 : 1
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
    this.data.menuArr[e.currentTarget.dataset.index].selected = this.data.menuArr[e.currentTarget.dataset.index].selected * 1 === 1 ? 0 : 1
    for (let [i, v] of this.data.menuArr.entries()) {
      if (!v.selected) {
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
    this.setFuck()
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
    // if (app.gs('goodsStorage')) {
    //   this.setData({
    //     menuArr: app.gs('goodsStorage')
    //   })
    //   this.chooseAll('must')
    // } else {
    //   this.setData({
    //     menuArr: []
    //   })
    // }
    this.getCarList()
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

