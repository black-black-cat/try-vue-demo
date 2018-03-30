// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Toast } from 'vant'
import calendar from '@/components/calendar'
import more from '@/components/more'

Vue.use(calendar)
Vue.use(more)

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
