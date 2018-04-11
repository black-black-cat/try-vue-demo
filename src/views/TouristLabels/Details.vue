<template>
  <div class="m-details container">
    <div class="head">
      <section-title>游客明细</section-title>
    </div>

    <my-list :details="detailsCutted"></my-list>
    <more v-if="details && details.length > 5" :target="'/touristLabels/fullList'"></more>
  </div>
</template>

<script>
import myList from './TouristList'

export default {
  components: {
    myList
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
@import "../../styles/theme";
.container {
  margin: 16px 0 0;
}
.head {
  padding-bottom: 40px;
}
</style>
