import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 封裝自定義指令, 用以根據權限顯示添加員工按鈕
Vue.directive('permission', {
  // 被綁定元素插入父節點時調用 (僅保證父節點存在，但不一定已被插入文檔中)
  inserted: (el, binding) => {
    // el：指令所绑定的元素，可以用来直接操作 DOM
    const points = store.state.user.userInfo?.roles?.points || [] // 當前用戶訊息的操作權
    if (!points.includes(binding.value)) { // binding.value: 指令的綁定值
      // 不存在就要刪除或者禁用元素
      el.remove() // 刪除元素
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
