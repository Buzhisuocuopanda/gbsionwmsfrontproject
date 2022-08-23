import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 直接入库单新增
export function PurchaseinboundAdd(data) {
  return request({
    url: '/system/Directly/SwJsPurchaseinboundadd',
    method: 'post',
    data: data
  })
}

// 直接入库单列表
export function SkuBarcodeLists(query) {
  return request({
    url: '/system/Directly/SwJsSkuBarcodelist',
    method: 'get',
    params: query
  })
}

// 直接入库单查询
export function SkuBarcodeList(query) {
  return request({
    url: '/system/Directly/SwJsSkuBarcodelist',
    method: 'get',
    params: query
  })
}

// 修改
export function PurchaseinboundEdit(data) {
  return request({
    url: '/system/Directly/SwJsPurchaseinboundedit',
    method: 'post',
    data: data
  })
}

// 直接入库单删除
export function PurchaseInboundremove(data) {
  return request({
    url: '/system/Directly/SwJsPurchaseinboundremove',
    method: 'post',
    data:data
  })
}

// 审核
export function Purchaseinboundsho(data) {
  return request({
    url: '/system/Purchasereturnorders/SwJsPurchaseinboundsho',
    method: 'post',
    data: data
  })
}

//采购入库标记完成
export function PurchaseinBoundshf(data) {
  return request({
    url: '/system/Purchasereturnorders/SwJsPurchaseinboundshf',
    method: 'post',
    data: data
  })
}

//采购入库取消完成
export function PurchaseinboundShtt(data) {
  return request({
    url: '/system/Purchasereturnorders/SwJsPurchaseinboundshtt',
    method: 'post',
    data: data
  })
}

//采购入库单反审
export function PurchaseinboundSht(data) {
  return request({
    url: '/system/Purchasereturnorders/SwJsPurchaseinboundsht',
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