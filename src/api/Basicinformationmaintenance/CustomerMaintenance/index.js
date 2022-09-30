import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 新增配置
export function CustomerAdd(data) {
  return request({
    url: '/system/customer/SwJsCustomeradd',
    method: 'post',
    data: data
  })
}

// 查询列表
export function CustomerList(query) {
  return request({
    url: '/system/customer/SwJsCustomerlist',
    method: 'get',
    params: query
  })
}

// 修改
export function CustomeRedit(data) {
  return request({
    url: '/system/customer/SwJsCustomeredit',
    method: 'post',
    data: data
  })
}

// 删除
export function CustomeRemove(data) {
  return request({
    url: '/system/customer/SwJsGoodsClassifyremove',
    method: 'post',
    data:data
  })
}
