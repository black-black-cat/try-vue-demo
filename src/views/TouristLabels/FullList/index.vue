<template>
  <div class="view-tourist-full-list">
    <tourist-list v-if="details && details.length" :details="details"/>
  </div>
</template>

<script>
import TouristList from '../TouristList'

export default {
  components: {
    TouristList
  },
  data () {
    return {
      details: []
    }
  },
  created () {

  },
  mounted () {
    const vm = this
    this.$api.userLabelStatisticsReportForPieChart()
      .then(res => {
        if (res.type) return
        vm.details = res.data.details || []
      })
  }
}
</script>

<style lang="scss">

</style>
