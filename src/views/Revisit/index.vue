<template>
  <div class="view-revisit">
    <bar-chart v-if="barChartReady"
    :newUsers="newUsers" :oldUsers="oldUsers" :xAxis="barX"
    :counting="barCounting"
    ></bar-chart>
  </div>
</template>

<script>
import BarChart from './BarChart'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      newUsers: [],
      oldUsers: [],
      barX: [],
      barChartReady: false,
      barCounting: {}
    }
  },
  mounted () {
    const vm = this
    const _ = this.$_
    this.$api.userReLabelStatisticsReport({year: '2018'})
      .then(res => {
        if (res.type) return
        console.log(res)
        let data = res.data
        let monthCount = 1
        vm.newUsers = data.newUser.map(perMonth => perMonth * 100)
        vm.oldUsers = data.oldUser.map(perMonth => perMonth * 100)
        vm.barX = data.oldUser.map(perMonth => (monthCount++) + '月')
        vm.barCounting = {
          new: {value: data.totalNum - data.reTravelNum, name: '新游客量'},
          old: {value: data.reTravelNum, name: '重游客量'},
          total: {value: data.totalNum, name: '总游客量'}
        }
        vm.barChartReady = true
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
