import request from '@/utils/request'

// 獲取部門數據
export function getDepartmentList() {
  return request.get('/company/department')
}
// 獲取負責人列表
export function getManagerList() {
  return request.get('/sys/user/simple')
}
// 新增部門
export function addDepartment(data) {
  return request.post('/company/department', data)
}
// 獲取部門資料(編輯用)
export function getDepartmentDetail(id) {
  return request.get(`/company/department/${id}`)
}
// 編輯部門
export function editDepartment(data) {
  return request.put(`/company/department/${data.id}`, data)
}
// 刪除部門
export function delDepartment(id) {
  return request.delete(`/company/department/${id}`)
}
