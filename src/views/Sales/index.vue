<template>
  <div class="view-sales">
    <line-chart v-if="lineChart.data" :series="lineChart.data" :xAxisData="lineChart.xAxisData" :legendData="lineChart.legendData" @tabChange="onDateTabChange"></line-chart>
    <list :details="list"></list>
    <pie-chart v-if="pieChart.dataGeneral" :dataGeneral="pieChart.dataGeneral"
    :dataDetail="pieChart.dataDetail"
    ></pie-chart>
  </div>
</template>

<script>
import LineChart from './LineChart'
import PieChart from './PieChart'
import List from './List'
// import {fecha} from '@/utils'
import bus from '@/store/bus'

export default {
  components: {
    LineChart,
    PieChart,
    List
  },
  data () {
    return {
      lineChart: {},
      list: null,
      pieChart: {}
    }
  },
  mounted () {
    this.getLineChartData('week')
    this.getPieChartData()
  },
  methods: {
    getLineChartData (dateType) {
      const vm = this
      const _ = vm.$_
      vm.$api.channelSalRankReportForLineChart({dateType: dateType})
        .then(res => {
          if (res.type) return
          vm.list = res.data.details
          _.each(vm.list, item => {
            item.strPercent = (item.percent * 100).toFixed(1) + '%'
            if (item.amount >= 10000) {
              item.strAmount = (item.amount / 10000).toFixed(1) + '万'
            } else {
              item.strAmount = item.amount
            }
          })

          bus.$on('Sales.FullList.mounted', function (fullList) {
            fullList.$data.details = vm.list
          })

          let xAxisData = []
          let legendData = []
          vm.lineChart.data = _.map(res.data.series || {}, (v, k) => {
            legendData.push(k)
            let sorted = _.sortBy(_.map(v, item => {
              item.timestamp = +new Date(item.name)
              return item
            }), 'timestamp')
            return {
              name: k,
              type: 'line',
              symbol: 'circle',
              showSymbol: false,
              smooth: true,
              data: _.map(sorted, item => {
                if (xAxisData.indexOf(item.name) === -1) {
                  xAxisData.push(item.name)
                }
                return item.value
              })
            }
          })
          vm.lineChart.xAxisData = xAxisData
          vm.lineChart.legendData = legendData
          vm.lineChart = {
            ...vm.lineChart
          }
        })
    },
    onDateTabChange (dateType) {
      this.getLineChartData(dateType)
    },
    getPieChartData () {
      const vm = this
      const _ = vm.$_
      vm.$api.channelSalRankReportForPieChart({dateType: 'year'})
        .then(res => {
          if (res.type) return
          let data = res.data || {}
          vm.pieChart.dataGeneral = [
            {
              name: '第三方渠道',
              value: data.thirdChannelAmount
            },
            {
              name: '自有渠道',
              value: data.selfChannelAmount
            }
          ]
          let detail = _.map(data.series, (v, k) => {
            return {
              name: k,
              value: v
            }
          })

          // detail.push({
          //   name: '第三方渠道',
          //   value: data.thirdChannelAmount
          // })

          vm.pieChart.dataDetail = detail || []
          vm.pieChart = {
            ...vm.pieChart
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
