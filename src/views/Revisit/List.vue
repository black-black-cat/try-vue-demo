<template>
  <div class="container m-list-container">
    <div class="head">
      <section-title>重游明细</section-title>
    </div>

    <revisit-list :details="detailsCutted"></revisit-list>
    <more v-if="details && details.length > 5" :target="'/revisit/fullList'"></more>
  </div>
</template>

<script>
import RevisitList from './RevisitList'

export default {
  components: {
    RevisitList
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
  margin: 16px 0 0;
}
.head {
  padding-bottom: 40px;
}
</style>
