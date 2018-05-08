/**
 * Created by Administrator on 2017/6/2.
 */
// let baseDomain = 'http://group.lanzhangxiu.cn'
let baseDomain = 'http://fmtg.lanzhangxiu.cn'
let serviceUrl = {
  login: baseDomain + '/Api/User/login.html',
  index: baseDomain + '/Api/Index/index',
  goodsInfo: baseDomain + '/Api/Goods/goodsInfo',
  ajaxComment: baseDomain + '/Api/Goods/ajaxComment',
  carList: baseDomain + '/Api/Cart/index',
  changeNum: baseDomain + '/Api/Cart/changeNum',
  AsyncUpdateCart: baseDomain + '/Api/Cart/AsyncUpdateCart',
  delete: baseDomain + '/Api/Cart/delete',
  cart2: baseDomain + '/Api/Cart/cart2',
  cart3: baseDomain + '/Api/Cart/cart3',
  orderList: baseDomain + '/Api/Order/order_list',
  addCar: baseDomain + '/Api/Cart/ajaxAddCart'
}
module.exports = serviceUrl
