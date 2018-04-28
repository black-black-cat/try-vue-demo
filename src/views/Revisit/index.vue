<template>
  <div class="view-revisit">
    <div class="nav">
      <div class="nav-left nav-item" :class="{disabled: !nav.prev}" @click="stepYear(-1, $event)" ref="stepYear">
        <i class="triangle triangle-left"></i>
        <span>前一年</span>
      </div>
      <div class="nav-center nav-item" @click="showPicker">
        <span>{{currYear}}</span>
        <i class="triangle triangle-down"></i>
      </div>
      <div class="nav-right nav-item" :class="{disabled: !nav.next}" @click="stepYear(1, $event)" ref="stepYear">
        <span>后一年</span>
        <i class="triangle triangle-right"></i>
      </div>
    </div>
    <bar-chart v-if="barChartReady"
    :newUsers="newUsers" :oldUsers="oldUsers" :xAxis="barX"
    :counting="barCounting"
    ></bar-chart>
    <list v-if="details && details.length" :details="details"></list>
    <van-popup v-model="popupShow" position="bottom">
      <picker :columns="years" :show-toolbar="true" @confirm="onPickerChange" ref="picker"/>
    </van-popup>
  </div>
</template>

<script>
import BarChart from './BarChart'
import List from './List'
import {Picker} from 'vant'
import bus from '@/store/bus'

export default {
  components: {
    BarChart,
    List,
    Picker
  },
  data () {
    return {
      currYear: '1970',
      thisYear: new Date().getFullYear(),
      // startYear: new Date().getFullYear() - 4,
      nav: {
        prev: true,
        next: true
      },
      years: [],
      yearsCount: 3,
      newUsers: [],
      oldUsers: [],
      barX: [],
      barChartReady: false,
      barCounting: {},
      details: [],
      popupShow: false,
      isYearStepping: false,
      defaultsBarData: {
        'totalNum': 0,
        'reTravelNum': 0,
        'oldUser': [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        'newUser': [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      }
    }
  },
  computed: {
    startYear () {
      return this.thisYear - (this.yearsCount - 1)
    }
  },
  mounted () {
    const vm = this
    vm.initCurrYear()
    vm.setYears()
    vm.getBarChartData(vm.currYear)
    vm.getListData(vm.currYear)

    bus.$on('Revisit.FullList.mounted', function (list) {
      list.$data.year = vm.currYear
    })
  },
  methods: {
    initCurrYear () {
      let time = new Date()
      this.currYear = time.getFullYear()
      this.setYearLimit()
    },
    setCurrYear (year) {
      this.currYear = year
      this.setYearLimit()
      if (this.isYearStepping) {
        let years = this.years[0].values
        this.$refs.picker.setColumnIndex(0, years.indexOf(year))
        this.isYearStepping = false
      }
    },
    setYearLimit () {
      if (this.currYear === this.thisYear) {
        this.nav = {
          ...this.nav,
          next: false
        }
      } else {
        this.nav = {
          ...this.nav,
          next: true
        }
      }
      if (this.currYear === this.startYear) {
        this.nav = {
          ...this.nav,
          prev: false
        }
      } else {
        this.nav = {
          ...this.nav,
          prev: true
        }
      }
    },
    setYears () {
      let thisYear = this.thisYear
      let years = []
      for (let i = 0; i < this.yearsCount; i++) {
        years.unshift(thisYear--)
      }
      this.years = [{
        values: years,
        defaultIndex: years.length - 1
      }]
    },
    getBarChartData (year) {
      const vm = this
      const _ = vm.$_
      return this.$api.userReLabelStatisticsReport({year})
        .then(res => {
          if (res.type) return
          let data = res.data
          if (_.isEmpty(data)) {
            data = vm.defaultsBarData
          }
          let monthCount = 1
          vm.newUsers = data.newUser.map(perMonth => perMonth * 100)
          vm.oldUsers = data.oldUser.map(perMonth => perMonth * 100)
          vm.barX = data.oldUser.map(perMonth => (monthCount++) + '月')
          vm.barCounting = {
            new: {value: data.totalNum - data.reTravelNum, name: '新游客量'},
            old: {value: data.reTravelNum, name: '重游客量'},
            total: {value: data.totalNum, name: '总游客量'}
          }
          vm.barChartReady = true
          vm.setCurrYear(year)
        })
    },
    getListData (year) {
      const vm = this
      this.$api.userReLabelDetailReport({year})
        .then(res => {
          if (res.type) return
          vm.details = res.data.map(v => {
            v.strPercent = (v.percent * 100).toFixed(1) + '%'
            return v
          }) || []
        })
    },
    getData (year) {
      const vm = this
      vm.getBarChartData(year)
      vm.getListData(year)
    },
    stepYear (offset, ev) {
      if (ev.currentTarget.classList.contains('disabled')) {
        return
      }
      const vm = this
      let curr = +vm.currYear
      // vm.currYear = curr + offset
      vm.getData(curr + offset)
      vm.isYearStepping = true
    },
    showPicker () {
      this.popupShow = true
    },
    onPickerChange (values, index) {
      this.popupShow = false
      values && values.length && this.getData(values[0])
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/theme";
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 28px;
  font-size: 30px;
  &-item {
    height: 100%;
    line-height: 100px;
    &.disabled {
      opacity: 0.3;
    }
  }
  &-left {

  }
  &-center {

  }
  &-right {

  }
  .triangle {
    display: inline-block;
    // margin-top: 4px;
    // margin-left: 8px;
    &-down {
      // margin-top: -8px;
      transform: translatey(-6px);
      @include triangle("down", 17px, 10px, transparent);
    }
    &-left {
      @include triangle("left", 10px, 17px, transparent);
    }
    &-right {
      @include triangle("right", 10px, 17px, transparent);
    }
  }
}
</style>

<style>
.van-picker__toolbar {
  font-size: 17px;
}
</style>
