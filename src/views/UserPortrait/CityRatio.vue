<template>
  <div class="m-city-ratio">
    <section-title>游客地域分布</section-title>
    <city-ratio-list :region="regionCutted"></city-ratio-list>
    <more v-if="region && region.length > 5" :target="'/userPortrait/fullList'"></more>
  </div>
</template>

<script>
import CityRatioList from '@/components/cityRatioList/CityRatioList'

export default {
  components: {
    CityRatioList
  },
  props: {
    region: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    regionCutted () {
      let region = this.region && this.region.length ? this.region : []
      return region.slice(0, 5)
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
