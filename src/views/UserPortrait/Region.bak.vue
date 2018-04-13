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
    <div class="chart-content">
      <IEcharts :option="chartOptionComputed"
      :resizable="true"
      :theme="chartTheme" key="city"
      ref="chart"
      />
      <!-- <IEcharts v-show="chartTabs[1].active" :option="chartOptionComputed" :theme="chartTheme" key="province"/> -->
    </div>
    <!-- <div class="chart-content" v-show="chartTabs[1].active">
      <IEcharts :option="chartOptionComputed" :theme="chartTheme" key="province"/>
    </div> -->
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import theme from '@/utils/theme.mopon'
import {convertData} from './geoCoordMap'
import china from 'echarts/map/json/china.json'
IEcharts.__echarts__.registerTheme('mopon', theme)
IEcharts.__echarts__.registerMap('china', china)

// let cities = convertData([{name: '海门', value: 99},
//   {name: '鄂尔多斯', value: 12},
//   {name: '招远', value: 12},
//   {name: '舟山', value: 12},
//   {name: '齐齐哈尔', value: 14},
//   {name: '盐城', value: 15}])
// console.log(cities)

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
    }
  },
  // computed: {
  //   scaleCities () {
  //     console.log({name: city.name, value: city.value / 100})
  //     return this.cities.map(city => { return {name: city.name, value: city.value / 100} })
  //   }
  // },
  data () {
    return {
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
      console.log(activeChart.alias)
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
      console.log(activeChart.alias)
      if (activeChart.alias === 'city') {
        option = this.getChartOption()
      }
      if (activeChart.alias === 'province') {
        option = this.getchartOptionProvince()
      }
      this.chartOption = option
    },
    chartOptionComputed (val) {
      console.log(val)
      const vm = this
      this.$nextTick(() => {
        // vm.$refs.chart.update()
        vm.$refs.chart.instance.setOption(val)
      })
    }
  },
  methods: {
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
      const scaleCities = (vm.cities || []).map(city => { return {name: city.name, value: city.value / 10000} })
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
          // roam: true,
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
          // vm.customColor('#00db9c', scaleCities.slice(0, 1)),
          {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(scaleCities.slice(0)),
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
            return params.seriesName + '<br/>' + params.name + ': ' + value
          }
        },
        visualMap: {
          min: 500,
          max: 38000000,
          inRange: {
            color: ['#f1d412', '#00db9c', '#26a7ff']
          },
          text: ['High', 'Low'], // 文本，默认为数值文本
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
              emphasis: {label: {show: true}}
            },
            // 文本位置修正
            textFixed: {
              Alaska: [20, -20]
            },
            data: [
              {name: '上海', value: 54822023},
              {name: '北京', value: 731449},
              {name: '合肥', value: 6553255},
              {name: '广东', value: 2949131},
              {name: 'California', value: 38041430},
              {name: 'Colorado', value: 5187582},
              {name: 'Connecticut', value: 3590347},
              {name: 'Delaware', value: 917092},
              {name: 'District of Columbia', value: 632323},
              {name: 'Florida', value: 19317568},
              {name: 'Georgia', value: 9919945},
              {name: 'Hawaii', value: 1392313},
              {name: 'Idaho', value: 1595728},
              {name: 'Illinois', value: 12875255},
              {name: 'Indiana', value: 6537334},
              {name: 'Iowa', value: 3074186},
              {name: 'Kansas', value: 2885905},
              {name: 'Kentucky', value: 4380415},
              {name: 'Louisiana', value: 4601893},
              {name: 'Maine', value: 1329192},
              {name: 'Maryland', value: 5884563},
              {name: 'Massachusetts', value: 6646144},
              {name: 'Michigan', value: 9883360},
              {name: 'Minnesota', value: 5379139},
              {name: 'Mississippi', value: 2984926},
              {name: 'Missouri', value: 6021988},
              {name: 'Montana', value: 1005141},
              {name: 'Nebraska', value: 1855525},
              {name: 'Nevada', value: 2758931},
              {name: 'New Hampshire', value: 1320718},
              {name: 'New Jersey', value: 8864590},
              {name: 'New Mexico', value: 2085538},
              {name: 'New York', value: 19570261},
              {name: 'North Carolina', value: 9752073},
              {name: 'North Dakota', value: 699628},
              {name: 'Ohio', value: 11544225},
              {name: 'Oklahoma', value: 3814820},
              {name: 'Oregon', value: 3899353},
              {name: 'Pennsylvania', value: 12763536},
              {name: 'Rhode Island', value: 1050292},
              {name: 'South Carolina', value: 4723723},
              {name: 'South Dakota', value: 833354},
              {name: 'Tennessee', value: 6456243},
              {name: 'Texas', value: 26059203},
              {name: 'Utah', value: 2855287},
              {name: 'Vermont', value: 626011},
              {name: 'Virginia', value: 8185867},
              {name: 'Washington', value: 6897012},
              {name: 'West Virginia', value: 1855413},
              {name: 'Wisconsin', value: 5726398},
              {name: 'Wyoming', value: 576412},
              {name: 'Puerto Rico', value: 3667084}
            ]
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
  height: 500px;
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
