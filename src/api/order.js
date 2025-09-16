import request from '@/utils/request'

// 订单结算确认
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      // mode: cart => obj:{ cartIds }
      // mode: buyNow => obj:{ goodsId, goodsNum, goodsSkuId }
      mode, // cart、buyNow
      delivery: 10, // 10快递 20门店自提
      couponId: 0, // 优惠券 ID，传 0 不使用
      isUsePoints: 0, // 积分， 传 0 不使用积分
      ...obj // 将传递过来的参数对象动态展开
    }
  })
}

// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    // mode: cart => obj:{ cartIds, remark }
    // mode: buyNow => obj:{ goodsId, goodsNum, goodsSkuId, remark }
    mode,
    delivery: 10, // 10快递 20门店自提
    couponId: 0, // 优惠券 ID，传 0 不使用
    isUsePoints: 0, // 积分， 传 0 不使用积分
    payType: 10,
    ...obj // 将传递过来的参数对象动态展开
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
