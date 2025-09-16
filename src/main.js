import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入组件库
import '@/utils/vant-ui'
// 导入公共样式
import '@/styles/common.less'

/* import Vant from 'vant'
import 'vant/lib/index.css'
// 插件安装初始化，内部会将所有的vant组件导入注册
Vue.use(Vant) */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
