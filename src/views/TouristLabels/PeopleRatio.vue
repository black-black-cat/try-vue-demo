<template>
  <div class="m-people-ratio">
    <section-title>人群占比</section-title>
    <div class="chart-content">
      <IEcharts :option="chartOption" :theme="chartTheme" />
    </div>
  </div>
</template>

<script>
import echarts from '@/components/mixins/echarts'

export default {
  mixins: [echarts],
  props: {
    legend: Array,
    data: Array
  },
  data () {
    return {
      chartTheme: 'mopon'
    }
  },
  computed: {
    pieLegendCustomed () {
      return this.legend.map(v => { return {name: v, icon: 'circle'} })
    },
    chartOption () {
      const vm = this
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          width: 260,
          // orient: 'vertical',
          bottom: 2,
          padding: [0, 70, 0, 70],
          data: vm.pieLegendCustomed
        },
        series: [
          {
            name: '',
            type: 'pie',
            center: ['50%', '40%'],
            radius: ['32%', '55%'],
            avoidLabelOverlap: false,
            label: {
              formatter: (obj) => {
                return `${obj.percent}% \n ${obj.name}`
              },
              // normal: {
              //   show: true,
              //   position: 'center'
              // }
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: vm.data
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-people-ratio {
  padding-bottom: 60px;
}
.chart-content {
  height: 500px;
}
</style>
