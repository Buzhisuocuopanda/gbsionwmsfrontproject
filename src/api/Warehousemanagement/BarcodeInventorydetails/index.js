import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 库存明细初始化新增
export function PurchaseinboundAdd(data) {
  return request({
    url: '/system/Purchaseinbound/SwJsPurchaseinboundadd',
    method: 'post',
    data: data
  })
}

// 库存明细初始化列表
export function PurchaseinboundList(query) {
  return request({
    url: '/system/Warehousedetailsinitialize/SwJsStorelistss',
    method: 'get',
    params: query
  })
}

// 库存明细初始化详情
export function PurchaseinboundLists(CBPC01) {
  return request({
    url: '/system/Warehousedetailsinitialize/SwJsStorelist?cbie01='+ CBPC01,
    method: 'get',
  })
}

// 库存明细初始化修改
export function PurchaseinboundEdit(data) {
  return request({
    url: '/system/Purchaseinbound/SwJsPurchaseinboundedit',
    method: 'post',
    data: data
  })
}

// 库存明细初始化删除
export function PurchaseinboundRemove(data) {
  return request({
    url: '/system/Warehousedetailsinitialize/SwJsStoreremove',
    method: 'post',
    data:data
  })
}

// 库存明细初始化审核
export function PurchaseinboundSH(data) {
  return request({
    url: '/system/Warehousedetailsinitialize/swJsStoreendd',
    method: 'post',
    data: data
  })
}

//采购入库标记完成
export function PurchaseinboundShss(data) {
  return request({
    url: '/system/Purchaseinbound/SwJsPurchaseinboundshss',
    method: 'post',
    data: data
  })
}

//采购入库取消完成
export function Purchaseinbounds(data) {
  return request({
    url: '/system/Purchaseinbound/SwJsPurchaseinbounds',
    method: 'post',
    data: data
  })
}

//采购入库单反审
export function PurchaseinboundShs(data) {
  return request({
    url: '/system/Warehousedetailsinitialize/swJsStoreendds',
    method: 'post',
    data: data
  })
}

//导出采购入库单
export function GoodSexport(data) {
  return request({
    url: '/system/Purchaseinbound/SwJsGoodsexport',
    method: 'post',
    data: data
  })
}

//导入采购入库单
export function SwJsGoods(data) {
  return request({
    url: '/system/Purchaseinbound/importSwJsGoods',
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