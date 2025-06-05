import layout from '@/layout'
export default {
  path: '/social',
  // name: 'social',
  component: layout,
  children: [
    {
      path: '',
      name: 'social',
      component: () => import('@/views/social'),
      meta: { title: '保險', icon: 'table' }
    },
    {
      path: '/social/detail/:id',
      name: 'socialDetial',
      component: () => import('@/views/social/components/socialDetail'),
      meta: { title: '保險詳情' },
      hidden: true
    },
    {
      path: '/social/report',
      name: 'yearMonthReport',
      component: () => import('@/views/social/components/yearMonthReport'),
      meta: { title: '保險月份報表' },
      hidden: true
    },
    {
      path: '/social/archive',
      name: 'historyArchive',
      component: () => import('@/views/social/components/historyArchive'),
      meta: { title: '保險歷史歸檔' },
      hidden: true
    }
  ]

}
