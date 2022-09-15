import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 新增配置
export function PurchaseinboundAdd(data) {
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehouseadd',
    method: 'post',
    data: data
  })
}

// 批量新增配置
export function PurchaseinboundAdds(data) {
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehouseadds',
    method: 'post',
    data: data
  })
}

// 查询列表
export function PurchaseinboundList(query) {
  return request({
    url: '/system/Selloutofwarehouse/SwJsSkuBarcodelists',
    method: 'get',
    params: query
  })
}

//销售人员查询列表
export function PurchaseinxiaosoList(query) {
  return request({
    url: '/system/Approval/salerman',
    method: 'get',
    params: query
  })
}

//销售提货单查询
export function Purchaseinbounddingdancx(data) {
  return request({
    url: '/whmanagement/takeOrderList',
    method: 'post',
    data: data
  })
}


// 详情
export function PurchaseinboundLists(CBPC01) {
  return request({
    url: '/system/Selloutofwarehouse/SwJsSkuBarcodelistss?cbsb01='+ CBPC01,
    method: 'get'
  })
}

//销售提货单详情
export function PurchaseinListxiangq(CBPC01) {
  return request({
    url: '/whmanagement/takeOrderDetail?id='+ CBPC01,
    method: 'get'
  })
}


// 修改
export function PurchaseinboundEdit(data) {
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehousedeit',
    method: 'post',
    data: data
  })
}

// 删除
export function PurchaseinboundRemove(data) {
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehousedel',
    method: 'post',
    data:data
  })
}

// 审核
export function PurchaseinboundSH(data) {
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehouseaddsh',
    method: 'post',
    data: data
  })
}

//采购入库标记完成
export function PurchaseinboundShss(data) {
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehouseaddshwc',
    method: 'post',
    data: data
  })
}

//采购入库取消完成
export function Purchaseinbounds(data) {
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehouseaddqxwc',
    method: 'post',
    data: data
  })
}

//采购入库单反审
export function PurchaseinboundShs(data) {
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehouseaddfs',
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
