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
  }, {
    path: '/approval/process_leave/detail/:id',
    name: 'processLeave',
    component: () => import('@/views/approval/components/processLeave.vue'),
    meta: { title: '請假申請' },
    hidden: true
  }, {
    path: '/approval/process_overtime/detail/:id',
    name: 'processOvertime',
    component: () => import('@/views/approval/components/processOvertime.vue'),
    meta: { title: '加班申請' },
    hidden: true
  }, {
    path: '/approval/process_dimission/detail/:id',
    name: 'processDimission',
    component: () => import('@/views/approval/components/processDimission.vue'),
    meta: { title: '離職申請' },
    hidden: true
  }]

}
