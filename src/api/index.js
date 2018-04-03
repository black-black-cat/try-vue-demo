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

export const daySales = (payload) => {
  return fly.get('/mobile/realTimeReport/scenicNearbyDaySaleReport.html', payload)
    .then(res => {
      console.log(res)
    })
    .catch(err => err)
}
