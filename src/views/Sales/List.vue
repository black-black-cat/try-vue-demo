<template>
  <div class="container m-list-container">
    <!-- <div class="head">渠道销售排行</div> -->
    <div class="head">
      <section-title>渠道销售排行</section-title>
    </div>

    <sales-list></sales-list>
    <more :target="'/sales/fullList'"></more>
  </div>
</template>

<script>
import SalesList from './SalesList'

export default {
  components: {
    SalesList
  },
  data () {
    return {}
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
