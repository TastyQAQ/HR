import request from '@/utils/request'
// 獲取薪資列表
export function getSalaryList(yearMonth) {
  return request.get(`/salarys/reports/${yearMonth}`, { params: { yearMonth: '202501', opType: '1' }})
}
// 獲取個人調薪資訊
export function getSalaryChange(userId) {
  return request.get(`/salarys/modify/${userId}`)
}
// 調薪
export function changeSalary(userId, data) {
  return request.post(`/salarys/modify/${userId}`, data)
}
// 定薪
export function initSalary(userId, data) {
  return request.post(`/salarys/init/${userId}`, data)
}
// 獲取企業計薪及津貼設置
export function getSalarySetting() {
  return request.get('/salarys/settings')
}
// 保存企業計薪及津貼設置
export function saveSalarySetting(data) {
  return request.post('/salarys/settings', data)
}
// 獲取企業月份
export function getCompanyDataMonth() {
  return request.get('/salarys/company-settings')
}
// 薪資數據歸檔
export function archiveSalaryData(yearMonth) {
  return request.post(`/salarys/historys/${yearMonth}/archive`)
}
// 新建報表
export function createReport(yearMonth) {
  return request.put(`/salarys/reports/${yearMonth}/newReport`)
}
// 導出報表
export function exportReport(yearMonth) {
  return request.get(`/salarys/historys/${yearMonth}/export`)
}
