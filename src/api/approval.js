import request from '@/utils/request'
export function getApplyList(page, pageSize) {
  return request.get(`/user/process/instance/${page}/${pageSize}`)
}
