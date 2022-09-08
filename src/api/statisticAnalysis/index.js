import request from '@/utils/request'

// 获取商品分类列表
export function getGoodsList() {
    return request({
      url: '/system/classify/SwJsGoodsClassifytreeselect',
      method: 'get',
    })
  }
  // 获取品牌分类列表
export function getBrandList() {
    return request({
      url: 'countQuery/Invsentorsysummaryquery',
      method: 'get',
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