import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 新增配置
export function PurchaseinboundAdd(data) {
  return request({
    url: '/system/SalesScheduledOrders/addSalesScheduledOrders',
    method: 'post',
    data: data
  })
}

// 明细新增配置
export function PurchaseinboundAdds(data) {
  return request({
    url: '/system/Purchaseinbound/SwJsPurchseinboundadds',
    method: 'post',
    data: data
  })
}

// 查询列表
export function PurchaseinboundList(query) {
  return request({
    url: '/system/SalesScheduledOrders/saleOrderList',
    method: 'get',
    params: query
  })
}

// 详情
export function PurchaseinboundLists(CBPC01) {
  return request({
    url: '/system/SalesScheduledOrders/saleOrderListdetail?id='+ CBPC01,
    method: 'post'
  })
}

// 修改
export function PurchaseinboundEdit(data) {
  return request({
    url: '/system/SalesScheduledOrders/editSalesScheduledOrders',
    method: 'post',
    data: data
  })
}

// 删除
export function PurchaseinboundRemove(data) {
  return request({
    url: '/system/SalesScheduledOrders/deleteSalesScheduledOrders',
    method: 'post',
    data: data
  })
}

// 审核
export function PurchaseinboundSH(data) {
  return request({
    url: '/system/SalesScheduledOrders/SalesScheduledOrderssh',
    method: 'post',
    data: data
  })
}

//标记完成
export function PurchaseinboundShss(data) {
  return request({
    url: '/system/SalesScheduledOrders/SalesScheduledOrdersbjwc',
    method: 'post',
    data: data
  })
}

//取消完成
export function Purchaseinbounds(data) {
  return request({
    url: '/system/SalesScheduledOrders/SalesScheduledOrdersqxwc',
    method: 'post',
    data: data
  })
}

//反审
export function PurchaseinboundShs(data) {
  return request({
    url: '/system/SalesScheduledOrders/SalesScheduledOrdersfs',
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
export function GoodsList(cbpb12) {
  return request({
    url: '/system/goods/SwJsGoodslist?cbpb12='+cbpb12,
    method: 'get',
  })
}


//商品信息维护
export function GoodsList01(query) {
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

// // 商品分类信息导入
// export function ClassifyImport(data) {
//   return request({
//     url: '/system/Purchaseinbound/SwJsGoodsexport',
//     method: 'post',
//     data:data
//   })
// }