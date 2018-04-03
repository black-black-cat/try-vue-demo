let temp = 'yyyy-mm-dd hh:MM:ss'
let rFmt = /y{2,4}|m{1,2}|d{1,2}|h{1,2}|M{1,2}|s{1,2}/g

function _dateParse (date = new Date(), template) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let M = date.getMinutes()
  let s = date.getSeconds()
  let arr = [y, m, d, h, M, s]
  let i = 0
  let fmt = (template || temp).replace(rFmt, function (matched) {
    if (matched == 'yy') { // eslint-disable-line
      arr[i] = ('' + arr[i]).slice(2)
    }
    return matched.length > 1 ? insertZero(arr[i++]) : arr[i++]
  })
  return fmt
}

function insertZero (num) {
  return num < 10 ? '0' + num : num
}

export default function dateParse (date) {
  return _dateParse(date, temp)
}

export function setTimeTemplate (myTemp) {
  temp = myTemp
}
