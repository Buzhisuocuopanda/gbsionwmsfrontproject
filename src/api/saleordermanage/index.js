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

export function swJsGoodslistBySelect(data) {
  return request({
    url: '/system/goods/swJsGoodslistBySelect',
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

export function addSaleOrder(data) {
  return request({
    url: '/sale/addSaleOrder',
    method: 'post',
    data: data
  })
}

export function mdfSaleOrder(data) {
  return request({
    url: '/sale/mdfSaleOrder',
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
