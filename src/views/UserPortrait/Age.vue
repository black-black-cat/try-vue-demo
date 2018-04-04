<template>
  <div class="m-age">
    <section-title>游客年龄占比</section-title>
    <div class="chart-content">
      <IEcharts :option="lineChart" :theme="chartTheme" />
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
      pieData: [
        {value: 335, name: '90后'},
        {value: 310, name: '80后'},
        {value: 234, name: '00后'},
        {value: 135, name: '70后'},
        {value: 120, name: '60后'}
      ],
      pieLegend: ['90后', '80后', '00后', '70后', '60后'],
      chartTheme: 'mopon'
    }
  },
  computed: {
    pieDataTotal () {
      return this.pieData.reduce((memo, item) => memo + item.value, 0)
    },
    pieLegendCustomed () {
      return this.pieLegend.map(v => { return {name: v, icon: 'circle'} })
    },
    lineChart () {
      const vm = this
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          bottom: 36,
          data: vm.pieLegendCustomed
        },
        series: [
          {
            name: '',
            type: 'pie',
            center: ['50%', '40%'],
            radius: ['32%', '55%'],
            label: {
              formatter: (obj) => {
                console.log(obj)
                return `${obj.percent}% \n ${obj.name}`
              }
            },
            data: vm.pieData
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-age {
  margin-top: 16px;
}
.chart-content {
  height: 600px;
}
</style>
