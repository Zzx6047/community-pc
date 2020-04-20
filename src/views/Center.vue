<template>
  <div class="layui-container fly-marginTop">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <li class="layui-nav-item">
        <a href="">
          <i class="iconfont icon-zhangshangcaifuyemianshoujiban243"></i>
          大数据
          </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      lists: [
        {
          name: '',
          icon: 'icon-home1'
        }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/custom/iconfont.css'
</style>
