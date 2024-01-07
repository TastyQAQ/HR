import request from '@/utils/request'
// 獲取角色列表
export function getRoleList(params) {
  return request.get('/sys/role', { params })
}
// 新增角色
export function addRole(data) {
  return request.post('/sys/role', data)
}
// 編輯角色
export function editRole(data) {
  return request.put(`/sys/role/${data.id}`, data)
}
// 刪除角色
export function deleteRole(id) {
  return request.delete(`/sys/role/${id}`)
}
// 分配權限
export function assignPermission(id, permIds) {
  return request.put('/sys/role/assignPrem', { id, permIds })
}
// 獲取角色詳情(獲取權限點用)
export function getRoleDetails(id) {
  return request.get(`/sys/role/${id}`)
}
