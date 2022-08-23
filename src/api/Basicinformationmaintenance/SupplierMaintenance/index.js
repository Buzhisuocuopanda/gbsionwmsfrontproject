import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 新增配置
export function SupplierAdd(data) {
  return request({
    url: '/system/supplier/SwJsSupplieradd',
    method: 'post',
    data: data
  })
}

// 查询列表
export function SupplierList(query) {
  return request({
    url: '/system/supplier/SwJsSupplierlist',
    method: 'get',
    params: query
  })
}

// 修改
export function SupplieRedit(data) {
  return request({
    url: '/system/supplier/SwJsSupplieredit',
    method: 'post',
    data: data
  })
}

// 删除
export function SupplierRemove(data) {
  return request({
    url: '/system/supplier/SwJsSupplierremove',
    method: 'post',
    data:data
  })
}

