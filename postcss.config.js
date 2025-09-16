module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw 适配的标准屏的宽度（iphoneX）
      // 设计图 750，调成1倍 => 适配 375 标准屏幕
      // 设计图 640，调成1倍 => 适配 320 标准屏幕
      viewportWidth: 375
    }
  }
}
