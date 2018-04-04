<template>
  <div class="container view-data-analyze">
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
    <div class="m-list">
      <div class="m-list-head">
        <div class="item">销售时间</div>
        <div class="item">销售金额</div>
        <div class="item">商品数量</div>
      </div>
      <ul class="m-list-content">
        <!-- eslint-disable-next-line -->
        <li v-for="i in 'aaaaa'.split('')">
          <div class="col">
            <span>2018-03-15</span>
            <span>星期四</span>
          </div>
          <div class="col">1.33</div>
          <div class="col">1234</div>
        </li>
      </ul>
    </div>
    <more></more>

    <calendar v-if="calendar.calendarShow" v-model="calendar.calendarShow" :defaultDate="calendar.defaultDate" :month="calendar.month" :direction="calendar.direction" @close="hideCalendar"></calendar>
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

  mounted () {
    this.$api.daySales({
      pointDate: _.dateFormat(new Date(), 'yyyy-MM-dd')
    })
      .then(res => {
        console.log(res)
      })
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
