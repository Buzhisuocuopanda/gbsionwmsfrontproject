import request from '@/utils/request'

export function getoutStockAdviceList(query) {
  return request({
    url: '/whmanagement/outStockAdviceList',
    method: 'get',
    params: query
  })
}
//
export function auditOutStockEnd(query) {
  return request({
    url: '/whmanagement/auditOutStockEnd',
    method: 'get',
    params: query
  })
}
