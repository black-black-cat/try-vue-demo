<template>
  <div class="view-sales">
    <line-chart></line-chart>
    <list></list>
    <pie-chart></pie-chart>
  </div>
</template>

<script>
import LineChart from './LineChart'
import PieChart from './PieChart'
import List from './List'

export default {
  components: {
    LineChart,
    PieChart,
    List
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
