<template>
  <div class="m-people-counting" v-if="data && data.length">
    <section-title>游客出行人数占比</section-title>
    <div class="chart-content">
      <IEcharts :option="chartOption" :theme="chartTheme" />
    </div>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import theme from '@/utils/theme.mopon'
import maxBy from 'lodash/maxBy'
IEcharts.__echarts__.registerTheme('mopon', theme)
export default {
  components: {
    IEcharts
  },
  props: {
    xAxis: Array,
    data: Array
  },
  data () {
    return {
      chartTheme: 'mopon'
    }
  },
  computed: {
    chartDataCustomed () {
      let value = maxBy(this.data, 'value')
      let item = {
        ...value,
        itemStyle: {
          color: '#00db9c'
        }
      }
      return this.data.map(v => {
        if (v === value) {
          return item
        }
        return v
      })
    },
    chartOption () {
      const vm = this
      const chartOption = {
        color: ['#26a7ff'],
        grid: {
          left: '12%',
          right: '6%'
        },
        xAxis: {
          type: 'category',
          // data: ['1人', '2人', '3人', '4人', '5人', '6人', '7人']
          data: vm.xAxis
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            // rotate: 45,
            formatter: (v) => {
              let str = (v * 100).toFixed(0) + '%'
              return str
            }
          }
        },
        calculable: true,
        series: [{
          data: vm.chartDataCustomed,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            distance: 10,
            // rotate: 45,
            formatter: (obj) => {
              let str = (obj.value * 100).toFixed(2) + '%'
              return str
            }
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
