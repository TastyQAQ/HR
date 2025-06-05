import request from '@/utils/request'
// 獲取城市列表
export function getCityList() {
  return request.get('/sys/city')
}
// 獲取保險列表
export function getSocilaList(data) {
  return request.post('/social_securitys/list', data)
}
// 根據id獲取用戶資訊
export function getUserInfo(id) {
  return request.get(`/social_securitys/${id}`)
}
// 根據城市id查詢城市參保資訊
export function getCitySocial(id) {
  return request.get(`/social_securitys/payment_item/${id}`)
}
// 保存或更新用戶保險數據
export function saveSocialInfo(id, data) {
  return request.put(`/social_securitys/${id}`, data)
}
// 查詢當月報表
export function getYearMonthReport(yearMonth) {
  return request.get(`/social_securitys/historys/${yearMonth}`, { params: { opType: '1' }})
}
// 報表歸檔
export function archiveReport(yearMonth) {
  return request.post(`/social_securitys/historys/${yearMonth}/archive`)
}
// 製作新報表
export function newReport(yearMonth) {
  return request.put(`/social_securitys/historys/${yearMonth}/newReport`)
}
// 查詢保險歷史歸檔列表
export function historyArchiveReport(year) {
  return request.get(`/social_securitys/historys/${year}/list`)
}
