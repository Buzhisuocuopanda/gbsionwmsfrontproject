import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";
// 新增配置
export function StoreAdd(data) {
  return request({
    url: '/system/store/SwJsStoreadd',
    method: 'post',
    data: data
  })
}

// 查询列表
export function StoreList(query) {
  return request({
    url: '/system/store/SwJsStorelist',
    method: 'get',
    params: query
  })
}

// 修改
export function StoreEdit(data) {
  return request({
    url: '/system/store/SwJsStoreedit',
    method: 'post',
    data: data
  })
}

// 删除
export function StoreRemove(data) {
  return request({
    url: '/system/store/SwJsStoreremove',
    method: 'post',
    data:data
  })
}

