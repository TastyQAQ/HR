import request from '@/utils/request'
// 登入請求方法
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 獲取用戶資料
export function getUserInfo() {
  return request.get('/sys/profile')
}
// 修改密碼
export function updatePassword(data) {
  return request.put('/sys/user/updatePass', data)
}
