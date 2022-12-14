import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";
// /dev-api/stage-api/system/WarehousetransferordersController/Selloutofwarehouseaupdate
// 仓库调拨修改
export function Selloutofwarehouseaupdate(data) {
  return request({
    url: '/system/WarehousetransferordersController/Warehousetransferorderseditone',
    method: 'post',
    data: data
  })
}
// 主表添加配置
export function PurchasereturnordersAdd(data) {
  return request({
    url: '/system/WarehousetransferordersController/Warehousetransferordersadd',
    method: 'post',
    data: data
  })
}

//明细添加配置
export function PurchasereturnordersAdds(data) {
  return request({
    url: '/system/WarehousetransferordersController/Warehousetransferordersadds',
    method: 'post',
    data: data
  })
}

// 查询列表
export function SkuBarcodeLists(query) {
  return request({
    url: '/system/WarehousetransferordersController/SwJsSkuBarcodelists',
    method: 'get',
    params: query
  })
}

// 详情
export function PurchaseinboundLists(CBPC01) {
  return request({
    url: '/system/WarehousetransferordersController/SwJsSkuBarcodelistss?cbaa01='+ CBPC01,
    method: 'get'
  })
}

// 修改
export function PurchaseinboundEdit(data) {
  return request({
    url: '/system/Purchasereturnorders/SwJsPurchaseinboundedit',
    method: 'post',
    data: data
  })
}

// 删除
export function PurchasereturnorderRemove(data) {
  return request({
    url: '/system/WarehousetransferordersController/Selloutofwarehousedel',
    method: 'post',
    data:data
  })
}

// 审核
export function Purchaseinboundsho(data) {
  return request({
    url: '/system/WarehousetransferordersController/Selloutofwarehouseaddsh',
    method: 'post',
    data: data
  })
}

// //采购入库标记完成
// export function PurchaseinBoundshf(data) {
//   return request({
//     url: '/system/WarehousetransferordersController/Selloutofwarehouseaddbjwc',
//     method: 'post',
//     data: data
//   })
// }
//采购入库标记完成
export function PurchaseinBoundshf(data) {
  return request({
    url: '/system/WarehousetransferordersController/transferordersinbjwc',
    method: 'post',
    data: data
  })
}
// //采购入库取消完成
// export function PurchaseinboundShtt(data) {
//   return request({
//     url: '/system/WarehousetransferordersController/Selloutofwarehouseaddqxwc',
//     method: 'post',
//     data: data
//   })
// }
//采购入库取消完成
export function PurchaseinboundShtt(data) {
  return request({
    url: '/system/WarehousetransferordersController/transferordersoutsbjwc',
    method: 'post',
    data: data
  })
}
//采购入库单反审
export function PurchaseinboundSht(data) {
  return request({
    url: '/system/WarehousetransferordersController/Selloutofwarehouseaddfs',
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