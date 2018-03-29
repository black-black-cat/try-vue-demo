<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="modal" :class="{show:open}" @click="handelModalClick">
    <transition name="popup-slide-bottom">
      <div class="calendar" v-show="open" ref="calendar">
        <div class="head">
          <span>选择日期</span>
          <div class="close icon icon-close" @click="close"></div>
        </div>
        <div class="toolbar" v-if="isToolbar">
          <div class="toolbar-inner">
            <div class="calendar-month-picker">
              <a class="calendar-prev" @click="handelMonthClick('pre')">
                <div class="pre-img"> &lt; </div>
              </a>
              <div class="current-month-value">{{ month[currentViewMonth.month - 1]}}</div>
              <a class="calendar-next" @click="handelMonthClick('next')">
                <div class="next-img">&gt;</div>
              </a>
            </div>
            <div class="calendar-year-picker">
              <a class="calendar-prev" @click="handelYearClick('pre')">
                <div class="pre-img">&lt;</div>
              </a>
              <div class="current-year-value">{{ currentViewMonth.year }}</div>
              <a class="calendar-next" @click="handelYearClick('next')">
                <div class="next-img">&gt;</div>
              </a>
            </div>
          </div>
        </div>

        <div class="calendar-inner">
          <div class="calendar-week">
            <div class="calendar-week-day" v-for="item in week" :key="item">{{item}}</div>
          </div>
          <div class="calendar-month" ref="calendar-touch">
<div class="calendar-month-wrapper" :style="{'transform': direction === 'h' ? 'translate3d(' + (translateX_parent) + '%, 0, 0)' : 'translate3d(0, ' + (translateY_parent) + '%, 0)'}">
<div class="calendar-month-pre" :style="{'transform': direction === 'h' ? 'translate3d(' + (translateX-100) + '%, 0, 0)' : 'translate3d(0, ' + (translateY-100) + '%, 0)'}">
                <div class="calendar-month-row" v-for="(row, row_index) in dateObj.pre.allDay_list">
                  <div class="calendar-day" v-for="(col, col_index) in row" @click="handelDayClick(col,col_index,dateObj.pre.start,dateObj.pre.end, $event)"
                    :class="{'grey':row_index*7+row_index*7+col_index<dateObj.pre.start || row_index*7+col_index>dateObj.pre.end ,'selected':col.selected }">
                    <span :class="{'today':col.isToday,'invalid':col.invalid}">
                      {{ col.value }}
                    </span>
                  </div>
                </div>
              </div>
<div class="calendar-month-current" :style="{'transform': direction === 'h' ? 'translate3d(' + (translateX) + '%, 0, 0)' : 'translate3d(0, ' + (translateY) + '%, 0)'}">

              <div class="calendar-month-head">
                  {{ currentViewMonth.year }}年{{ month[currentViewMonth.month - 1] }}
                </div>
                <div class="calendar-month-row" v-for="(row, row_index) in dateObj.current.allDay_list" :key="row_index">
                  <div class="calendar-day" v-for="(col, col_index) in row" @click="handelDayClick(col,row_index*7+col_index,dateObj.current.start,dateObj.current.end, $event)"
                    :class="{'grey':row_index*7+col_index<dateObj.current.start || row_index*7+col_index>dateObj.current.end ,'selected':col.selected }">
                    <span :class="{'today':col.isToday,'invalid':col.invalid}">
                      {{ col.value }}
                    </span>
                  </div>
                </div>
              </div>
<div class="calendar-month-next" :style="{'transform': direction === 'h' ? 'translate3d(' + (translateX+100) + '%, 0, 0)' : 'translate3d(0, ' + (translateY+100) + '%, 0)'}">
                <div class="calendar-month-head">
                  {{ currentViewMonth.month === 12 ? currentViewMonth.year + 1 : currentViewMonth.year }}年{{ currentViewMonth.month === 12 ? month[0] : month[currentViewMonth.month] }}
                </div>
                <div class="calendar-month-row" v-for="(row, row_index) in dateObj.next.allDay_list">
                  <div class="calendar-day" v-for="(col, col_index) in row" @click="handelDayClick(col,row_index*7+col_index,dateObj.next.start,dateObj.next.end, $event)"
                    :class="{'grey':row_index*7+col_index<dateObj.next.start || row_index*7+col_index>dateObj.next.end ,'selected':col.selected }">
                    <span :class="{'today':col.isToday,'invalid':col.invalid}">
                      {{ col.value }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import hasClass from 'dom-helpers/class/hasClass'

export default {
  name: 'calendar',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    closeByClickmask: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    defaultDate: {
      type: Date,
      default: null
    },
    maxDate: {
      type: Date,
      default: null
    },
    minDate: {
      type: Date,
      default: null
    },
    month: {
      type: Array,
      default: function() {
        return [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ]
      }
    },
    week: {
      type: Array,
      default: function() {
        return ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    },
    direction: {
      type: String,
      default: 'h'
    },
    timeLimit: {
      type: Number,
      default: 300
    },
    isToolbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: false,
      dateObj: {
        pre: {},
        current: {},
        next: {}
      },
      translateX: 0,
      translateX_parent: 0,
      translateY: 0,
      translateY_parent: 0,
      translateTime: 0,
      currentViewMonth: {
        year: 2017,
        month: 6,
        day: 1
      },
      selectedDate: {
        year: null,
        month: null,
        day: null
      },
      touch: {
        startX: null,
        startY: null
      }
    }
  },
  computed: {
    hDirection() {
      const vm = this
      return
    }
  },
  watch: {
    open(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.open = val
    }
  },
  created() {
    this.init()
  },
  mounted() {
    if (this.value) {
      this.open = true
    }
    this.$refs['calendar-touch'].addEventListener(
      'touchstart',
      this.handleTouchStart
    )
    this.$refs['calendar-touch'].addEventListener(
      'touchend',
      this.handleTouchEnd
    )
  },
  beforeDestroy() {
    this.$refs['calendar-touch'].removeEventListener(
      'touchstart',
      this.handleTouchStart
    )
    this.$refs['calendar-touch'].removeEventListener(
      'touchend',
      this.handleTouchEnd
    )
  },
  methods: {
    // 初始化
    init() {
      if (this.defaultDate) {
        if (this.defaultDate instanceof Date) {
          let dateArray = dateFormat(this.defaultDate, 'yyyy-MM-dd').split('-')
          this.selectedDate = {
            year: parseInt(dateArray[0]),
            month: parseInt(dateArray[1]),
            day: parseInt(dateArray[2])
          }
          this.currentViewMonth = {
            year: parseInt(dateArray[0]),
            month: parseInt(dateArray[1]),
            day: parseInt(dateArray[2])
          }
        } else {
          console.error('error parameter of defaultDate!')
        }
      } else {
        let dateArray = dateFormat(new Date(), 'yyyy-MM-dd').split('-')
        this.currentViewMonth = {
          year: parseInt(dateArray[0]),
          month: parseInt(dateArray[1]),
          day: parseInt(dateArray[2])
        }
      }
      if (
        !(this.month instanceof Array) ||
        !(this.week instanceof Array) ||
        this.month.length != 12 ||
        this.week.length != 7
      ) {
        console.error('error parameter of month or week!')
      }
      this.createdDate()
    },
    handleTouchStart(event) {
      this.touch.startX = event.touches[0].clientX
      this.touch.startY = event.touches[0].clientY
    },
    handleTouchEnd(event) {
      let endX = event.changedTouches[0].pageX,
        endY = event.changedTouches[0].pageY,
        distanceX = endX - this.touch.startX,
        distanceY = endY - this.touch.startY
      if (
        this.direction === 'h' &&
        Math.abs(distanceX) > Math.abs(distanceY) &&
        distanceX > 0 &&
        Math.abs(distanceX) > 50
      ) {
        this.handelMonthClick('pre', true)
      } else if (
        this.direction === 'h' &&
        Math.abs(distanceX) > Math.abs(distanceY) &&
        distanceX < 0 &&
        Math.abs(distanceX) > 50
      ) {
        this.handelMonthClick('next', true)
      }

      if (
        this.direction === 'h' &&
        Math.abs(distanceX) > Math.abs(distanceY) &&
        distanceX > 0 &&
        Math.abs(distanceX) > 50
      ) {
        this.handelMonthClick('pre', true)
      } else if (
        this.direction === 'h' &&
        Math.abs(distanceX) > Math.abs(distanceY) &&
        distanceX < 0 &&
        Math.abs(distanceX) > 50
      ) {
        this.handelMonthClick('next', true)
      }

      if (
        this.direction === 'v' &&
        Math.abs(distanceY) > Math.abs(distanceX) &&
        distanceY > 0 &&
        Math.abs(distanceY) > 50
      ) {
        this.handelMonthClick('pre', true)
      } else if (
        this.direction === 'v' &&
        Math.abs(distanceY) > Math.abs(distanceX) &&
        distanceY < 0 &&
        Math.abs(distanceY) > 50
      ) {
        this.handelMonthClick('next', true)
      }
    },
    handelModalClick(e) {
      if (this.closeByClickmask && !this.$refs.calendar.contains(e.target)) {
        this.open = false
      }
    },
    // 创建日期
    createdDate() {
      let year = this.currentViewMonth.year
      let month = this.currentViewMonth.month
      this.dateObj.pre = getAllDayInMonth(
        month == 1 ? year - 1 : year,
        month == 1 ? 12 : month - 1
      )
      this.dateObj.current = getAllDayInMonth(year, month)
      this.dateObj.next = getAllDayInMonth(
        month == 12 ? year + 1 : year,
        month == 12 ? 1 : month + 1
      )
      this.assignSelectedDate()
    },
    // 判断过度动画是否结束
    isTranslateEnd() {
      if (this.translateTime != 0) {
        let timeDuring = new Date() - this.translateTime
        if (timeDuring < this.timeLimit) {
          return false
        }
      }
      return true
    },
    // 月份切换
    handelMonthClick(action, translateCheck) {
      if (translateCheck && !this.isTranslateEnd()) return
      this.translateTime = new Date()
      if (action == 'pre') {
        this.translateX += 100
        this.translateY += 100
        if (this.currentViewMonth.month == 1) {
          this.currentViewMonth.year--
          this.currentViewMonth.month = 12
        } else {
          this.currentViewMonth.month--
        }
        setTimeout(() => {
          this.translateX_parent -= 100
          this.translateY_parent -= 100
          this.createdDate()
        }, this.timeLimit)
      }
      if (action == 'next') {
        this.translateX -= 100
        this.translateY -= 100
        if (this.currentViewMonth.month == 12) {
          this.currentViewMonth.year++
          this.currentViewMonth.month = 1
        } else {
          this.currentViewMonth.month++
        }
        setTimeout(() => {
          this.translateX_parent += 100
          this.translateY_parent += 100
          this.createdDate()
        }, this.timeLimit)
      }
    },
    // 年份切换
    handelYearClick(action) {
      // if(!this.isTranslateEnd())return;
      this.translateTime = new Date()
      if (action == 'pre') {
        this.translateX += 100
        this.translateY += 100
        this.currentViewMonth.year--
        setTimeout(() => {
          this.translateX_parent -= 100
          this.translateY_parent -= 100
          this.createdDate()
        }, 430)
      }
      if (action == 'next') {
        this.translateX -= 100
        this.translateY -= 100
        this.currentViewMonth.year++
        setTimeout(() => {
          this.translateX_parent += 100
          this.translateY_parent += 100
          this.createdDate()
        }, 430)
      }
    },
    // 日期选择
    handelDayClick(col, index, start, end, ev) {
      if (hasClass(ev.currentTarget, 'grey')) {
        return
      }
      if (!this.isTranslateEnd()) return
      if (col.invalid) return
      this.translateTime = new Date()
      this.open = false
      if (!col.selected) {
        this.removeSelectedDate()
        col.selected = true
        this.selectedDate.day = col.value
        if (index + 1 <= start) {
          this.selectedDate.month =
            this.currentViewMonth.month == 1
              ? 12
              : this.currentViewMonth.month - 1
          this.selectedDate.year =
            this.currentViewMonth.month == 1
              ? this.currentViewMonth.year - 1
              : this.currentViewMonth.year
          this.handelMonthClick('pre', false)
        } else if (index > end) {
          this.selectedDate.month =
            this.currentViewMonth.month == 12
              ? 1
              : this.currentViewMonth.month + 1
          this.selectedDate.year =
            this.currentViewMonth.month == 12
              ? this.currentViewMonth.year + 1
              : this.currentViewMonth.year
          this.handelMonthClick('next', false)
        } else {
          this.selectedDate.month = this.currentViewMonth.month
          this.selectedDate.year = this.currentViewMonth.year
        }
        let date = new Date(
          this.selectedDate.year,
          this.selectedDate.month - 1,
          this.selectedDate.day
        )
        this.$emit('change', date, dateFormat(date, this.format))
      }
    },
    // 移除已选择日期
    removeSelectedDate() {
      for (let key in this.dateObj) {
        for (let row in this.dateObj[key].allDay_list) {
          for (let col in this.dateObj[key].allDay_list[row]) {
            if (this.dateObj[key].allDay_list[row][col].selected) {
              this.dateObj[key].allDay_list[row][col].selected = false
            }
          }
        }
      }
    },
    // 设定已选日期,高亮当天，置灰不可选日期
    assignSelectedDate() {
      for (let key in this.dateObj) {
        for (let row in this.dateObj[key].allDay_list) {
          for (let col in this.dateObj[key].allDay_list[row]) {
            let year = this.dateObj[key].year,
              month = this.dateObj[key].month,
              day = this.dateObj[key].allDay_list[row][col].value,
              index = row * 7 + parseInt(col)
            if (index < this.dateObj[key].start) {
              year = month == 1 ? year - 1 : year
              month = month == 1 ? 12 : month - 1
            } else if (index > this.dateObj[key].end) {
              year = month == 12 ? year + 1 : year
              month = month == 12 ? 1 : month + 1
            }
            let date = new Date(year, month - 1, day),
              today = new Date()
            if (
              this.selectedDate.year == year &&
              this.selectedDate.month == month &&
              this.selectedDate.day == day
            ) {
              this.dateObj[key].allDay_list[row][col].selected = true
            }
            if (today - date >= 0 && today - date < 24 * 60 * 60 * 1000) {
              this.dateObj[key].allDay_list[row][col].isToday = true
            }
            if (
              this.minDate &&
              date -
                new Date(
                  this.minDate.getFullYear(),
                  this.minDate.getMonth(),
                  this.minDate.getUTCDate()
                ) <
                0
            ) {
              this.dateObj[key].allDay_list[row][col].invalid = true
            }
            if (
              this.maxDate &&
              date -
                new Date(
                  this.maxDate.getFullYear(),
                  this.maxDate.getMonth(),
                  this.maxDate.getUTCDate() + 1
                ) >
                0
            ) {
              this.dateObj[key].allDay_list[row][col].invalid = true
            }
          }
        }
      }
    },
    // 关闭弹层
    close () {
      this.$emit('close')
    }
  }
}

function getAllDayInMonth(year, month) {
  let allDay = new Array()
  let day = new Date()
  day.setFullYear(year, month - 1, 1)
  let firstDayInweek = day.getDay() == 0 ? 7 : day.getDay()
  day.setFullYear(year, month, 0)
  let daysCount = day.getDate()
  let start = firstDayInweek - 1
  let end = firstDayInweek + daysCount - 2
  for (let i = 0; i < daysCount; i++) {
    allDay[firstDayInweek + i - 1] = i + 1
  }
  day.setFullYear(year, month - 1, 0)
  let preDaysCount = day.getDate()
  for (let i = firstDayInweek - 1; i > 0; i--) {
    allDay[i - 1] = preDaysCount - (firstDayInweek - (i + 1))
  }
  for (let i = daysCount + firstDayInweek; i < 6 * 7 + 1; i++) {
    allDay[i - 1] = i - (daysCount + firstDayInweek) + 1
  }
  let allDay_list = new Array()
  for (let i = 0; i < 6; i++) {
    let item = new Array()
    for (let j = 0; j < 7; j++) {
      item[j] = {
        value: allDay[i * 7 + j],
        selected: false
      }
    }
    allDay_list.push(item)
  }
  return { allDay_list, start, end, year, month }
}

function dateFormat(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
</script>

<style lang="scss" scoped>
@import '../../styles/theme';

.modal {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s;
  -webkit-transition: opacity 0.3s;
}
.modal.show {
  width: 100%;
  height: 100%;
  opacity: 1;
}
.calendar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90vh;
  background-color: #fff;
  z-index: 10000;
  transform: translateY(0);
  -webkit-transform: translateY(0);
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
  transition-timing-function: linear;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
}

.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
  transform: translateY(300px);
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}

.head {
  position: relative;
  line-height: 100px;
  font-size: 34px;
  color: $c6;
  border-bottom: solid 1px $c11;

  .close {
    position: absolute;
    top: 20px;
    right: 28px;
  }
}

.toolbar {
  position: relative;
}

.toolbar-inner {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  height: 62px;
  line-height: 62px;
  text-align: center;
}

.calendar-month-picker,
.calendar-year-picker {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  min-width: 160px;
}

.current-month-value,
.current-year-value {
  width: 70px;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
}

.calendar-prev,
.calendar-next {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  font-size: 24px;
  color: $c6;
}

.pre-img,
.next-img {
  line-height: 1;
  color: $c1;
}

.calendar-inner {
  box-sizing: border-box;
}

.calendar-week {
  position: relative;
  display: flex;
  align-items: center;
  height: 62px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 24px;
  background: $c0;
  border-bottom: $c11;
  color: $c7;
}

.calendar-week::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #c4c4c4;
  transform: translateY(-0.5px);
  transform: scaleY(0.5);
}

.calendar-week-day {
  flex-grow: 1;
  text-align: center;
  width: 14.28571429%;
  width: -webkit-calc(100% / 7);
  width: calc(100% / 7);
  line-height: 20px;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
}

.calendar-month {
  position: relative;
  width: 100%;
  height: 648px + 62px + 62px + 180px * 2.5;
  // height: 648px + 62px + 10px;
  overflow: hidden;
}

.calendar-month-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 648px + 62px + 10px;
}

.calendar-month-pre,
.calendar-month-current,
.calendar-month-next {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  // height: 100%;
  height: 648px + 62px + 10px;
  transition-duration: 400ms;
  transition-timing-function: ease-in-out;
}

.calendar-month-head {
  height: 62px;
  margin-bottom: 10px;
  line-height: 62px;
  background-color: $c16;
  color: $c6;
  font-size: 28px;
}

.calendar-month-row {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  -webkit-flex-shrink: 1;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  height: 108px;
}

.calendar-month-row::after {
  // content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #ccc;
  transform: translateY(-0.5px);
  -webkit-transform: translateY(-0.5px);
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}

.calendar-day {
  box-sizing: border-box;
  font-size: 15px;
  color: #3d4145;
  text-align: center;
  cursor: pointer;
  flex-grow: 1;
  line-height: 40px;
  width: 14.28571429%;
  width: -webkit-calc(100% / 7);
  width: calc(100% / 7);
  height: 108px;
  color: $c6;
  font-size: 32px;
}

.calendar-day.grey {
  color: $c9;
  opacity: 0;
}

.calendar-day span {
  display: inline-block;
  width: 104px;
  height: 108px;
  line-height: 108px;
  border-radius: 8px;
}

.calendar-day span.invalid {
  color: #e0e0e0;
  cursor: not-allowed;
}
.calendar-day span.today {
  background-color: #eeeeee;
}
.calendar-day.selected span {
  color: #fff;
  background: #0894ec;
}
</style>
