<template>
  <div class="m-bar-chart">
    <section-title>游客年龄占比</section-title>
    <div class="chart-content">
      <IEcharts :option="chartOption" :theme="chartTheme" />
    </div>
    <div class="m-row">
      <!-- eslint-disable-next-line -->
      <div class="col" v-for="item in counting">
        <span class="num">{{item.value}}</span>
        <span class="name">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from '@/components/mixins/echarts'
export default {
  mixins: [echarts],
  props: {
    newUsers: Array,
    oldUsers: Array,
    xAxis: Array,
    counting: Object
  },
  data () {
    return {
      chartTheme: 'mopon'
    }
  },
  computed: {
    chartOption () {
      const vm = this
      // const labelOption = {
      //   normal: {
      //     show: true,
      //     // position: app.config.position,
      //     // distance: app.config.distance,
      //     // align: app.config.align,
      //     // verticalAlign: app.config.verticalAlign,
      //     // rotate: app.config.rotate,
      //     formatter: '{c}  {name|{a}}',
      //     fontSize: 16,
      //     rich: {
      //       name: {
      //         textBorderColor: '#fff'
      //       }
      //     }
      //   }
      // }
      return {
        // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        grid: {
          top: 30,
          left: '12%',
          right: '6%',
          show: true,
          backgroundColor: '#ffffff'
        },
        tooltip: {
          trigger: 'axis',
          extraCssText: 'text-align: left;background-color: rgba(0,0,0,0.8)',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: 0,
          data: [{name:
            '新游客占比',
          icon: 'circle'},
          {name: '重游客占比', icon: 'circle'}]
        },
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   left: 'right',
        //   top: 'center',
        //   feature: {
        //     mark: {show: true},
        //     dataView: {show: true, readOnly: false},
        //     magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        //   }
        // },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: vm.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '新游客占比',
            type: 'bar',
            barWidth: 4,
            barGap: 0.5,
            data: vm.newUsers
          },
          {
            name: '重游客占比',
            type: 'bar',
            barWidth: 4,
            data: vm.oldUsers
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-bar-chart {
  margin-top: 16px;
}
.chart-content {
  height: 500px;
}
.m-row {
  display: flex;
  margin: 60px 28px 0;
  .col {
    flex-grow: 1;
    height: 150px;
    >span {
      display: block;
    }
    .num {
      padding-top: 28px;
      font-size: 34px;
      font-weight: 600;
    }
    .name {
      padding-top: 14px;
    }
  }
}
</style>
