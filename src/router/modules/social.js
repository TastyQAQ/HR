import layout from '@/layout'
export default {
  path: '/social',
  name: 'social',
  component: layout,
  children: [{
    path: '',
    name: 'Social',
    component: () => import('@/views/social'),
    meta: { title: '保險', icon: 'table' }
  }]

}
