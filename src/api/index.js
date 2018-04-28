import Fly from 'flyio/dist/npm/fly'
import router from '@/router'
import {isLogin, delStoredToken, storeLogin} from './auth'
const fly = new Fly()

fly.interceptors.request.use((request) => {
  // Do something before request is sent
  let storedToken = isLogin()
  if (storedToken) {
    request.headers.Authorization = storedToken.tokenStr
  }

  // Complete the request with custom data
  // return Promise.resolve()
})

fly.interceptors.response.use((res) => {
  if (typeof res.data === 'string') {
    res.data = JSON.parse(res.data)
  }
  if (typeof res.data.data === 'string') {
    let oldData = res.data.data
    try {
      res.data.data = JSON.parse(res.data.data)
    } catch (err) {
      res.data.data = oldData
    }
  }

  if (!res.data.flag) {
    if (res.data.errorCode === 'A003' || res.data.errorCode === 'A004') {
      router.replace({path: '/login'})
      delStoredToken()
    }
    // eslint-disable-next-line
    return Promise.reject({
      type: -1,
      message: res.data.message,
      res: res.data
    })
  }

  return res.data
}, (error) => {
  console.log('promise error:' + error)
  // eslint-disable-next-line
  return Promise.reject({
    type: -2,
    message: '请求出错!',
    res: error
  })
})

export default fly

// 登录
export const login = (payload) => {
  return fly.get('/mobile/authority/login.html', payload)
    .then((res) => {
      storeLogin(res.data.token)
      router.replace({path: '/dataAnalyze'})
      return res
    })
    .catch((err) => {
      return err
    })
}

// 三日销售数据
export const daySales = (payload) => {
  return fly.get('/mobile/realTimeReport/scenicNearbyDaySaleAndUsedReport.html', payload)
    .then(res => res)
    .catch(err => err)
}

// 销售趋势
export const scenicSaleRankReport = (payload) => {
  return fly.get('/mobile/realTimeReport/scenicSaleRankReport.html', payload)
    .then(res => res)
    .catch(err => err)
}

// 游客性别比例
export const userSexAccountingReport = () => {
  return fly.get('/mobile/periodReport/userSexAccountingReport.html')
    .then(res => res)
    .catch(err => err)
}

// 游客年龄比例
export const userAgeBuyNumReport = () => {
  return fly.get('/mobile/periodReport/userAgeBuyNumReport.html')
    .then(res => res)
    .catch(err => err)
}

// 出行人数
export const travelersReport = () => {
  return fly.get('/mobile/periodReport/travelersReport.html')
    .then(res => res)
    .catch(err => err)
}

// 景区地域购票分析
export const userAreaBuyNumReport = () => {
  return fly.get('/mobile/periodReport/userAreaBuyNumReport.html')
    .then(res => res)
    .catch(err => err)
}

// 渠道销售
export const channelSalRankReportForLineChart = (payload) => {
  return fly.get('/mobile/realTimeReport/channelSalRankReportForLineChart.html', payload)
    .then(res => res)
    .catch(err => err)
}

// 渠道销售趋势
export const channelSalRankReportForPieChart = (payload) => {
  return fly.get('/mobile/realTimeReport/channelSalRankReportForPieChart.html', payload)
    .then(res => res)
    .catch(err => err)
}

// 重游比例
export const userReLabelStatisticsReport = (payload) => {
  return fly.get('/mobile/periodReport/userReLabelStatisticsReport.html', payload)
    .then(res => res)
    .catch(err => err)
}

// 重游明细
export const userReLabelDetailReport = (payload) => {
  return fly.get('/mobile/periodReport/userReLabelDetailReport.html', payload)
    .then(res => res)
    .catch(err => err)
}

// 游客标签之人群占比
export const userLabelStatisticsReportForPieChart = () => {
  return fly.get('/mobile/periodReport/userLabelStatisticsReportForPieChart.html')
    .then(res => res)
    .catch(err => err)
}

// 游客标签之游客记录
export const userLabelUsedDetail = (payload) => {
  return fly.get('/mobile/periodReport/userLabelUsedDetail.html', payload)
    .then(res => res)
    .catch(err => err)
}
