import Vue from 'vue'
let _isLock = false
export const lock = () => {
  _isLock = true
}
export const unlock = () => {
  _isLock = false
}
export const isLock = () => _isLock

const bus = new Vue()
export default bus
