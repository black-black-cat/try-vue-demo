<template>
  <div class="m-region">
    <section-title>游客地域分布</section-title>
    <div class="chart-content">
      <IEcharts :option="chartOption" :theme="chartTheme" />
    </div>
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
    cities: Array
  },
  // computed: {
  //   scaleCities () {
  //     console.log({name: city.name, value: city.value / 100})
  //     return this.cities.map(city => { return {name: city.name, value: city.value / 100} })
  //   }
  // },
  data () {
    const vm = this
    const scaleCities = vm.cities.map(city => { return {name: city.name, value: city.value / 10000} })
    console.log(scaleCities)
    return {
      chartOption: {
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
      },
      chartTheme: 'mopon'
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
</style>
