<template>
  <div class="m-city-ratio">
    <section-title>游客地域分布</section-title>
    <city-ratio-list :region="cuttedRegion"></city-ratio-list>
    <more v-if="region.length && region.length > 5" :target="'/userPortrait/fullList'"></more>
  </div>
</template>

<script>
import CityRatioList from '@/components/cityRatioList/CityRatioList'

export default {
  components: {
    CityRatioList
  },
  props: {
    region: Array
  },
  data () {
    return {
      cuttedRegion: this.region.slice(0, 5)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-city-ratio {
  // margin-top: 1px;
  // border-width: 1px 0 0;
  // border-style: solid;
}
</style>
