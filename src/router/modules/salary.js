import layout from '@/layout'
export default {
  path: '/salary',
  // name: 'salary',
  component: layout,
  children: [
    {
      path: '',
      name: 'salary',
      component: () => import('@/views/salary'),
      meta: { title: '薪資', icon: 'money' }
    },
    {
      path: '/salary/detail/:userId/:yearMonth?',
      name: 'salaryDetail',
      component: () => import('@/views/salary/components/salaryDetail'),
      meta: { title: '薪資詳情' },
      hidden: true
    },
    {
      path: '/salary/setting',
      name: 'salarySetting',
      component: () => import('@/views/salary/components/salarySetting.vue'),
      meta: { title: '薪資設置' },
      hidden: true
    },
    {
      path: '/salary/report/:yearMonth?',
      name: 'salaryReport',
      component: () => import('@/views/salary/components/salaryReport.vue'),
      meta: { title: '報表' },
      hidden: true
    }
  ]

}
