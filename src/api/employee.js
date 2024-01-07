import request from '@/utils/request'
// 獲取員工列表
export function getEmployeeList(params) {
  return request.get('/sys/user', { params })
}
// 導出員工excel
export function exportEmployee() {
  // 改變接收數據的類型, 使用blob接收二進制文件流
  return request.get('/sys/user/export', { responseType: 'blob', timeout: 0 })
}
// 下載導入模板
export function downloadTemplate() {
  return request.get('/sys/user/import/template', { responseType: 'blob', timeout: 0 })
}
// 導入員工excel(參數為formData類型)
export function importEmployee(file) {
  return request.post('/sys/user/import', file)
}
// 刪除員工
export function deleteEmployee(id) {
  return request.delete(`/sys/user/${id}`)
}
// 新增員工
export function addEmployee(data) {
  return request.post('/sys/user', data)
}
// 獲取員工詳情
export function getEmployeeDetails(id) {
  return request.get(`/sys/user/${id}`)
}
// 編輯員工
export function editEmployee(data) {
  return request.put(`/sys/user/${data.id}`, data)
}
// 上傳頭像
export function updateStaffPhoto(staffPhoto) {
  return request.put('/sys/updateStaffPhoto', staffPhoto)
}
// 獲取已啟用角色列表(分配角色用)
export function getEnabledRoleList() {
  return request.get('/sys/role/list/enabled')
}
// 分配員工角色
export function assignRole(id, roleIds) {
  return request.put('/sys/user/assignRoles', { id, roleIds })
}
