import each from 'lodash/each'
import assign from 'lodash/assign'
import mapValues from 'lodash/mapValues'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import flatten from 'lodash/flatten'
import isEmpty from 'lodash/isEmpty'
import {default as timeFormat, setTimeTemplate} from './timeFormat'
import fecha from 'fecha'

function dateFormat (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export default {
  each,
  assign,
  map,
  mapValues,
  sortBy,
  flatten,
  isEmpty,
  dateFormat,
  timeFormat,
  setTimeTemplate
}

let lang = fecha.i18n
lang.dayNamesShort = ['日', '一', '二', '三', '四', '五', '六']
lang.dayNames = lang.dayNamesShort.map(short => '星期' + short)
lang.monthNamesShort = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
lang.monthNames = lang.monthNamesShort.map(short => short + '月')
lang.amPm = ['上午', '下午']

export {
  fecha
}
