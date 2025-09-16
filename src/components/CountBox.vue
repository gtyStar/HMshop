<template>
  <div class="count-box">
    <button class="minus" @click="transform">-</button>
    <input :value="value" class="inp" type="text" @change="handleChange">
    <button class="add" @click="transform">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    transform (e) {
      if ((e.target.className === 'minus') && (+this.value > 1)) {
        this.$emit('input', +this.value - 1)
      } else if (e.target.className === 'add') {
        this.$emit('input', +this.value + 1)
      }
    },
    handleChange (e) {
      // 输入不合法的值，退回原来的 value 值
      if ((typeof (+e.target.value) !== 'number') || e.target.value < 1) {
        e.target.value = +this.value
      }
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box{
  width: 110px;
  display: flex;
  .add, .minus{
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp{
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
