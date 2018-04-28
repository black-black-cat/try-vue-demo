import LocalStorage from '@/utils/LocalStorage'

let token = new LocalStorage('app')

const isLogin = () => {
  let [err, storedToken] = token.get('token')
  if (!err) {
    return storedToken
  }
}

const storeLogin = (tokenStr) => {
  tokenStr && token.put('token', {
    tokenStr,
    time: +new Date()
  })
}

const delStoredToken = () => {
  token.del('token')
}

export {
  isLogin,
  storeLogin,
  delStoredToken
}
