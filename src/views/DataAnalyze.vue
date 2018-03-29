<template>
  <div class="container view-data-analyze">
    <div class="nav">
      <div class="nav-item"></div>
      <div class="nav-item"></div>
      <div class="nav-item"></div>
    </div>
    <div class="date">
      <div class="date-head" @click="showCalendar">
        <span>今日销售 2018年3月20日</span>
        <span class="triangle-down"></span>
      </div>
      <div class="date-body">
        <div class="btn left">前一天</div>
        <div class="center">
          <div class="num">
            <span>23.00</span>
            <span class="small">万</span>
          </div>
          <div class="time">今日实时 更新时间15:38:16</div>
        </div>
        <div class="btn right disabled">后一天</div>
      </div>
      <div class="date-bottom">
        <div class="item">
          <div class="name">销售数量:</div>
          <div class="value">10826张</div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="name">入园数量:</div>
          <div class="value">7694人</div>
        </div>
      </div>
    </div>
    <div class="chart">
      <div class="chart-head">销售趋势</div>
      <div class="chart-tabs">
        <div class="wrapper">
          <div class="tab border-right-none">7天</div>
          <div class="tab active">30天</div>
          <div class="tab">全年</div>
        </div>
      </div>
      <div class="chart-content">
        <IEcharts :option="lineChart" :theme="chartTheme" />
      </div>
    </div>

    <calendar v-model="calendar.calendarShow" :defaultDate="calendar.defaultDate" :month="calendar.month" :direction="calendar.direction" @close="hideCalendar">

    </calendar>

  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import theme from '@/utils/theme.mopon'
import _ from '@/utils'
IEcharts.__echarts__.registerTheme('mopon', theme)

export default {
  components: { IEcharts },

  data () {
    return {
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {},
            smooth: false
          }
        ]
      },
      chartTheme: 'mopon',
      calendar: {
        calendarShow: false,
        defaultDate: new Date(),
        selectedDate: _.dateFormat(new Date(), 'yyyy-MM-dd'),
        month: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
        direction: 'v'
      }
    }
  },

  methods: {
    showCalendar () {
      this.calendar.calendarShow = true
    },
    hideCalendar () {
      this.calendar.calendarShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/theme";

.nav {
  padding: 20px 28px 40px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  font-size: 0;
  &-item {
    display: inline-block;
    width: 256px;
    height: 140px;
    margin: 0 12px;
    font-size: 30px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

.date {
  margin-bottom: 16px;
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
    }
  }
  &-content {
    height: 500px;
    // margin-top: 70px;
  }
}
</style>
