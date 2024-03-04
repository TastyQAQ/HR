import layout from '@/layout'
export default {
  path: '/employee',
  // name: 'employee',
  component: layout,
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: { title: '員工', icon: 'people' }
  },
  { path: '/employee/detail/:id?',
    component: () => import('@/views/employee/detail.vue'),
    hidden: true, // 表示隱藏在左側菜單
    meta: { title: '員工詳情' } // 顯示在導航的文本
  }]

}
