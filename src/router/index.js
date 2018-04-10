import Vue from 'vue'
import Router from 'vue-router'
import VueDocumentTitlePlugin from 'vue-document-title-plugin'

import Login from '@/views/Login'
import DataAnalyze from '@/views/DataAnalyze'

import Sales from '@/views/Sales'
import UserPortrait from '@/views/UserPortrait'
import Revisit from '@/views/Revisit'
import TouristTags from '@/views/TouristTags'

import SalesTrend from '@/views/SalesTrend'
import SalesFullList from '@/views/Sales/FullList'
import UserPortraitFullList from '@/views/UserPortrait/FullList'

import NotFound from '@/views/NotFound'

// import {isLogin} from '@/api/auth'

const titles = {
  Login: '华侨城集团大数据分析',
  DataAnalyze: '数据分析',
  SalesTrend: '销售趋势',
  Sales: '渠道销售',
  UserPortrait: '游客画像',
  Revisit: '游客重游',
  TouristTags: '游客标签',
  SalesFullList: '渠道销售排行',
  UserPortraitFullList: '地域占比排行'
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
      meta: {title: titles.DataAnalyze, needAuth: true}
    }, {
      path: '/dataAnalyze/salesTrend',
      name: titles.SalesTrend,
      component: SalesTrend,
      meta: {title: titles.SalesTrend, needAuth: true}
    },

    {
      path: '/sales',
      name: titles.Sales,
      component: Sales,
      meta: {title: titles.Sales, needAuth: true}
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
    }, {
      path: '/sales/fullList',
      name: titles.SalesFullList,
      component: SalesFullList,
      meta: {title: titles.SalesFullList, needAuth: true}
    }, {
      path: '/userPortrait/fullList',
      name: titles.UserPortraitFullList,
      component: UserPortraitFullList,
      meta: {title: titles.UserPortraitFullList, needAuth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if (to.matched.some(record => record.meta.needAuth)) {
  //   if (!isLogin()) {
  //     return next({path: '/login'})
  //   }
  // }
  if (to.path.indexOf('/mobile') > -1 || to.path.indexOf('/static') > -1) {
    next(false)
  } else {
    next()
  }
})

Vue.use(VueDocumentTitlePlugin, router, { defTitle: '数据中心', filter: title => `${title}` })

export default router
