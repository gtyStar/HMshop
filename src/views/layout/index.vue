<template>
  <div class="">
    <router-view />   <!-- 二级路由出口：二级组件展示的位置 -->
    <van-tabbar active-color="#ee0a24" inactive-color="pink" route>
      <van-tabbar-item icon="wap-home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" replace to="/category">分类页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" replace to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" replace to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>

</style>
