<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录15751776629</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img @click="getPicCode" v-if="picUrl" :src="picUrl" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">获取验证码</button>
        </div>
      </div>
      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
// 导入封装的请求函数
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'

export default {
  name: 'LoginPage',
  data () {
    return {
      picUrl: '', // 存储请求渲染图片地址
      picKey: '', // 请求传递的图形验证码唯一标识
      timer: null, // 定时器id
      mobile: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: '' // 短信验证码
    }
  },
  created () {
    // 和 axios 的区别就是可以自定义配置
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },

    // 校验 手机号 和 图形验证码 是否合法
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('图形验证码错误')
        return false
      }
      return true
    },

    // 获取短信验证码
    async getCode (e) {
      if (this.validFn()) {
        let i = 60
        // !this.timer 就是如果有定时器的话，就不会再触发定时器，节流。
        if (!this.timer) {
          // 发送请求
          await getMsgCode(this.picCode, this.picKey, this.mobile)
          this.$toast('验证码已发送，注意查收')
          // 点击后立即触发
          e.target.innerHTML = `${i}秒后可重新发送`
          // 开启倒计时
          this.timer = setInterval(() => {
            i--
            e.target.innerHTML = `${i}秒后可重新发送`
            if (i <= 0) {
              clearInterval(this.timer)
              this.timer = null
              e.target.innerHTML = '获取验证码'
            }
          }, 1000)
        }
      }
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('短信验证码错误')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      // 判断地址栏有无回跳地址，如果有返回原地址，如果没有返回首页
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },

  // 离开页面清除定时器，节省性能
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
