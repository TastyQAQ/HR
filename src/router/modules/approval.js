import layout from '@/layout'
export default {
  path: '/approval',
  // name: 'approval',
  component: layout,
  children: [{
    path: '',
    name: 'approval',
    component: () => import('@/views/approval'),
    meta: { title: '審核', icon: 'tree-table' }
  }]

}
