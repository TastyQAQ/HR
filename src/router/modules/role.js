import layout from '@/layout'
export default {
  path: '/role',
  name: 'role',
  component: layout,
  children: [{
    path: '',
    name: 'Role',
    component: () => import('@/views/role'),
    meta: { title: '職務', icon: 'setting' }
  }]

}
