<template>
  <div class="chart m-line-chart">
    <div class="chart-head">销售趋势</div>
    <div class="chart-tabs">
      <div class="wrapper">
        <div class="tab border-right-none">7天</div>
        <div class="tab active">30天</div>
        <div class="tab">全年</div>
      </div>
    </div>
    <div class="chart-content" ref="chart">
      <!-- <IEcharts v-if="isShow" :option="lineChart" :theme="chartTheme" /> -->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import IEcharts from 'vue-echarts-v3/src/full.js'
import theme from '@/utils/theme.mopon'
IEcharts.__echarts__.registerTheme('mopon', theme)
echarts.registerTheme('mopon', theme)

export default {
  components: { IEcharts },
  data () {
    return {
      isShow: false,
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ],
      lineChart: {
        grid: {
          left: '12%',
          right: '6%'
        },
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            return [point[0] - size.contentSize[0] / 2, '10%']
          },
          formatter: '{b0} {c0}',
          backgroundColor: '#26a7ff'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
          bottom: 0
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [

        ],
        animation: true,
        animationEasing: 'elasticOut',
        animationDuration: function (idx) {
          // 越往后的数据延迟越大
          return idx * 100
        }
      },
      chartTheme: 'mopon'
    }
  },
  mounted () {
    const vm = this
    vm.$nextTick(() => {
      vm.isShow = true

      let myChart = echarts.init(vm.$refs.chart, 'mopon')
      myChart.setOption(vm.lineChart)
      vm.lineChart.series = vm.series
      myChart.setOption(vm.lineChart)
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "../../styles/theme";
.chart {
  padding: 0 28px 60px;
  &-head {
    padding-top: 40px;
    font-size: 34px;
    font-weight: 600;
    text-align: left;
  }
  &-tabs {
    padding-top: 36px;
    .wrapper {
      display: flex;
      justify-content: center;
      margin-left: 2px;
    }
    .tab {
      width: 107px;
      height: 68px;
      line-height: 68px;
      font-size: 28px;
      & + .tab {
        margin-left: -1px;
      }
      &:first-child {
        border-radius: 68px 0 0 68px;
      }
      &:last-child {
        border-radius: 0 68px 68px 0;
      }
    }
  }
  &-content {
    height: 500px;
  }
}
</style>
