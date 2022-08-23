import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";
// 新增配置
export function ListAdd(data) {
  return request({
    url: '/system/list/SwJsListadd',
    method: 'post',
    data: data
  })
}

// 查询列表
export function ListLists(query) {
  return request({
    url: '/system/list/SwJsListlist',
    method: 'get',
    params: query
  })
}

// 修改
export function ListEdit(data) {
  return request({
    url: '/system/list/SwJsListedit',
    method: 'post',
    data: data
  })
}

// 删除
export function ListRemove(data) {
  return request({
    url: '/system/list/SwJsListremove',
    method: 'post',
    data:data
  })
}
