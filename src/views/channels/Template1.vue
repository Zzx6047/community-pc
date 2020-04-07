<!--  -->
<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <list></list>
      </div>
      <div class="layui-col-md4">
        <hot-list></hot-list>
        <ads></ads>
        <links></links>
      </div>
    </div>
  </div>
</template>
<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'
export default {
  name: 'template1',
  data () {
    return {}
  },
  components: {
    HotList,
    Ads,
    Links,
    List
  },
  computed: {},
  mounted: {},
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>
