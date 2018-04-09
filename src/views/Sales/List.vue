<template>
  <div class="container m-list-container">
    <!-- <div class="head">渠道销售排行</div> -->
    <div class="head">
      <section-title>渠道销售排行</section-title>
    </div>

    <sales-list :details="detailsCutted"></sales-list>
    <more v-if="details && details.length > 5" :target="'/sales/fullList'"></more>
  </div>
</template>

<script>
import SalesList from './SalesList'

export default {
  components: {
    SalesList
  },
  props: {
    details: Array
  },
  data () {
    return {}
  },
  computed: {
    detailsCutted () {
      return (this.details || []).slice(0, 5)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "../../styles/theme";
.container {
  margin: 16px 0;
}
.head {
  padding-bottom: 40px;
}
</style>
