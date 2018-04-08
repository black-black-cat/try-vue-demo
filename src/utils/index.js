import each from 'lodash/each'
import assign from 'lodash/assign'
import mapValues from 'lodash/mapValues'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import {default as timeFormat, setTimeTemplate} from './timeFormat'

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
  dateFormat,
  timeFormat,
  setTimeTemplate
}
