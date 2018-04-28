<template>
  <div class="chart m-line-chart">
    <div class="chart-head">渠道销售趋势（TOP3）</div>
    <div class="chart-tabs">
      <div class="wrapper">
        <!-- eslint-disable-next-line -->
        <div class="tab"
        v-for="(tab, i) in dateTabs"
        :class="{active: tab.active, 'border-right-none': tab.br0}"
        @click="tabChange(tab.alias, i)"
        >{{tab.name}}</div>
      </div>
    </div>
    <div class="chart-content" ref="chart">
      <IEcharts :option="lineChart" :theme="chartTheme" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import IEcharts from 'vue-echarts-v3/src/full.js'
import theme from '@/utils/theme.mopon'
import {fecha} from '@/utils'
IEcharts.__echarts__.registerTheme('mopon', theme)
echarts.registerTheme('mopon', theme)

export default {
  components: { IEcharts },
  props: {
    series: Array,
    xAxisData: Array,
    legendData: Array
  },
  data () {
    return {
      isShow: false,
      x: [
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
      chartTheme: 'mopon',
      dateTabs: [
        {
          name: '7天',
          alias: 'week',
          active: true
        }, {
          name: '月',
          alias: 'month',
          active: false
        }, {
          name: '年',
          alias: 'year',
          active: false
        }
      ]
    }
  },
  computed: {
    lineChart () {
      const vm = this
      const _ = vm.$_
      let lineChartBase = {
        grid: {
          top: 40,
          left: '12%',
          right: '6%',
          height: 185
        },
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            let downstairs = 2
            if (point[0] + size.contentSize[0] / 2 > size.viewSize[0]) {
              downstairs = 1.2
            }
            if (point[0] - size.contentSize[0] / 2 < 0) {
              downstairs = 3
            }
            return [point[0] - size.contentSize[0] / downstairs, '-5%']
          },
          formatter: objs => {
            let list = []
            _.each(objs, obj => {
              list.push(`${obj.seriesName}：${obj.value}`)
            })
            let name = fecha.format(new Date(objs[0].name), 'YYYY年M月D日')
            return `${name}销售额：<br/>${list.join('<br/>')}`
          },
          backgroundColor: '#26a7ff'
        },
        legend: {
          data: [{
            icon: 'circle'
          }],
          bottom: 0
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            formatter: v => {
              let re = /\d{2,4}-\d{1,2}-\d{1,2}/
              return re.test(v) ? v.slice(5) : v
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (v) => {
              let label
              if (v >= 10000) {
                label = Math.floor(v / 10000) + '万'
              } else {
                label = v
              }
              return label
            }
          }
        },
        series: [

        ],
        animation: true,
        animationEasing: 'elasticOut',
        animationDuration: function (idx) {
          // 越往后的数据延迟越大
          return idx * 100
        }
      }
      lineChartBase.series = vm.series
      lineChartBase.xAxis.data = vm.xAxisData
      lineChartBase.legend.data = vm.legendData
      return lineChartBase
    }
  },
  mounted () {
    const vm = this
    vm.$nextTick(() => {
      vm.lineChart.series = vm.series
      vm.lineChart.xAxis.data = vm.xAxisData
      vm.lineChart.legend.data = vm.legendData
      vm.isShow = true
      // debugger
      // let myChart = echarts.init(vm.$refs.chart, 'mopon')
      // myChart.setOption(vm.lineChart)
    })
  },
  methods: {
    tabChange (dateType, index) {
      const vm = this
      vm.$emit('tabChange', dateType)

      vm.dateTabs.forEach((tag, i) => {
        if (index === i) {
          tag.active = true
        } else {
          tag.active = false
        }
        if (i === index - 1) {
          tag.br0 = true
        } else {
          tag.br0 = false
        }
      })
    }
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
    height: 600px;
  }
}
</style>
