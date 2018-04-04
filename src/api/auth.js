import LocalStorage from '@/utils/LocalStorage'

let token = new LocalStorage('app')

const isLogin = () => {
  let [err, storedToken] = token.get('token')
  if (!err) {
    return storedToken.token
  }
}

const saveLogin = (tokenStr) => {
  token.put('token', {
    tokenStr,
    time: +new Date()
  })
}

export {
  isLogin,
  saveLogin
}
