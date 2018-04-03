import Vue from 'vue'
import Router from 'vue-router'
import VueDocumentTitlePlugin from 'vue-document-title-plugin'

import Login from '@/views/Login'
import DataAnalyze from '@/views/DataAnalyze'

import Sales from '@/views/Sales'
import UserPortrait from '@/views/UserPortrait'
import Revisit from '@/views/Revisit'
import TouristTags from '@/views/TouristTags'

import NotFound from '@/views/NotFound'

const titles = {
  Login: '华侨城集团大数据分析',
  DataAnalyze: '数据分析',
  Sales: '渠道销售',
  UserPortrait: '用户画像',
  Revisit: '游客重游',
  TouristTags: '游客标签'
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/dataAnalyze' },
    { path: '*', component: NotFound },
    {
      path: '/login',
      name: titles.Login,
      component: Login,
      meta: {title: titles.Login}
    }, {
      path: '/dataAnalyze',
      name: titles.DataAnalyze,
      component: DataAnalyze,
      meta: {title: titles.DataAnalyze}
    }, {
      path: '/sales',
      name: titles.Sales,
      component: Sales,
      meta: {title: titles.Sales}
    }, {
      path: '/userPortrait',
      name: titles.UserPortrait,
      component: UserPortrait,
      meta: {title: titles.UserPortrait}
    }, {
      path: '/revisit',
      name: titles.Revisit,
      component: Revisit,
      meta: {title: titles.Revisit}
    }, {
      path: '/touristTags',
      name: titles.TouristTags,
      component: TouristTags,
      meta: {title: titles.TouristTags}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/mobile') > -1) {
    next(false)
  } else {
    next()
  }
})

Vue.use(VueDocumentTitlePlugin, router, { defTitle: '数据中心', filter: title => `${title}` })

export default router
