import layout from '@/layout'
export default {
  path: '/salary',
  // name: 'salary',
  component: layout,
  children: [{
    path: '',
    name: 'salary',
    component: () => import('@/views/salary'),
    meta: { title: '薪資', icon: 'money' }
  }]

}
