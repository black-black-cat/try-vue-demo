let temp = 'yyyy-mm-dd hh:MM:ss'
let rFmt = /y{2,4}|m{1,2}|d{1,2}|h{1,2}|M{1,2}|s{1,2}/g

function format (date = new Date(), template) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let M = date.getMinutes()
  let s = date.getSeconds()
  // let arr = [y, m, d, h, M, s]
  let parts = {
    y,
    m,
    d,
    h,
    M,
    s
  }
  let fmt = (template || temp).replace(rFmt, function (matched) {
    if (matched == 'yy') { // eslint-disable-line
      parts.y = ('' + parts.y).slice(2)
    }
    return matched.length > 1
      ? prependZero(parts[matched[0]])
      : parts[matched[0]]
  })
  return fmt
}

function prependZero (num) {
  return num < 10 ? '0' + num : num
}

export default function timeFormat (date) {
  return format(date, temp)
}

export function setTimeTemplate (myTemp) {
  temp = myTemp
}

export {
  format
}
