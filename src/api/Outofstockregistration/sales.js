import request from '@/utils/request'

// 查询售后列表
export function listSales(query) {
  return request({
    url: '/system/Outofstockregistrationform/SwJsSkuBarcodelists',
    method: 'get',
    params: query
  })
}

/* // 查询售后详细
export function getSales(id) {
  return request({
    url: '/system/sales/' + id,
    method: 'get'
  })
} */

// 新增缺货登记表
export function addSales(data) {
  return request({
    url: '/system/Outofstockregistrationform/Selloutofwarehouseadd',
    method: 'post',
    data: data
  })
}

// 修改缺货登记表
export function updateSales(data) {
  return request({
    url: '/system/Outofstockregistrationform/Selloutofwarehouseedit',
    method: 'post',
    data: data
  })
}

// 删除缺货登记表
export function delSales(data) {
  return request({
    url: '/system/Outofstockregistrationform/SwJsPurchaseinboundremove' ,
    method: 'post',
    data: data
  })
}
//销售订单详情
export function saleOderDetailss(data) {
  return request({
    url: '/system/Outofstockregistrationform/saleOderDetail',
    method: 'get',
    params: data
  })
}
