import layout from '@/layout'
export default {
  path: '/department',
  // name: 'department',
  component: layout,
  children: [{
    path: '',
    name: 'department',
    component: () => import('@/views/department'),
    meta: { title: '組織', icon: 'tree' }
  }]

}
