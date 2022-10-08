import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 质检单新增
export function QualityinAdd(data) {
  return request({
    url: '/system/Qualityin/SwJsPurchaseinboundadd',
    method: 'post',
    data: data
  })
}


// 质检单新增
export function QualityinAdds(data) {
  return request({
    url: '/system/Qualityin//SwJsPurchaseinboundadds',
    method: 'post',
    data: data
  })
}

// 质检单查询列表
export function QualityinList(query) {
  return request({
    url: '/system/Qualityin/SwJsSkuBarcodeselect',
    method: 'get',
    params: query
  })
}

// 质检单详情
export function QualityinLists(CBQA01) {
  return request({
    url: '/system/Qualityin/SwJsSkuBarcodelists?cbqa01='+ CBQA01,
    method: 'get'
  })
}
// 质检单修改
export function QualityinEdit(data) {
  return request({
    url: '/system/Qualityin/SwJsPurchaseinboundedit',
    method: 'post',
    data: data
  })
}

// 质检单修改1
export function QualityinEditOne(data) {
  return request({
    url: '/system/Qualityin/SwJsPurchaseinboundeditone',
    method: 'post',
    data: data
  })
}



// 质检单删除
export function QualityinRemove(data) {
  return request({
    url: '/system/Qualityin/SwJsPurchaseinbounddelete',
    method: 'post',
    data:data
  })
}

// 质检单审核
export function QualityinSH(data) {
  return request({
    url: '/system/Qualityin/SwJsPurchaseinboundsh',
    method: 'post',
    data: data
  })
}

//质检单单反审
export function QualityinfShs(data) {
  return request({
    url: '/system/Qualityin/SwJsPurchaseinboundshs',
    method: 'post',
    data: data
  })
}
//质检单标记完成
export function PurchaseinboundShss(data) {
  return request({
    url: '/system/Qualityin/SwJsPurchaseinboundbjwc',
    method: 'post',
    data: data
  })
}

//质检单取消完成
export function Purchaseinbounds(data) {
  return request({
    url: '/system/Qualityin/SwJsPurchaseinboundbqxwc',
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

// 提货单查询
export function Purchaseintihuadang(data) {
  return request({
    url: '/whmanagement/takeOrderList',
    method: 'post',
    data: data
  })
}

//提货单详情
export function PurchaseinboundSellout(CBPC01) {
  return request({
    url: '/whmanagement/takeOrderDetail?id='+ CBPC01,
    method: 'get'
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
