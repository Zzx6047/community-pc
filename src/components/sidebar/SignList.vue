<!-- 签到活跃榜 -->
<template>
  <div class="modal" v-show="isShow">
      <div class="mask" @click="close()"></div>
      <div class="layui-layer layui-layer-page" :class="{'active': isShow}">
        <div class="layui-layer-title">
          签到活跃榜 - TOP
          <i class="pull-right layui-icon layui-icon-close" @click="close"></i>
        </div>
        <div class="layui-layer-content pd0">
          <div class="layui-tab layui-tab-brief">
            <ul class="layui-tab-title">
              <li :class="{'layui-this': current === 0}" @click="choose(0)">最新签到</li>
              <li :class="{'layui-this': current === 1}" @click="choose(1)">今日最快</li>
              <li :class="{'layui-this': current === 2}" @click="choose(2)">总签到榜</li>
            </ul>
          </div>
          <div class="layui-tab-content">
            <ul class="layui-tab-item layui-show">
              <li v-for="(item, index) in lists" :key="'sign' + index">
                <img src="/img/bear.png" alt="" class="mr1">
                <cite class="fly-link">{{item.name}}</cite>
                <span class="fly-grey" v-if="current !== 2">
                  签到于 {{item.created}}
                </span>
                <span class="fly-grey" v-else>
                  已经连续签到
                  <i class="orange">{{item.count}}</i>天
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'signlist',
  data () {
    return {
      current: 0,
      lists: [
        {
          name: 'test1',
          count: 4,
          created: '2020-01-01'
        },
        {
          name: 'test1',
          count: 3,
          created: '2020-01-01'
        },
        {
          name: 'test1',
          count: 2,
          created: '2020-01-01'
        },
        {
          name: 'test1',
          count: 1,
          created: '2020-01-01'
        }
      ]
    }
  },
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    choose (val) {
      this.current = val
    },
    close () {
      this.$emit('closeModal')
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
