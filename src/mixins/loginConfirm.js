export default {
  // 此处编写的就是 Vue组件实例的 配置项，通过一定语法，可以直接混入到组件内部
  // data methods computed 生命周期函数 ...
  // 注意点：如果此处 和 组件内，提供了同名的 data 或 methods，则组件内优先级更高
  methods: {
    // 登陆确认框
    loginConfirm () {
      // 判断 是否登录
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          // 如果希望跳转到登录 => 登录后能跳回来，需要携带参数（当前的路径地址）
          // this.$routr.path（不包含参数）
          // this.$route.fullPath（包含查询参数）
          this.$router.push({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => { })
        return true
      }
      return false
    }
  }
}
