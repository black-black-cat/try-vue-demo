import Vue from 'vue'
import Router from 'vue-router'
import VueDocumentTitlePlugin from 'vue-document-title-plugin'
import Login from '@/views/Login'
const titles = {
  Login: '登录'
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

Vue.use(VueDocumentTitlePlugin, router, { defTitle: '数据中心', filter: title => `数据中心 - ${title}` })

export default router
