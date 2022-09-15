import request from '@/utils/request'

// 获取商品分类列表
export function getGoodsList() {
    return request({
      url: '/system/classify/SwJsGoodsClassifytreeselect',
      method: 'get',
    })
  }
  // 获取品牌分类列表
export function getBrandList(query) {
    return request({
      url: 'countQuery/Invsentorsysummaryquery',
      method: 'get',
      params: query
    })
  }

// 获取库存汇总列表
export function getInventorySummaryList(query) {
  return request({
    url: '/countQuery/Inventorysummaryquery',
    method: 'get',
    params: query
  })
}

// 获取库存汇总列表
export function getInventorysummaryqueryList(query) {
  return request({
    url: '/countQuery/Inventorysummaryquery',
    method: 'get',
    params: query
  })
}

// 获取销售库存列表
export function getInnnvsentorsysummaryList(query) {
  return request({
    url: '/countQuery/Innnvsentorsysummaryquery',
    method: 'get',
    params: query
  })
}


  // 查询定时任务调度详细
//   export function getJob(jobId) {
//     return request({
//       url: '/monitor/job/' + jobId,
//       method: 'get'
//     })
//   }

//   // 新增定时任务调度
//   export function addJob(data) {
//     return request({
//       url: '/monitor/job',
//       method: 'post',
//       data: data
//     })
//   }

//   // 修改定时任务调度
//   export function updateJob(data) {
//     return request({
//       url: '/monitor/job',
//       method: 'put',
//       data: data
//     })
//   }
