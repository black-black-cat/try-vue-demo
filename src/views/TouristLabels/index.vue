<template>
  <div class="view-tourist-labels">
    <!-- <labels></labels> -->
    <people-ratio v-if="isDataReady" :data="pieData" :legend="pieLegend"></people-ratio>
    <my-details v-if="details && details.length" :details="details"></my-details>
  </div>
</template>

<script>
import Labels from './Labels'
import PeopleRatio from './PeopleRatio'
import myDetails from './Details'

export default {
  components: {
    Labels,
    PeopleRatio,
    myDetails
  },
  data () {
    return {
      pieData: [],
      pieLegend: [],
      isDataReady: false,
      details: []
    }
  },
  mounted () {
    const vm = this
    const _ = this.$_
    this.$api.userLabelStatisticsReportForPieChart()
      .then(res => {
        if (res.type) return
        let data = res.data || {}
        let legend = []
        vm.pieData = _.map(data.series, (v, k) => {
          legend.push(k)
          return {
            name: k,
            value: v
          }
        })
        vm.pieLegend = legend
        vm.details = data.details
        vm.isDataReady = true
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
