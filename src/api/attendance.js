import request from '@/utils/request'
// 獲取考勤列表
export function getAttendanceList(params) {
  return request.get('/attendances', { params })
}
// 根據部門id獲取考勤規則
export function getAttendanceRule(departmentId) {
  return request.get('/cfg/atte/item', { params: { departmentId }})
}
// 保存考勤規則
export function saveAttendanceRule(data) {
  return request.put('/cfg/atte', data)
}
// 根據部門獲取請假規則
export function getLeaveRule(departmentId) {
  return request.get('/cfg/leave/list', { params: { departmentId }})
}
// 保存請假規則
export function saveLeaveRule(data) {
  return request.post('/cfg/leave', data)
}
// 根據部門獲取扣款規則
export function getDeductionRule(departmentId) {
  return request.get('/cfg/ded/list', { params: { departmentId }})
}
// 保存扣款規則
export function saveDeductionRule(data) {
  return request.post('/cfg/deduction', data)
}
// 根據部門獲取加班規則
export function getExtraDutyRule(departmentId) {
  return request.get('/cfg/extDuty/item', { params: { departmentId }})
}
// 保存加班規則
export function saveExtraDutyRule(data) {
  return request.put('/cfg/extDuty', data)
}
