let id = 0
export default function (m) {
  return function (Vue) {
    Vue.component(m.name || `comp-${id++}`, m)
  }
}
