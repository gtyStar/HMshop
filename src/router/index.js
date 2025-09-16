import Vue from 'vue'
import VueRouter from 'vue-router'

import Myorder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'

import store from '@/store'

const Login = () => import('@/views/login/index.vue') // 也可以简写，写到文件夹即可
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/layout/home')
const User = () => import('@/views/layout/user')
const Cart = () => import('@/views/layout/cart')
const Category = () => import('@/views/layout/category')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/user', component: User },
        { path: '/cart', component: Cart },
        { path: '/category', component: Category }
      ]

    },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带 id
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 所有的路由在真正被访问到之前，都会先经过全局前置守卫
// 全局前置导航守卫
// to：到哪去的完整路由信息对象（路径，参数）
// from：从哪来的完整路由信息对象
// next：是否放行
// (1) next()     直接放行到 to 要去的路径
// (2) next(to)   进行拦截，拦截到 next 里面配置的路径

// 定义一个数组。专门用户存放所有需要权限访问的页面
const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 如果访问的路径不在数组里就放行
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  // 是权限页面，需要判断 token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
