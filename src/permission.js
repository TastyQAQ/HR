import NProgress from 'nprogress' // 進度條
import 'nprogress/nprogress.css' // 進度條樣式
import router from '@/router'
import store from '@/store'
import { asyncRoutes } from '@/router'

const whiteList = ['/login', '/404'] // 白名單(未登入的情況下能訪問的頁面)

// 路由前置守衛
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 有token直接放行
  if (store.getters.token) {
    // 有登入的情況下要訪問登入頁, 則跳轉回首頁
    if (to.path === '/login') {
      next('/')
      NProgress.done() // next（地址）沒有執行後置守衛
    } else {
      // 跳轉的頁面若沒有用戶資料(用戶資料為登入後跳轉頁面時獲取), 則重新獲取
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo') // 從用戶資料解構出用戶權限點相關資訊
        // 從動態路由數組內挑選出用戶路由權限點
        const filterRoutes = asyncRoutes.filter(item => {
          // roles.menus(用戶路由權限點), item.name(各路由的name屬性, 值需和用戶路由權限點匹配)
          return roles.menus.includes(item.name)
        })
        // 倉庫設置權限路由名稱(渲染左側導航菜單用, 故不需要404錯誤頁面)
        store.commit('user/setRoutes', filterRoutes)
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }]) // 將用戶權限頁面和404錯誤頁面(因404頁面露由須在所有路由的最後一個, 故在此添加)加至路由表
        // router添加動態路由之後 需要轉發一下
        next(to.path) // 目的是讓路由擁有信息 router的已知缺陷
      } else {
        next()
      }
    }
  } else {
    // 未登入訪問白名單頁面直接放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 路由後置守衛
router.afterEach(() => {
  NProgress.done()
})
