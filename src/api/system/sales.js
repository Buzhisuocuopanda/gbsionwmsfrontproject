import request from '@/utils/request'

// 查询售后列表
export function listSales(query) {
  return request({
    url: '/system/Aftersales/aftersaleslist',
    method: 'get',
    params: query
  })
}

// 查询售后详细
export function getSales(id) {
  return request({
    url: '/system/sales/' + id,
    method: 'get'
  })
}

// 新增售后
export function addSales(data) {
  return request({
    url: '/system/Aftersales/aftersalesadd',
    method: 'post',
    data: data
  })
}

// 修改售后
export function updateSales(data) {
  return request({
    url: '/system/Aftersales/aftersalesedit',
    method: 'post',
    data: data
  })
}

// 删除售后
export function delSales(data) {
  return request({
    url: '/system/Aftersales/aftersalesdelete' ,
    method: 'post',
    data: data
  })
}
