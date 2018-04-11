// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Toast, Loading, Popup } from 'vant'
import calendar from '@/components/calendar'
import more from '@/components/more'
import title from '@/components/title'
import * as api from '@/api'
import * as bus from '@/store/bus'
import _ from '@/utils'

Vue.use(calendar)
Vue.use(more)
Vue.use(title)
Vue.use(Loading)
Vue.use(Popup)

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$api = api
Vue.prototype.$bus = bus
Vue.prototype.$_ = _

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
