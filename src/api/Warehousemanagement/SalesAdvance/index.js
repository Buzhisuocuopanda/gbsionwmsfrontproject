import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 新增配置
export function PurchaseinboundAdd(data) {
  return request({
    url: '/system/SalesScheduledOrders/addGsSalesOrdersChange',
    method: 'post',
    data: data
  })
}
// 新增配置
export function bgdxz(data) {
  return request({
    url: '/system/SalesScheduledOrders/bgdxz',
    method: 'post',
    data: data
  })
}
// 销售预订单新增配置
export function PurchaseinboundAddydd(data) {
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
    url: '/system/SalesScheduledOrders/seleteGsSalesOrdersChange',
    method: 'get',
    params: query
  })
}

//详情
export function PurchaseinboundLists(data) {
  return request({
    url: '/system/SalesScheduledOrders/saleOrderAdvance?id='+ data,
    method: 'post',
    data:data
  })
}
// 销售预订单详情
export function saleOrderListdetail(data) {
  return request({
    url: '/system/SalesScheduledOrders/saleOrderListdetail?id='+data,
    method: 'post',
    // data:data
  })
}
//销售预订单变更单详情
export function PurchaseinSalesAdvance(data) {
  return request({
    url: '/system/SalesScheduledOrders/saleOrderAdvance',
    method: 'post',
    params: data
  })
}
  
//销售预订单变更单修改 
export function PurchaseinboundEditSalesAdvance(data) {
  return request({
    url: '/system/SalesScheduledOrders/editGsSalesOrdersChange',
    method: 'post',
    data: data
  })
}

// 修改
export function PurchaseinboundEdit(data) {
  return request({
    url: '/system/SalesScheduledOrders/editGsSalesOrdersChange',
    method: 'post',
    data: data
  })
}


// 删除
export function PurchaseinboundRemove(data) {
  return request({
    url: '/system/SalesScheduledOrders/deleteGsSalesOrdersChange',
    method: 'post',
    data:data
  })
}

// 审核
export function PurchaseinboundSH(data) {
  return request({
    url: '/system/SalesScheduledOrders/GsSalesOrdersChangesh',
    method: 'post',
    data: data
  })
}

//标记完成
export function PurchaseinboundShss(data) {
  return request({
    url: '/system/SalesScheduledOrders/GsSalesOrdersChangebjwc',
    method: 'post',
    data: data
  })
}

//取消完成
export function Purchaseinbounds(data) {
  return request({
    url: '/system/SalesScheduledOrders/GsSalesOrdersChangeqxwc',
    method: 'post',
    data: data
  })
}

//反审
export function PurchaseinboundShs(data) {
  return request({
    url: '/system/SalesScheduledOrders/GsSalesOrdersChangefs',
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

//详情
export function saleOrderAdvance(data) {
  return request({
    url: '/system/SalesScheduledOrders/saleOrderAdvance',
    method: 'post',
    params:data
  })
}