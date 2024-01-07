import request from '@/utils/request'
// 獲取考勤列表
export function getAttendanceList(params) {
  return request.get('/attendances', { params })
}
