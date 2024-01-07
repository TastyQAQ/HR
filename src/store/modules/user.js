import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { constantRoutes, resetRouter } from '@/router'
const state = {
  token: getToken(), // 登入所需token
  userInfo: {}, // 用戶資料
  routes: constantRoutes // 路由名稱(靜態路由), 顯示左側導航菜單用
}
const mutations = {
  // 設置token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 移除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 設置用戶資料
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  // 設置用戶權限路由名稱
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 靜態路由+動態路由
  }
}
const actions = {
  // 登入並調用設置token
  async login(context, data) {
    const token = await login(data)
    context.commit('setToken', token)
  },
  //  獲取用戶資料並調用設置用戶資料
  async getUserInfo(context) {
    const userInfo = await getUserInfo()
    context.commit('setUserInfo', userInfo)
    return userInfo // 返回用戶資料, 判斷權限頁面用
  },
  // 登出並調用刪除token和userInfo
  logout(context) {
    context.commit('removeToken')
    context.commit('setUserInfo', {})
    resetRouter() // 重置路由
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

