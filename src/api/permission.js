import request from '@/utils/request'
// 獲取權限點列表
export function getPermission() {
  return request.get('/sys/permission')
}
// 新增權限
export function addPermission(data) {
  return request.post('/sys/permission', data)
}
// 獲取權限詳情
export function getPermissionDetails(id) {
  return request.get(`/sys/permission/${id}`)
}
// 編輯權限
export function editPermission(data) {
  return request.put(`/sys/permission/${data.id}`, data)
}
// 刪除權限
export function deletePermission(id) {
  return request.delete(`/sys/permission/${id}`)
}
