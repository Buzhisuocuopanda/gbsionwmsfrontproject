import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 新增配置
export function StoreSkuAdd(data) {
  return request({
    url: '/system/sku/SwJsStoreSkuadd',
    method: 'post',
    data: data
  })
}

// 查询列表
export function StoreSkuList(query) {
  return request({
    url: '/system/sku/cangkuliebiao',
    method: 'get',
    params: query
  })
}

// 修改
export function StoreSkuEdit(data) {
  return request({
    url: '/system/sku/SwJsStoreSkuedit',
    method: 'post',
    data: data
  })
}

// 删除
export function StoreyRemove(data) {
  return request({
    url: '/system/sku/SwJsStoreyremove',
    method: 'post',
    data:data
  })
}

//仓库列表
// export function listUserStore(query) {
//   return request({
//     url: '/system/store/SwJsStorelist',
//     method: 'get',
//     params: query
//   })
// }
