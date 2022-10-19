import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";
// 查询审批记录
export function records(query) {
  return request({
    url: '/system/Approval/Approvalrecords',
    method: 'get',
    params: query
  })
}


// 查询未完单据

export function Unfinisheddocuments(query) {
  return request({
    url: '/system/Approval/Unfinisheddocuments',
    method: 'get',
    params: query
  })
}


// 查询未完单据

export function Approvalrecordsdb(query) {
  return request({
    url: '/system/Approval/Approvalrecordsdb',
    method: 'get',
    params: query
  })
}
