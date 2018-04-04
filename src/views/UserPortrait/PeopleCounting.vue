<template>
  <div class="m-people-counting">
    <section-title>游客出行人数占比</section-title>
    <div class="chart-content">
      <IEcharts :option="chartOption" :theme="chartTheme" />
    </div>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import theme from '@/utils/theme.mopon'
IEcharts.__echarts__.registerTheme('mopon', theme)
export default {
  components: {
    IEcharts
  },
  data () {
    return {
      chartTheme: 'mopon',
      chartData: [120, 200, 150, 80, 70, 110, 130]
    }
  },
  computed: {
    chartDataCustomed () {
      let value = Math.max(...this.chartData)
      let item = {
        value,
        itemStyle: {
          color: '#00db9c'
        }
      }
      return this.chartData.map(v => {
        if (v === value) {
          return item
        }
        return v
      })
    },
    chartOption () {
      const vm = this
      const chartOption = {
        grid: {
          left: '12%',
          right: '6%'
        },
        xAxis: {
          type: 'category',
          data: ['1人', '2人', '3人', '4人', '5人', '6人', '7人']
        },
        yAxis: {
          type: 'value'
        },
        calculable: true,
        series: [{
          data: vm.chartDataCustomed,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            distance: 10,
            rotate: 45
            // formatter: (obj) => {
            //   return `${obj.value} (${obj.percent}%)`
            // }
          }
        }]
      }
      return chartOption
    }
  }
}
</script>

<style lang="scss" scoped>
.m-people-counting {
  margin-top: 16px;
}
.chart-content {
  height: 500px;
}
</style>
