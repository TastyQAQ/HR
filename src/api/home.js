import request from '@/utils/request'
// 獲取首頁展示數據
export function getHomeData() {
  return request.get('/home/data')
}
// 獲取首頁消息通知
export function getHomeNotice() {
  return request.get('/home/notice')
}
