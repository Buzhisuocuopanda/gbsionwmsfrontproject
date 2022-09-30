import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 新增配置
export function PurchaseinboundAdd(data) {
  return request({
    url: '/whmanagement/addTakeGoodsOrder',
    method: 'post',
    data: data
  })
}
// 新增明细配置
export function PurchasereturnordersAdds(data) {
  return request({
    url: '/system/Salesreturnorderss/Selloutofwarehouseadds',
    method: 'post',
    data: data
  })
}

// 销售提货单查询
export function Purchaseinbounddingdancx(data) {
  return request({
    url: '/whmanagement/takeOrderList',
    method: 'post',
    data: data
  })
}
// 销售提货单详情查询
export function Purchaseinbounddingdanxq(CBPC01) {
  return request({
    url: '/whmanagement/takeOrderDetail?id='+ CBPC01,
    method: 'get',
  })
}
// 销售订单查询
export function Purchaseinbounddingdanxsdd(data) {
  console.log(data,'data')
  return request({
    url: '/sale/saleOrderList',
    method: 'get',
    params: data
  })
  
}

// 销售订单详情查询
// export function Purchaseinxiaoshoudingdan(CBPC01) {
//   return request({
//     url: '/sale/saleOderDetail?orderId='+ CBPC01,
//     method: 'get'
//   })
// }
export function Purchaseinxiaoshoudingdan(CBPC01,whid) {
  return request({
    url: '/whmanagement/takeOrderDetailBySaleId?saleOrderId='+CBPC01+'&whId=' + whid,
    method: 'get'
  })
}

// 详情
export function PurchaseinboundLists(CBPC01) {
  return request({
    url: '/system/Purchaseinbound/SwJsSkuBarcodelist?cbpc01='+ CBPC01,
    method: 'get'
  })
}

// 修改
export function PurchaseinboundEdit(data) {
  return request({
    url: '/whmanagement/mdfTakeGoodsOrder',
    method: 'post',
    data: data
  })
}

// 删除
export function PurchaseinboundRemove(id) {
  return request({
    url: '/whmanagement/delTakeGoodsOrder?id='+id,
    method: 'post',
  })
}

// 审核
export function PurchaseinboundSH(data) {
  return request({
    url: '/whmanagement/auditTakeOrder',
    method: 'post',
    data: data
  })
}

//采购入库标记完成
export function PurchaseinboundShss(data) {
  return request({
    url: '/whmanagement/auditTakeOrder',
    method: 'post',
    data: data
  })
}

//采购入库取消完成
export function Purchaseinbounds(data) {
  return request({
    url: '/whmanagement/auditTakeOrder',
    method: 'post',
    data: data
  })
}

//采购入库单反审
export function PurchaseinboundShs(data) {
  return request({
    url: '/whmanagement/auditTakeOrder ',
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
// 审核
export function auditTakeOrder(data) {
  return request({
    url: '/whmanagement/auditTakeOrder',
    method: 'post',
    data: data
  })
}
// 质检
export function auditTakeOrders(data) {
  return request({
    url: '/whmanagement/auditTakeOrder',
    method: 'post',
    data: data
  })
}
// 查询列表2
export function CustomerLists(whid,goodsid) {
  return request({
    url: '/whmanagement/selectGoodsSnByWhIdAndGoodsId',
    method: 'get',
    params: {
      whId:whid,
      goodsId:goodsid
    }
  })
}