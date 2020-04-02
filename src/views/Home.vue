<template>
  <div>
    <panel></panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <list></list>
        </div>
        <div class="layui-col-md4">
          <tips></tips>
          <sign></sign>
          <hot-list></hot-list>
          <ads></ads>
          <links></links>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Panel from '@/components/Panel'
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'

export default {
  name: 'home',
  components: {
    Panel,
    Tips,
    Sign,
    HotList,
    Ads,
    Links,
    List
  }
}
</script>
<style lang="scss" scoped>

</style>
