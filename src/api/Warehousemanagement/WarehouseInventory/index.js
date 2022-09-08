import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 新增配置
export function PurchasereturnordersAdd(data) {
  return request({
    url: '/system/Warehouseinventoryschedule/SwJsStoreadd',
    method: 'post',
    data: data
  })
}

// 查询列表
export function SkuBarcodeLists(query) {
  return request({
    url: '/system/Warehouseinventoryschedule/SwJsStorelistss',
    method: 'get',
    params: query
  })
}

// 修改
export function PurchaseinboundEdit(data) {
  return request({
    url: '/system/Warehouseinventoryschedule/SwJsPurchaseinboundedit',
    method: 'post',
    data: data
  })
}

// 删除
export function PurchasereturnorderRemove(data) {
  return request({
    url: '/system/Warehouseinventoryschedule/SwJsStoreremove',
    method: 'post',
    data:data
  })
}

// 审核
export function Purchaseinboundsho(data) {
  return request({
    url: '/system/Warehouseinventoryschedule/SwJsPurchaseinboundsho',
    method: 'post',
    data: data
  })
}

//仓库盘点明细表盘点完成
export function PurchaseinBoundshf(data) {
  return request({
    url: '/system/Warehouseinventoryschedule/swJsStoreend',
    method: 'post',
    data: data
  })
}

//仓库盘点明细表取消完成
export function PurchaseinboundShtt(data) {
  return request({
    url: '/system/Warehouseinventoryschedule/swJsStoreenddqxwc',
    method: 'post',
    data: data
  })
}

//采购入库单反审
export function PurchaseinboundSht(data) {
  return request({
    url: '/system/Warehouseinventoryschedule/swJsStoreendfs',
    method: 'post',
    data: data
  })
}

//导出采购入库单
export function GoodSexport(data) {
  return request({
    url: '/system/Purchasereturnorders/SwJsGoodsexport',
    method: 'post',
    data: data
  })
}

//导入采购入库单
export function SwJsGoods(data) {
  return request({
    url: '/system/Purchasereturnorders/importSwJsGoods',
    method: 'post',
    data: data
  })
}

//供应商列表
export function SupplierList(query) {
  return request({
    url: '/system/supplier/SwJsSupplierlist',
    method: 'get',
    params: query
  })
}

//商品信息维护
export function GoodsList(query) {
  return request({
    url: '/system/goods/SwJsGoodslist',
    method: 'get',
    params: query
  })
}

//库位列表
export function StoreList(query) {
  return request({
    url: '/system/store/SwJsStorelist',
    method: 'get',
    params: query
  })
}

// 仓库列表
export function StoreSkuList(query) {
  return request({
    url: '/system/sku/SwJsStorelist',
    method: 'get',
    params: query
  })
}