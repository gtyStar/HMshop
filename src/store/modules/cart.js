import { getCartList, changeCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 提供一个设置 cartList 的 mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 点击复选框取反
    toggleCheck (state, goodsId) {
      (state.cartList.find(item => item.goods_id === goodsId).isChecked) = (!state.cartList.find(item => item.goods_id === goodsId).isChecked)
    },
    // 全选控制小选
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => { item.isChecked = flag })
    },
    changeCount (state, { goodsId, goodsNum }) {
      state.cartList.find(item => item.goods_id === goodsId).goods_num = goodsNum
    }
  },
  actions: {
    // 获取购物车数据
    async getCartAction (context) {
      const { data } = await getCartList()

      // 复选框选中
      data.list.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, { goodsNum, goodsId, goodsSkuId }) {
      // 先本地修改
      context.commit('changeCount', { goodsId, goodsNum })
      // 在同步到后台
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    // 删除购物车数据
    async delSelect (context) {
      const cartIds = context.getters.selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')
      // 重新拉取最新的购物车数据
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 求所有商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked === true)
    },
    // 选中的总数
    selCount (state) {
      return state.cartList.filter(item => item.isChecked === true).reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state) {
      return state.cartList.filter(item => item.isChecked === true).reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 小选控制全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked === true)
    }
  }
}
