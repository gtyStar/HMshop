<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.push('/home')" />

    <van-search v-model="search" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch" :data-item="search">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div
        v-for="item in history"
        :key="item"
        class="list-item"
        @click="goSearch"
        :data-item="item">
        {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '', // 输入框的内容
      history: getHistoryList()
    }
  },
  methods: {
    goSearch (e) {
      const key = e.target.dataset.item

      if (e.target.tagName === 'div') {
        if (this.search === '') return
      }
      if (this.history.indexOf(key) !== -1) {
        // 存在相同项时，将原有关键字移除
        this.history.splice(this.history.indexOf(key), 1)
      }
      this.history.unshift(key)
      setHistoryList(this.history)
      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }

}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
