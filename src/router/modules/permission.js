import layout from '@/layout'
export default {
  path: '/permission',
  // name: 'permission',
  component: layout,
  children: [{
    path: '',
    name: 'permission',
    component: () => import('@/views/permission'),
    meta: { title: '權限', icon: 'lock' }
  }]

}
