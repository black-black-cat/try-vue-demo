import Vue from 'vue'
import Router from 'vue-router'
import VueDocumentTitlePlugin from 'vue-document-title-plugin'
import Login from '@/views/Login'
const titles = {
  Login: '华侨城集团大数据分析'
}

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: titles.Login,
      component: Login,
      meta: {title: titles.Login}
    }
  ]
})

Vue.use(VueDocumentTitlePlugin, router, { defTitle: '数据中心', filter: title => `${title}` })

export default router
