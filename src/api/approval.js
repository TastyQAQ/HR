import request from '@/utils/request'
// 獲取審核申請列表
export function getApplyList(page, pageSize) {
  return request.get(`/user/process/instance/${page}/${pageSize}`)
}
// 獲取審核詳細數據
export function getApprovalDetail(id) {
  return request.get(`/user/process/instance/${id}`)
}
// 獲取審核進度
export function getApprovalProgress(id) {
  return request.get(`/user/process/instance/tasks/detail/${id}`)
}
