<template>
  <div class="m-region chart">
    <section-title>游客地域分布</section-title>
    <div class="chart-tabs">
      <div class="wrapper">
        <!-- eslint-disable-next-line -->
        <div class="tab"
        :class="{active: item.active, br0: item.br0}"
        v-for="(item, i) in chartTabs"
        @click="onChartTabChange(i)"
        >{{item.name}}</div>
      </div>
    </div>
    <div v-for="(tab, i) in chartTabs"
     v-show="tab.active"
     :key="i"
     class="chart-content" ref="chartContent">
      <!-- <IEcharts :option="chartOptionComputed"
      :resizable="true"
      :theme="chartTheme" key="city"
      ref="chart"
      /> -->
      <!-- <IEcharts v-show="chartTabs[1].active" :option="chartOptionComputed" :theme="chartTheme" key="province"/> -->
    </div>
    <!-- <div class="chart-content" v-show="chartTabs[1].active">
      <IEcharts :option="chartOptionComputed" :theme="chartTheme" key="province"/>
    </div> -->
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import echarts from 'echarts'
import theme from '@/utils/theme.mopon'
import {convertData} from './geoCoordMap'
import china from 'echarts/map/json/china.json'
IEcharts.__echarts__.registerTheme('mopon', theme)
IEcharts.__echarts__.registerMap('china', china)
echarts.registerTheme('mopon', theme)
echarts.registerMap('china', china)

export default {
  components: {
    IEcharts
  },
  props: {
    cities: {
      type: Array,
      default: function () {
        return []
      }
    },
    provinces: Array
  },
  // computed: {
  //   scaleCities () {
  //     console.log({name: city.name, value: city.value / 100})
  //     return this.cities.map(city => { return {name: city.name, value: city.value / 100} })
  //   }
  // },
  data () {
    return {
      myChart: null,
      myChart2: null,
      chartOption: null,
      chartTheme: 'mopon',
      chartTabs: [
        {
          name: '活跃城市',
          alias: 'city',
          active: true,
          br0: false
        }, {
          name: '活跃省份',
          alias: 'province',
          active: false,
          br0: false
        }
      ]
    }
  },
  computed: {
    chartOptionComputed () {
      let activeChart = this.chartTabs.filter(v => v.active)[0]
      let option
      if (activeChart.alias === 'city') {
        option = this.getChartOption()
      }
      if (activeChart.alias === 'province') {
        option = this.getchartOptionProvince()
      }
      return option
    }
  },
  watch: {
    chartTabs (val) {
      let activeChart = val.filter(v => v.active)[0]
      let option
      if (activeChart.alias === 'city') {
        option = this.getChartOption()
      }
      if (activeChart.alias === 'province') {
        option = this.getchartOptionProvince()
      }
      this.chartOption = option
    },
    chartOptionComputed (val) {
      const vm = this
      this.$nextTick(() => {
        // vm.$refs.chart.update()
        vm.initCharts()
      })
    }
  },
  mounted () {
    this.initCharts()
  },
  methods: {
    initCharts () {
      const vm = this
      vm.myChart = echarts.init(vm.$refs.chartContent[0], 'mopon', {
        width: window.innerWidth,
        height: 'auto'
      })
      vm.myChart.setOption(vm.getChartOption())

      vm.myChart2 = echarts.init(vm.$refs.chartContent[1], 'mopon', {
        width: window.innerWidth,
        height: 'auto'
      })
      vm.myChart2.setOption(vm.getchartOptionProvince())
    },
    customColor (color, data, name = '') {
      return {
        name: name,
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize: function (val) {
          return val[2] / 10
        },
        // showEffectOn: 'render',
        rippleEffect: {
          period: 3,
          scale: 3.2,
          brushType: 'fill'
        },
        // hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: color,
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
    },
    getChartOption () {
      const vm = this
      const scaleCities = (vm.cities || []).map(city => { return {name: city.name, value: city.value} })
      return {
        grid: {
          width: '100%',
          height: '100%'
        },
        // backgroundColor: '#404a59',
        title: {
          text: '',
          subtext: '',
          left: 'center'
          // textStyle: {
          //   color: '#fff'
          // }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['pm2.5'],
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#edeff0',
              borderColor: '#999'
            },
            emphasis: {
              areaColor: '#ccc'
            }
          }
        },
        series: [
          vm.customColor('#00db9c', scaleCities.slice(0, 1)),
          {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(scaleCities.slice(1)),
            symbolSize: function (val) {
              return val[2] / 10
            },
            // showEffectOn: 'render',
            rippleEffect: {
              period: 3,
              scale: 3.2,
              brushType: 'fill'
            },
            // hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#26a7ff',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      }
    },
    getchartOptionProvince () {
      const vm = this
      return {
        // title: {
        //   text: 'USA Population Estimates (2012)',
        //   subtext: 'Data from www.census.gov',
        //   sublink: 'http://www.census.gov/popest/data/datasets.html',
        //   left: 'right'
        // },
        grid: {
          height: '100%'
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            var value = (params.value + '').split('.')
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
            return params.name ? params.name + ': ' + value : '暂无数据'
          }
        },
        visualMap: {
          min: 500,
          max: 100000000,
          inRange: {
            color: ['#f1d412', '#00db9c', '#26a7ff']
          },
          text: ['数量多', '数量少'], // 文本，默认为数值文本
          calculable: true,
          orient: 'horizontal'
        },
        // toolbox: {
        //   show: true,
        //   // orient: 'vertical',
        //   left: 'left',
        //   top: 'top',
        //   feature: {
        //     dataView: {readOnly: false},
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        series: [
          {
            name: 'province',
            type: 'map',
            roam: true,
            map: 'china',
            itemStyle: {
              areaColor: '#edeff0',
              borderColor: '#999'
              // itemStyle: {
              //   normal: {
              //     areaColor: '#edeff0',
              //     borderColor: '#999'
              //   },
              //   emphasis: {
              //     areaColor: '#ccc'
              //   }
              // },
            },
            emphasis: {
              // label: {show: true},
              itemStyle: {areaColor: '#ccc'}
            },

            // 文本位置修正
            textFixed: {
              Alaska: [20, -20]
            },
            data: vm.provinces
          }
        ]
      }
    },
    onChartTabChange (index) {
      this.chartTabs.forEach((tab, i) => {
        if (i === index) {
          tab.active = true
        } else {
          tab.active = false
        }
        if (i === index - 1) {
          if (tab) {
            tab.br0 = true
          }
        } else {
          tab.br0 = false
        }
      })
      this.chartTabs = [
        ...this.chartTabs
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.m-region {
  margin-top: 16px;
}
.chart-content {
  height: 600px;
}
.chart-tabs {
    padding-top: 36px;
    .wrapper {
      display: flex;
      justify-content: center;
      margin-left: 2px;
    }
    .tab {
      min-width: 107px;
      height: 68px;
      padding: 0 1em;
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
      &.br0 {
        border-right-color: transparent;
      }
    }
  }
</style>
