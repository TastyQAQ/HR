import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
// 創建axios實例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // 基地址
  // timeout: 12000
})
// 請求攔截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    // 請求頭內注入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// 響應攔截器
service.interceptors.response.use((response) => {
  // axios默認包裹了data
  // 判斷是不是Blob
  if (response.data instanceof Blob) {
    return response.data// 返回了Blob對象
  }
  const { data, message, success } = response.data // 解構響應數據(默認json格式)
  if (success) {
    return data // 響應成功返回數據
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message)) // 響應失敗拋出錯誤提示
  }
}, async(error) => {
  // 當token失效時
  if (error.response.status === 401) {
    Message({ type: 'warning', message: '登入已超時' })
    await store.dispatch('user/logout') // 調用登出並刪除token和userInfo
    router.push('/login') // 返回登入頁
    return Promise.reject(error)
  }
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service
