import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";
// 生产总订单列表
export function totalOrderList(data) {
  return request({
    url: '/sale/totalOrderList',
    method: 'get',
    params: data
  })
}

export function totalOrderExcelListtmp(data) {
  return request({
    url: '/sale/totalOrderExcelListtmp',
    method: 'post',
    data: data
  })
}


export function addTotalOrder(data) {
  return request({
    url: '/sale/addTotalOrder',
    method: 'post',
    data: data
  })
}

export function mdfTotalOrder(data) {
  return request({
    url: '/sale/mdfTotalOrder',
    method: 'post',
    data: data
  })
}


export function saleOrderList(data) {
  return request({
    url: '/sale/saleOrderList',
    method: 'get',
    params: data
  })
}
//国际销售订单
export function saleOrderListGj(data) {
  return request({
    url: '/sale/saleOrderListGj',
    method: 'get',
    params: data
  })
}

export function swJsGoodslistBySelect(data) {
  return request({
    url: '/system/goods/swJsGoodslistBySelect',
    method: 'get',
    params: data
  })
}

export function swJsGoodslistBySelectAll(data) {
  return request({
    url: '/system/goods/swJsGoodslistBySelectAll',
    method: 'get',
    params: data
  })
}

export function SwJsCustomerlistSelect(data) {
  return request({
    url: '/system/customer/SwJsCustomerlistSelect',
    method: 'get',
    params: data
  })
}

export function SwJsCustomerlistAll(data) {
  return request({
    url: '/system/customer/SwJsCustomerlistAll',
    method: 'get',
    params: data
  })
}


export function systemUserSelect(data) {
  return request({
    url: '/system/customer/systemUserSelect',
    method: 'get',
    params: data
  })
}

export function goodsPriceAndSku(data) {
  return request({
    url: '/sale/goodsPriceAndSku',
    method: 'post',
    data: data
  })
}
export function customerDetail(data) {
  return request({
    url: '/system/customer/customerDetail',
    method: 'get',
    params: data
  })
}
// /dev-api/stage-api/sale/goodsShopListcas
export function customerDetaillists(data) {
  console.log(data,typeof(data),'后台数据')
  return request({
    url: '/sale/goodsShopListcas',
    method: 'post',
    data:data,
  })
}


export function reAddSaleOrder(data) {
  return request({
    url: '/sale/reAddSaleOrder',
    method: 'post',
    params: data
  })
}


export function mdfSaleOrder(data) {
  return request({
    url: '/sale/mdfSaleOrder',
    method: 'post',
    data: data,
  })
}
export function addSaleOrder(data) {
  return request({
    // /dev-api/stage-api/sale/addSaleOrder
    url: '/sale/addSaleOrder',
    method: 'post',
    data: data
  })
}
export function auditSaleOrder(data) {
  return request({
    url: '/sale/auditSaleOrder',
    method: 'post',
    data: data
  })
}
//国际销售订单
export function auditSaleOrderGj(data) {
  return request({
    url: '/sale/auditSaleOrderGj',
    method: 'post',
    data: data
  })
}

export function auditFinSaleOrder(data) {
  return request({
    url: '/sale/auditFinSaleOrder',
    method: 'post',
    data: data
  })
}

export function delSaleOrder(data) {
  return request({
    url: '/sale/delSaleOrder',
    method: 'post',
    data: data
  })
}
//国际销售订单
export function delSaleOrderGj(data) {
  return request({
    url: '/sale/delSaleOrderGj',
    method: 'post',
    data: data
  })
}

export function saleOderDetail(data) {
  return request({
    url: '/sale/saleOderDetail',
    method: 'get',
    params: data
  })
}
//国际销售订单
export function saleOderDetailGj(data) {
  return request({
    url: '/sale/saleOderDetailGj',
    method: 'get',
    params: data
  })
}

export function totalOrderDetail(data) {
  return request({
    url: '/sale/totalOrderDetail',
    method: 'get',
    params: data
  })
}

export function saleOrderSkuList(data) {
  return request({
    url: '/sale/saleOrderSkuList',
    method: 'get',
    params: data
  })
}

export function updateGjQty(data) {
  return request({
    url: '/sale/updateGjQty',
    method: 'post',
    data: data
  })
}
export function confirmSkuSaleOrder(data) {
  return request({
    url: '/sale/confirmSkuSaleOrder',
    method: 'post',
    data: data
  })
}
export function saleChangeList(data) {
  return request({
    url: '/sale/saleChangeList',
    method: 'post',
    data: data
  })
}

export function orderChangeDetail(data) {
  return request({
    url: '/sale/orderChangeDetail',
    method: 'get',
    params: data
  })
}
export function orderlistSelect(data) {
  return request({
    url: '/sale/orderlistSelect',
    method: 'get',
    params: data
  })
}

export function orderChangeGoodsSelect(data) {
  return request({
    url: '/sale/orderChangeGoodsSelect',
    method: 'get',
    params: data
  })
}

export function goodsPriceAndSkuByOrderChange(data) {
  return request({
    url: '/sale/goodsPriceAndSkuByOrderChange',
    method: 'post',
    data: data
  })
}

export function addSaleOrderChange(data) {
  return request({
    url: '/sale/addSaleOrderChange',
    method: 'post',
    data: data
  })
}

export function mdfSaleOrderChange(data) {
  return request({
    url: '/sale/mdfSaleOrderChange',
    method: 'post',
    data: data
  })
}
export function auditSaleChange(data) {
  return request({
    url: '/sale/auditSaleChange',
    method: 'post',
    data: data
  })
}

export function goodsShopList(data) {
  return request({
    url: '/sale/goodsShopList',
    method: 'get',
    params: data
  })
}
