<template>
  <div class="chart m-pie-chart">
    <div class="chart-head">销售趋势</div>

    <div class="chart-content" ref="chart">
      <IEcharts v-if="isShow" :option="chartOption" :theme="chartTheme" />
    </div>
    <div class="row">
      <div class="col" v-for="(item, i) in dataGeneral" :key="i">
        <span class="num">{{item.value}}</span>
        <span class="name">{{item.name}}销售总额</span>
      </div>
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
  props: {
    dataGeneral: Array,
    dataDetail: Array
  },
  data () {
    return {
      isShow: false,
      chartOption: {
        tooltip: {
          // trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          extraCssText: 'text-align: left;'
        },
        series: [
          {
            name: '自有渠道 vs 第三方渠道',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              normal: {
                position: 'inner',
                formatter: (obj) => {
                  return `${obj.percent}% \n ${obj.name}`
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // data: [
            //   {value: 335, name: '直达', selected: true},
            //   {value: 679, name: '营销广告'},
            //   {value: 1548, name: '搜索引擎'}
            // ]
            data: this.dataGeneral
          },
          {
            name: '销售渠道',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: (obj) => {
                  return `${obj.percent}% \n ${obj.name}`
                }
              }
            },
            // data: [
            //   {value: 335, name: '直达'},
            //   {value: 310, name: '邮件营销'},
            //   {value: 234, name: '联盟广告'},
            //   {value: 135, name: '视频广告'},
            //   {value: 1048, name: '百度'},
            //   {value: 251, name: '谷歌'},
            //   {value: 147, name: '必应'},
            //   {value: 102, name: '其他'}
            // ]
            data: this.dataDetail
          }
        ]
      },
      chartTheme: 'mopon'
    }
  },
  mounted () {
    const vm = this
    vm.$nextTick(() => {
      vm.isShow = true
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
    height: 600px;
  }
}
.row {
  display: flex;
  .col {
    flex-grow: 1;
    &:first-child {
      @include hairline($c11, 'right')
    }
    .num {
      display: block;
      font-size: 34px;
    }
    .name {
      display: block;
      padding-top: 12px;
      font-size: 24px;
    }
  }
}
</style>
