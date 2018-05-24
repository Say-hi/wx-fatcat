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
  recharge: baseDomain + '/Api/User/recharge',
  userInfo: baseDomain + '/Api/User/index',
  orderConfirm: baseDomain + '/Api/Order/order_confirm',
  payByAccount: baseDomain + '/Api/Pay/payByAccount',
  fansList: baseDomain + '/Api/User/fans_list',
  // returnGoodsList: baseDomain + '/Api/Order/return_goods_list',
  taskUserList: baseDomain + '/Api/User/task_user_list',
  taskImageUpload: baseDomain + '/Api/User/task_image_upload',
  refundOrderList: baseDomain + '/Api/Order/refund_order_list',
  refundOrder: baseDomain + '/Api/Order/refund_order.html',
  refund_order_img: baseDomain + '/Api/Order/refund_order_img.html',
  addCar: baseDomain + '/Api/Cart/ajaxAddCart'
}
module.exports = serviceUrl
