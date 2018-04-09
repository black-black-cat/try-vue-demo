<template>
  <div class="container view-data-analyze">
    <template v-if="!isLite">
      <div class="nav">
        <!-- eslint-disable-next-line -->
        <router-link class="nav-item" v-for="(route, i) in nav.items" :key="i" :to="route.path">
          <div class="content">
            <div class="left">
              <i class="icon" :class="[route.icon]"></i>
            </div>
            <div class="right">
              <div class="title">{{route.name}}</div>
              <div class="title-sub">掌控最新趋势</div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="date">
        <div v-show="loadingDatePoint" class="loading-date-point">
          <van-loading color="white" />
        </div>
        <div class="date-head" @click="showCalendar">
          <span>{{currDate.displayName}}</span>
          <span class="triangle-down"></span>
        </div>
        <div class="date-body">
          <div class="btn left" @click="stepDate('prev')">前一天</div>
          <div class="center">
            <div class="num">
              <span>{{currDate.amount}}</span>
              <!-- <span class="small">万</span> -->
            </div>
            <div v-show="currDate.today" class="time">今日实时 更新时间{{hourFormate()}}</div>
          </div>
          <div class="btn right" @click="stepDate('next')">后一天</div>
        </div>
        <div class="date-bottom">
          <div class="item">
            <div class="name">销售数量:</div>
            <div class="value">{{currDate.saleNumber}}张</div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="name">入园数量:</div>
            <div class="value">{{currDate.usedNumber}}人</div>
          </div>
        </div>
      </div>
    </template>

    <div class="chart">
      <div class="chart-head" v-if="!isLite">销售趋势</div>
      <div class="chart-tabs">
        <div class="wrapper">
          <!-- eslint-disable-next-line -->
          <div class="tab"
          :class="{active: item.active, br0: item.br0}"
          v-for="(item, i) in dateTabs"
          @click="onDateTabChange(i)"
          >{{item.name}}</div>
        </div>
      </div>
      <div class="chart-content">
        <IEcharts :option="lineChart" :theme="chartTheme" />
      </div>
    </div>
    <div class="m-list">
      <div class="m-list-head">
        <div class="item">销售时间</div>
        <div class="item">销售金额</div>
        <div class="item">商品数量</div>
      </div>
      <ul class="m-list-content">
        <!-- eslint-disable-next-line -->
        <li v-for="item in saleRankDetailsCutted">
          <div class="col">
            <span>{{item.timeFlag}}</span>
            <span>{{item.weekDay}}</span>
          </div>
          <div class="col">{{item.saleAmount}}</div>
          <div class="col">{{item.saleNum}}</div>
        </li>
      </ul>
    </div>
    <template v-if="!isLite">
      <more target="/dataAnalyze/salesTrend"></more>
      <calendar v-model="calendar.calendarShow" :defaultDate="calendar.defaultDate" :month="calendar.month" :direction="calendar.direction" @close="hideCalendar" @change="onCalendarChange"></calendar>
    </template>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import theme from '@/utils/theme.mopon'
import {fecha, default as _} from '@/utils'
IEcharts.__echarts__.registerTheme('mopon', theme)

export default {
  components: { IEcharts },
  props: {
    isLite: {
      type: Boolean,
      default: false
    }
  },
  data () {
    console.log(this.$router, this.$route)
    const routes = this.$router.options.routes
    return {
      nav: {
        items: [
          {
            ...routes[4],
            icon: 'icon-nav-a'
          },
          {
            ...routes[5],
            icon: 'icon-nav-b'
          },
          {
            ...routes[6],
            icon: 'icon-nav-c'
          },
          {
            ...routes[7],
            icon: 'icon-nav-d'
          }
        ]
      },
      lineChartX: [],
      lineChartData: [],
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
      ],
      chartTheme: 'mopon',
      calendar: {
        calendarShow: false,
        defaultDate: new Date(),
        selectedDate: _.dateFormat(new Date(), 'yyyy-MM-dd'),
        month: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
        direction: 'v'
      },
      loadingDatePoint: false,
      datePoint: null,
      currDate: {},
      saleRankDetails: []
    }
  },

  computed: {
    lineChart () {
      const vm = this
      return {
        grid: {
          left: '12%',
          right: '6%'
        },
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            let downstairs = 2
            if (point[0] + size.contentSize[0] / 2 > size.viewSize[0]) {
              downstairs = 1.5
            }
            return [point[0] - size.contentSize[0] / downstairs, '10%']
          },
          formatter: objs => {
            let obj = objs[0]
            let name = fecha.format(new Date(obj.name), 'YYYY年M月D日')
            return `${name}<br/>销售额：${obj.value}`
          },
          backgroundColor: '#26a7ff'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: vm.lineChartX,
          axisLabel: {
            rotate: 45,
            formatter: v => v.slice(5)
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
          {
            data: vm.lineChartData,
            type: 'line',
            areaStyle: {},
            smooth: false
          }
        ]
      }
    },
    saleRankDetailsCutted () {
      let details = this.saleRankDetails
      return this.isLite ? details : details.slice(0, 5)
    }
  },

  mounted () {
    const vm = this
    !vm.isLite && vm.getDateSales()
    vm.getLineChartDate('week')
  },

  methods: {
    showCalendar () {
      this.calendar.calendarShow = true
    },
    hideCalendar () {
      this.calendar.calendarShow = false
    },
    hourFormate () {
      return fecha.format(new Date(), 'HH:mm:ss')
    },
    onDateTabChange (index) {
      const vm = this
      vm.dateTabs.forEach((tag, i) => {
        if (index === i) {
          tag.active = true
          vm.getLineChartDate(tag.alias)
        } else {
          tag.active = false
        }
        if (i === index - 1) {
          tag.br0 = true
        } else {
          tag.br0 = false
        }
      })
    },
    getDateSales (strDate) {
      const vm = this
      let day = strDate ? new Date(strDate) : new Date()
      vm.loadingDatePoint = true
      return vm.$api.daySales({
        pointDate: _.dateFormat(day, 'yyyy-MM-dd')
      })
        .then(res => {
          vm.loadingDatePoint = false
          if (res.type) {
            vm.$toast(res.message)
            let excess = true
            return excess
          }

          vm.datePoint = vm.$_.map(res.data, date => {
            date.timestamp = +new Date(date.pointDate)
            date.displayName = _.dateFormat(new Date(date.pointDate), 'yyyy年M月d日')
            return date
          })
          vm.datePoint = vm.$_.sortBy(vm.datePoint, ['timestamp'])
          vm.currDate = vm.datePoint[1]
          vm.currDate.today = true
        })
    },
    getLineChartDate (dateType) {
      const vm = this
      const _ = vm.$_
      this.$api.scenicSaleRankReport({
        dateType: dateType
      })
        .then(res => {
          if (res.type) return
          vm.lineChartData = res.data.series
          vm.lineChartData = _.map(vm.lineChartData, v => {
            v.timestamp = +new Date(v.name)
            return v
          })
          vm.lineChartData = _.sortBy(vm.lineChartData, ['timestamp'])
          console.log(res)
          vm.lineChartX = _.map(vm.lineChartData, v => v.name)

          vm.saleRankDetails = res.data.details
          _.each(vm.saleRankDetails, item => {
            item.weekDay = fecha.format(new Date(item.timeFlag), 'dddd')
          })
        })
    },
    onCalendarChange (date, formattedDate, prevCol, col) {
      this.getDateSales(formattedDate)
        .then(excess => {
          if (excess) {
            prevCol.selected = true
            col.selected = false
          }
        })
    },
    stepDate (act) {
      const vm = this
      let MS_DAY = 1000 * 60 * 60 * 24
      let msOffset = act === 'next' ? MS_DAY : -MS_DAY
      console.log(vm.currDate)
      let pointDate = vm.currDate.pointDate
      let msCurr = +new Date(pointDate)
      let target = fecha.format(new Date(msCurr + msOffset), 'YYYY-MM-DD')
      vm.getDateSales(target)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/theme";

.nav {
  line-height: 140px;
  padding: 20px 28px 40px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  font-size: 0;
  &-item {
    display: inline-block;
    vertical-align: top;
    width: 256px;
    height: 140px;
    line-height: 140px;
    margin: 0 12px;
    font-size: 30px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }

    .content {
      display: flex;
      height: 140px;
      align-items: center;
    }

    .left, .right {
      display: inline-block;
      vertical-align: center;
      line-height: 1;
    }
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      @include size(90px);
    }
    .right {
      .title-sub {
        padding-top: 12px;
        font-size: 24px;
      }
    }
  }
}

.date {
  position: relative;
  margin-bottom: 16px;
  .loading-date-point {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    >div {
      width: 100px;
      height: 100px;
    }
  }
  &-head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 54px;
    font-size: 32px;
    .triangle-down {
      display: inline-block;
      margin-top: 4px;
      margin-left: 8px;
      @include triangle("down", 17px, 10px, transparent);
    }
  }
  &-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;
    .btn {
      height: 160px;
      padding: 30px 26px;
      writing-mode: vertical-lr;
      font-size: 30px;
      &.left {
        border-radius: 0 40px 40px 0;
      }
      &.right {
        border-radius: 40px 0 0 40px;
      }
    }
    .center {
      .num {
        font-size: 100px;
        .small {
          font-size: 40px;
        }
      }
      .time {
        padding-top: 4px;
        font-size: 24px;
      }
    }
  }
  &-bottom {
    display: flex;
    align-items: center;
    height: 72px;
    margin-top: 40px;
    padding: 0 28px;
    .item {
      flex-grow: 1;
      line-height: 40px;
      font-size: 24px;
      > div {
        display: inline;
      }
    }
    .line {
      height: 40px;
      width: 0;
    }
  }
}

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
      &.br0 {
        border-right-width: 0;
      }
    }
  }
  &-content {
    height: 500px;
    // margin-top: 70px;
  }
}

.m-list {
  &-head {
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 28px;
    .item {
      flex-grow: 1;
      font-size: 24px;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
  &-content {
    font-size: 28px;
    li {
      display: flex;
      align-items: center;
      height: 116px;
      padding: 0 28px;
      .col {
        flex-grow: 1;

        >span {
          display: block;
          &:nth-child(2) {
            padding-top: 8px;
            font-size: 24px;
          }
        }

        &:first-child {
          flex-grow: 0;
          text-align: left;
          width: 33.33%;
        }
        &:last-child {
          text-align: right;
          transform: translatex(-0.5em);
        }
      }
    }
  }
}
</style>
