import request from '@/utils/request'
import {
  parseStrEmpty
} from "@/utils/ruoyi";

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
    method: 'get',
    params: data
  })
}

// ​/dev-api​/stage-api​/sale​/saleOrderListPj
// 通过销售订单创建的出库单列表
export function saleOrderListPj(query) {
  return request({
    url: '/sale/saleOrderListPj',
    method: 'get',
    params: query
  })
}

export function takeOrderDetailBySaleId(query) {
  return request({
    url: '/whmanagement/saleExitDetailByIds',
    method: 'get',
    params: query
  })
}

// ​/dev-api​/stage-api​/whmanagement​/saleExitDetailByIds
// 通过销售订单创建的出库单订单详情
// export function takeOrderDetailBySaleId(query) {
//   return request({
//     url: '/whmanagement​/saleExitDetailByIds',
//     method: 'get',
//     query: query
//   })
// }

export function Purchaseinbounddingdanck(data) {
  return request({
    url: '/whmanagement/takeOrderListCk',
    method: 'get',
    params: data
  })
}

// 详情
export function PurchaseinboundLists(CBPC01) {
  return request({
    url: '/system/Selloutofwarehouse/SwJsSkuBarcodelistss?cbsb01=' + CBPC01,
    method: 'get'
  })
}

//销售提货单详情
export function PurchaseinListxiangq(CBPC01) {
  return request({
    url: '/whmanagement/takeOrderDetailIds?ids=' + CBPC01,
    method: 'get'
  })
}


//销售出库单打印1
export function PurchaseinListxiandayin(data) {
  return request({
    url: '/system/Selloutofwarehouse/saleoutOrderdetailsexport1?orderId=' + data,
    method: 'post',
    data: data
  })
}

//销售出库建议表打印1
export function PurchaseinListchukujianyibiao(data) {
  return request({
    url: '/system/Selloutofwarehouse/saleoutOrderdetailsuggestsexport1?orderId=' + data,
    method: 'post',
    data: data
  })
}

//销售扫描记录表
export function PurchaseinListsaomiaojilubiao(data) {
  return request({
    url: '/system/Selloutofwarehouse/salescanOrderdetailsuggestsexport1?orderId=' + data,
    method: 'post',
    data: data
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
    data: data
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

// 入库标记完成
export function PurchaseinboundShss(data) {
  // /dev-api/stage-api/system/Selloutofwarehouse/Selloutofwarehouseaddshwc
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehouseaddshwc',
    method: 'post',
    data: data
  })
}

// 入库取消完成
export function Purchaseinbounds(data) {
  // /dev-api/stage-api/system/Selloutofwarehouse/Selloutofwarehouseaddqxwc
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
// 查询列表2
export function CustomerLists(whid, goodsid) {
  return request({
    url: '/whmanagement/selectGoodsSnByWhIdAndGoodsId',
    method: 'get',
    params: {
      whId: whid,
      goodsId: goodsid
    }
  })
}
// 销售退库详情
// /dev-api/stage-api/system/Selloutofwarehouse/SwJsSkuBarcodelistss
export function SwJsSkuBarcodelistss(id) {
  return request({
    url: '/system/Selloutofwarehouse/SwJsSkuBarcodelistss',
    method: 'get',
    params: {
      cbsb01: id
    }
  })
}
// 销售修改
// /dev-api/stage-api/system/Selloutofwarehouse/Selloutofwarehouseeditone
export function Selloutofwarehouseeditone(data) {
  return request({
    url: '/system/Selloutofwarehouse/Selloutofwarehouseeditone',
    method: 'post',
    data: data
  })
}

// 销售出库单打印
export function saleoutOrderdetailsexport1(data) {
  return request({
    url: '/system/Selloutofwarehouse/saleoutOrderdetailsexport1',
    method: 'post',
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob'
  })
}