import layout from '@/layout'
export default {
  path: '/salary',
  name: 'salary',
  component: layout,
  children: [{
    path: '',
    name: 'Salary',
    component: () => import('@/views/salary'),
    meta: { title: '薪資', icon: 'money' }
  }]

}
