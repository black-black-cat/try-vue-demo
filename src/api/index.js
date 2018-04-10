import Fly from 'flyio/dist/npm/fly'
import LocalStorage from '@/utils/LocalStorage'
import router from '@/router'
const fly = new Fly()
let token = new LocalStorage('app')

fly.interceptors.request.use((request) => {
  // Do something before request is sent
  let storedToken = getToken()
  if (storedToken) {
    request.headers.Authorization = storedToken
  }

  // Complete the request with custom data
  // return Promise.resolve()
})

fly.interceptors.response.use((res) => {
  if (typeof res.data === 'string') {
    res.data = JSON.parse(res.data)
  }
  if (!res.data.flag) {
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
      token.put('token', {
        ...res.data,
        time: +new Date()
      })
      router.replace({path: '/dataAnalyze'})
      return res
    })
    .catch((err) => {
      return err
    })
}

function getToken () {
  let [err, storedToken] = token.get('token')
  if (!err) {
    return storedToken.token
  }
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
